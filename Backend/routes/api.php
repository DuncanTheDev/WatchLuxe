<?php

use App\Http\Controllers\BrandController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Brand route
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/brands/{id}', [BrandController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function(){
    Route::post('brands', [BrandController::class, 'store']);
    Route::put('/brands/{id}', [BrandController::class, 'update']);
    Route::delete('/brands/{id}', [BrandController::class, 'destroy']);
});

//product route
Route::get('/products', [BrandController::class, 'index']);
Route::get('/products/{id}', [BrandController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function(){
    Route::post('products', [BrandController::class, 'store']);
    Route::put('/products/{id}', [BrandController::class, 'update']);
    Route::delete('/products/{id}', [BrandController::class, 'destroy']);
});


