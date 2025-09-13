<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'ref_num',
        'description',
        'price',
        'stock',
        'gender',
        'image',
        'brand_id'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function orderItems()
    {
        return $this->hasMany(Order_Item::class);
    }

    public function cartItems()
    {
        return $this->hasMany(Cart_item::class);
    }
}
