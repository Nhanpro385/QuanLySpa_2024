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
        Schema::create('outbound_invoice_details', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('product_id', 20)->nullable();
            $table->string('outbound_invoice_id', 20)->nullable();
            $table->integer('quantity_export');
            $table->integer('quantity_olded');
            $table->decimal('unit_price', 10, 2);
            $table->timestamps();
        });

        Schema::table('outbound_invoice_details', function (Blueprint $table) {
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
            $table->foreign('outbound_invoice_id')
                ->references('id')
                ->on('outbound_invoices')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outbound_invoice_details');
    }
};
