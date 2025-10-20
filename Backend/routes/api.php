<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// User route
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// Brand route
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/brands/{id}', [BrandController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('brands', [BrandController::class, 'store']);
    Route::put('/brands/{id}', [BrandController::class, 'update']);
    Route::delete('/brands/{id}', [BrandController::class, 'destroy']);
});

//product route
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});


//cart route
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::get('/cart', [CartController::class, 'getCart']);
Route::put('/cart/{itemId}', [CartController::class, 'updateQuantity']);
Route::delete('/cart/{itemId}', [CartController::class, 'removeCart']);
Route::delete('/cart', [CartController::class, 'clearCart']);
Route::post('/merge-cart', [CartController::class, 'mergeCart']);

//Place order
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/order', [OrderController::class, 'placeOrder']);
    Route::get('/orders', [OrderController::class, 'getOrder']);
    Route::get('/thankyou', [OrderController::class, 'getThankYouPage']);
});

Route::post('/guest/order', [OrderController::class, 'placeOrder']);
Route::get('/guest/thankyou', [OrderController::class, 'getThankYouPage']);

//paypal
Route::post('/paypal/create', [PayPalController::class, 'createTransaction']);
Route::get('/paypal/capture-order', [PayPalController::class, 'captureOrder']);
Route::get('/paypal/cancel', [PayPalController::class, 'cancelOrder']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/contact', [ContactController::class, 'sendEmail']);
