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
            'product_id' => 'required|exists:products, id',
            'quantity' => 'required|integer|min: 1'
        ]);

        //get the logged-in user or null if guest
        $userId = Auth::id();

        //if logged-in user check if cart already exist, fetch it
        //if not, create a cart for a user
        //only 1 cart per user
        if ($userId) {
            $cart = Cart::firstOrCreate(['user_id' => $userId]);
        } else {
            $cartId = $request->session()->get('cart_id'); // if guest use session

            if (!$cartId) { //if cart doesn't exist
                $cart = Cart::create(['user_id' => $userId]); //create a new cart with user_id = null
                $request->session()->put('cart_id', $cart->id); // store into session cart_id
            } else {
                $cart = Cart::findOrFail($cartId); //if cart exist in session, fetch it
            }
        }

        //check if the product is already in the cart
        $cartItem = Cart_Item::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();


        //if product exist in the cart increment the quantity
        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else { //not exist create a new one
            Cart_item::create([
                'cart_id' => $cartId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart',
            'cart' => $cart->load('items.product'),
        ], 201);
    }

    public function getCart(Request $request)
    {
        $userId = Auth::id();

        if ($userId) {
            $cart = Cart::where('user_id', $userId)->with('items.product')->first();
        } else {
            $cartId = $request->session()->get('cart_id');
            $cart = $cartId ? Cart::with('items_product')->find($cartId) : null;
        }

        return response()->json($cart ?? ['items' => []]);
    }

    public function clearCart($itemId)
    {
        $cartItem = Cart_item::findOrFail($itemId);
        $cartItem->delete();

        return response()->json(['message' => "Item removed from cart"]);
    }
}
