<?php

namespace App\Http\Controllers;

use Srmklive\PayPal\Services\PayPal as PayPalClient;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
    /**
     * Create PayPal Transaction
     */
    public function createTransaction(Request $request)
    {
        try {
            $paypal = new PayPalClient;
            $paypal->setApiCredentials(config('services.paypal'));
            $paypal->getAccessToken();

            if (!$request->total_price || !is_numeric($request->total_price)) {
                return response()->json(['error' => 'Invalid total price'], 400);
            }

            $amount = number_format($request->total_price, 2, '.', '');

            $paypalOrder = $paypal->createOrder([
                "intent" => "CAPTURE",
                "purchase_units" => [
                    [
                        "amount" => [
                            // ⚠ Use USD for sandbox unless PHP is supported
                            "currency_code" => config("services.paypal.currency", "USD"),
                            "value" => $amount,
                        ],
                    ],
                ],
                "application_context" => [
                    "return_url" => url('/api/paypal/capture-order?order_id=' . $request->order_id),
                    "cancel_url" => url('/api/paypal/cancel-order?order_id=' . $request->order_id),
                ],
            ]);

            if (isset($paypalOrder['status']) && $paypalOrder['status'] === 'CREATED') {
                return response()->json($paypalOrder);
            }

            Log::error('PayPal createOrder failed', ['response' => $paypalOrder]);
            return response()->json(['error' => $paypalOrder], 400);
        } catch (\Exception $e) {
            Log::error('PayPal Create Transaction Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Capture PayPal order after approval
     */
    public function captureOrder(Request $request)
    {
        try {
            $paypal = new PayPalClient;
            $paypal->setApiCredentials(config('services.paypal'));
            $paypal->getAccessToken();

            // PayPal sends "token" as query param
            $paypalOrder = $paypal->capturePaymentOrder($request->token);

            if (isset($paypalOrder['status']) && $paypalOrder['status'] === 'COMPLETED') {
                $order = Order::findOrFail($request->order_id);
                $order->status = 'paid';
                $order->save();

                return redirect('http://localhost:5173/thankyou?order_id=' . $order->id);
            }

            return redirect('http://localhost:5173/checkout?error=payment_failed');
        } catch (\Exception $e) {
            Log::error('PayPal Capture Order Error: ' . $e->getMessage());

            return redirect('http://localhost:5173/checkout?error=payment_failed');
        }
    }

    /**
     * Cancel PayPal Order
     */
    public function cancelOrder(Request $request)
    {
        try {
            $order = Order::findOrFail($request->order_id);
            $order->status = 'cancelled';
            $order->save();

            return response()->json(['message' => 'Order cancelled successfully']);
        } catch (\Exception $e) {
            Log::error('PayPal Cancel Order Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
