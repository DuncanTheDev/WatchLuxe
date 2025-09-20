<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Cart_item;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1'
        ]);

        $userId    = Auth::id();
        $sessionId = $request->session()->getId();

        // Fetch or create cart depending on logged-in or guest
        if ($userId) {
            $cart = Cart::firstOrCreate(['user_id' => $userId]);
        } else {
            $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
        }

        // Check if product already exists in the cart
        $cartItem = Cart_item::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            Cart_item::create([
                'cart_id'    => $cart->id,
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity,
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart',
            'cart'    => $cart->load('cartItems.product'),
        ], 201);
    }

    public function getCart(Request $request)
    {
        $userId    = Auth::id();
        $sessionId = $request->session()->getId();

        if ($userId) {
            $cart = Cart::where('user_id', $userId)->with('cartItems.product')->first();
        } else {
            $cart = Cart::where('session_id', $sessionId)->with('cartItems.product')->first();
        }

        return response()->json([
            'cartItems' => $cart ? $cart->cartItems : []
        ]);
    }

    public function clearCart($itemId)
    {
        $cartItem = Cart_item::findOrFail($itemId);
        $cartItem->delete();

        return response()->json(['message' => "Item removed from cart"]);
    }
}
