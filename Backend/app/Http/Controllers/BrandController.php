<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(){
        return response()->json(Brand::all(),200);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255|unique:brands'
        ]);

        $brand = Brand::create($request->all());

        return response()->json($brand, 201);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'sometimes|string|max:255|unique:brands'
        ]);

        $brand = Brand::findOrFail($id);
        $brand->update($request->all);

        return response()->json($brand, 200);
    }

    public function destroy($id){
        $brand = Brand::findOrFail($id);
        if(!$brand){
            return response()->json(['message'=>'Brand not found', 404]);
        }

        $brand->delete();

        return response()->json(['message'=>"Brand deleted successfully", 200]);
    }
}
