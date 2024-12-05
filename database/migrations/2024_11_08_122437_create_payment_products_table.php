<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_products', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('product_id', 20)->nullable();
            $table->string('payment_id', 20)->nullable();
            $table->integer('quantity');
            $table->decimal('unit_price', 20, 2);
            $table->decimal('total_price', 20, 2);
            $table->timestamps();
        });

        Schema::table('payment_products', function (Blueprint $table) {
            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('set null');
            $table->foreign('payment_id')
                ->references('id')
                ->on('payments')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_products');
    }
};
