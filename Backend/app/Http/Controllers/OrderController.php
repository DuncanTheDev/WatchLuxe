<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            // Get authenticated user
            $user = Auth::user();

            // Validate the incoming request
            $validated = $request->validate([
                // Shipping address fields
                'shipping' => 'required|array',
                'shipping.first_name' => 'required|string',
                'shipping.last_name' => 'required|string',
                'shipping.phone' => 'nullable|string',
                'shipping.address' => 'required|string',
                'shipping.city' => 'required|string',
                'shipping.state' => 'required|string',
                'shipping.postal_code' => 'required|string',
                'shipping.country' => 'required|string',

                // Billing address fields
                'billing_same' => 'required|boolean',
                'billing' => 'nullable|array',
                'billing.first_name' => 'required_if:billing_same,false|string',
                'billing.last_name' => 'required_if:billing_same,false|string',
                'billing.phone' => 'nullable|string',
                'billing.address' => 'required_if:billing_same,false|string',
                'billing.city' => 'required_if:billing_same,false|string',
                'billing.state' => 'required_if:billing_same,false|string',
                'billing.postal_code' => 'required_if:billing_same,false|string',
                'billing.country' => 'required_if:billing_same,false|string',

                // Order item fields
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|integer',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',

                // Guest email or logged-in user
                'guest_email' => 'nullable|email',
                'subtotal' => 'required|numeric|min:0',
                'shipping_fee' => 'required|numeric|min:0',
                'total_price' => 'required|numeric|min:0',
                'shipping_method' => 'required|in:standard,priority,express',
                'payment_method' => 'required|string',
            ]);

            // Determine user ID or guest email
            $userId = $user ? $user->id : null;
            $guestEmail = $userId ? null : $validated['guest_email'];

            // Create shipping address
            $shippingAddress = Address::create([
                'user_id' => $userId,
                'first_name' => $validated['shipping']['first_name'],
                'last_name' => $validated['shipping']['last_name'],
                'phone' => $validated['shipping']['phone'],
                'address' => $validated['shipping']['address'],
                'city' => $validated['shipping']['city'],
                'state' => $validated['shipping']['state'],
                'postal_code' => $validated['shipping']['postal_code'],
                'country' => $validated['shipping']['country'],
            ]);

            // Create billing address (same as shipping if billing_same is true)
            $billingAddress = $validated['billing_same']
                ? $shippingAddress
                : Address::create([
                    'user_id' => $userId,
                    'first_name' => $validated['billing']['first_name'],
                    'last_name' => $validated['billing']['last_name'],
                    'phone' => $validated['billing']['phone'],
                    'address' => $validated['billing']['address'],
                    'city' => $validated['billing']['city'],
                    'state' => $validated['billing']['state'],
                    'postal_code' => $validated['billing']['postal_code'],
                    'country' => $validated['billing']['country'],
                ]);
            $order = Order::create([
                'user_id' => $userId,
                'guest_email' => $guestEmail,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'subtotal' => $validated['subtotal'],
                'shipping_fee' => $validated['shipping_fee'],
                'total_price' => $validated['total_price'],
                'shipping_method' => $validated['shipping_method'],
                'status' => 'pending',
                'payment_method' => $validated['payment_method'],
            ]);

            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

                $product = Product::find($item['product_id']);
                if ($product) {
                    if ($product->stock >= $item['quantity']) {
                        $product->stock -= $item['quantity'];
                        $product->save();
                    } else {
                        throw new Exception("Insufficient stock for product ID: " . $item['product_id']);
                    }
                }
            }

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order' => $order->load('orderItems', 'shippingAddress', 'billingAddress'),
            ]);
        } catch (Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();

            // Log the error for easier debugging
            Log::error('Order placement failed: ' . $e->getMessage(), ['exception' => $e]);

            // Return a failure response with the error message
            return response()->json([
                'success' => false,
                'message' => 'Order failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getOrder()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access. Please log in first.'
                ], 401);
            }

            // Fetch all orders for this user with order items + products
            $orders = Order::where('user_id', $user->id)
                ->with(['orderItems.product'])
                ->latest()
                ->get();

            if ($orders->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No orders found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'order' => $orders
            ]);
        } catch (\Exception $e) {
            Log::error('Get Order Failed: ' . $e->getMessage(), [
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve orders.'
            ], 500);
        }
    }


    public function getThankYouPage(Request $request)
    {
        try {
            $user = Auth::user();
            $order = null;

            if ($user) {
                $order = Order::where('user_id', $user->id)
                    ->with(['orderItems.product', 'shippingAddress', 'billingAddress'])
                    ->latest()
                    ->first();
            } else {
                $guestEmail = $request->query('guest_email');
                if ($guestEmail) {
                    $order = Order::where('guest_email', $guestEmail)
                        ->with(['orderItems.product', 'shippingAddress', 'billingAddress'])
                        ->latest()
                        ->first();
                }
            }

            if (!$order) {
                Log::warning('No order found for request', [
                    'user_id' => $user ? $user->id : null,
                    'guest_email' => $request->query('guest_email')
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'No order found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'order' => $order
            ]);
        } catch (\Exception $e) {
            Log::error('Get Order Failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve order.',
            ], 500);
        }
    }
}
