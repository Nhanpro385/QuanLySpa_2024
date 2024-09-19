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
        Schema::create('treatment_products', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('treatment_history_id', 20)->nullable();
            $table->string('product_id', 20)->nullable();
            $table->integer('quantity_used');
            $table->timestamps();
        });

        Schema::table('treatment_products', function (Blueprint $table) {

            $table->foreign('treatment_history_id')
                ->references('id')
                ->on('treatment_histories')
                ->onDelete('set null');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatment_products');
    }
};
