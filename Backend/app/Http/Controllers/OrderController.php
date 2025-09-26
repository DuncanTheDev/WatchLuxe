<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use App\Models\Order_Item;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\error;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();

            $validated = $request->validate([
                //shipping_address
                'shipping' => 'required|array',
                'shipping.first_name' => 'required|string',
                'shipping.last_name' => 'required|string',
                'shipping.phone' => 'nullable|string',
                'shipping.address' => 'required|string',
                'shipping.city' => 'required|string',
                'shipping.state' => 'required|string',
                'shipping.postal_code' => 'required|string',
                'shipping.country' => 'required|string',
                //billling address
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
                //order_item
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|integer',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',
                //
                'guest_email' => 'nullable|email|required_without:user_id',
                'subtotal' => 'required|numeric|min:0',
                'shipping_fee' => 'required|numeric|min:0',
                'total_price' => 'required|numeric|min:0',
                'shipping_method' => 'required|in:standard,priority,express',
                'payment_method' => 'required|string',
            ]);

            $shippingAddress = Address::create([
                'user_id' => $user?->id,
                ...$validated['shipping']
            ]);

            if ($validated['billing_same']) {
                $billingAddress = $shippingAddress;
            } else {
                $billingAddress = Address::create([
                    'user_id' => $user?->id,
                    ...$validated['billing']
                ]);
            }

            $order = Order::create([
                'user_id' => $user?->id,
                'guest_email' => $validated['guest_email'] ?? null,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'subtotal' => $validated['subtotal'],
                'shipping_fee' => $validated['shipping_fee'],
                'total_price' => $validated['total_price'],
                'shipping_method' => $validated['shipping_method'],
                'status' => 'pending',
                'payment_method' => $validated['payment_method']
            ]);

            foreach ($validated['items'] as $item) {
                Order_Item::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],

                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order' => $order->load('orderItems', 'shippingAddress', 'billingAddress')
            ]);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Order failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
