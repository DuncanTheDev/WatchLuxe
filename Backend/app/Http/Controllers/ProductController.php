<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request){
        $query = Product::with('brand');

        //filter by brand
        if($request->has('brand')){
            $query->whereHas('brand', function ($q) use ($request) {
                $q->where('name', $request->brand);
            });
        }

        //filter by gender
        if($request->has('gender')){
            $query->where('gender', $request->gender);
        }

        //sorting
        if($request->has('sort')){
            switch($request->sort){
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'high-low':
                    $query->orderBy('price', 'desc');
                    break;
                case 'low-high':
                    $query->orderBy('price', 'asc');
            }
        }

        $products = $query->get();

        return response()->json($products, 200);
    }

    //get by single product
    public function show($id){
        $product = Product::with('brand')->findOrFail($id);

        return response()->json($product, 200);
    }

    public function store(Request $request){
        $request->validate([
            'name'=> 'required|string|max: 255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|numeric|min:0',
            'gender' => 'required|in:men,women',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'brand_id' => 'required|exists:brands,id'
        ]);

        $imagePath = $request->file('image')->store('products', 'public');

        // Merge the image path into request data
        $data = $request->all();
        $data['image'] = $imagePath;

        $product = Product::create($data);

        return response()->json([
            'message' => "product created successfully",
            'product' => $product
        ], 201);
    }

    public function update(Request $request, $id){
        $product = Product::findOrFail($id);

        $request->validate([
            'name'=> 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|numeric|min:0',
            'gender' => 'sometimes|required|in:men,women',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'brand_id' => 'sometimes|required|exists:brands,id'
        ]);

        $data = $request->all();

        if($request->has('image')){
            if($product->image && Storage::disk('public')->exists($product->image)){
                Storage::disk('public')->delete($product->image);
            }

            $imagePath = $request->file('image')->store('products', 'public');
            $data['image'] = $imagePath;
        }

        $product->update($data);

        return response()->json([
            'message' => "Product updated successfully",
            'product' => $product
        ], 200);
    }

    public function destroy($id){
        $product = Product::findOrFail($id);

        if($product->image && Storage::disk('public')->exists($product->image)){
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => "Product deleted successfully"
        ], 200);
    }
}
