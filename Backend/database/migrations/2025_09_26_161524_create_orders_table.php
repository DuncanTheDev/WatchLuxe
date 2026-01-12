<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->nullable()->constrained()->onDelete("cascade");
            $table->string("guest_email")->nullable();
            $table->foreignId("shipping_address_id")->nullable()->constrained('addresses')->onDelete('cascade');
            $table->foreignId("billing_address_id")->nullable()->constrained('addresses')->onDelete('cascade');
            $table->decimal("subtotal", 10, 2);
            $table->decimal("shipping_fee", 10, 2)->default(0);
            $table->decimal("total_price", 10, 2);
            $table->enum("shipping_method", ["standard", "priority", "express"]);
            $table->enum("status", ["pending", "paid", "shipped", "delivered", "cancelled"]);
            $table->string("payment_method");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
