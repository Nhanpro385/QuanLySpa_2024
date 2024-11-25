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
        // Tạo bảng 'inbound_invoice_details'
        Schema::create('inbound_invoice_details', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('product_id', 20)->nullable();
            $table->string('inbound_invoice_id', 20)->nullable();
            $table->integer('quantity_olded');
            $table->integer('quantity_import');
            $table->decimal('cost_import', 10, 2);
            $table->decimal('cost_olded', 10, 2);
            $table->decimal('unit_price', 10, 2);
            $table->timestamps();
        });

        // Thêm ràng buộc khóa ngoại
        Schema::table('inbound_invoice_details', function (Blueprint $table) {
            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('set null');

            $table->foreign('inbound_invoice_id')
                ->references('id')
                ->on('inbound_invoices')
                ->onDelete('set null');
        });

        // Thêm cột soft deletes
        Schema::table('inbound_invoice_details', function (Blueprint $table) {
            $table->softDeletes(); // Thêm cột deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Xóa ràng buộc khóa ngoại trước khi xóa bảng
        Schema::table('inbound_invoice_details', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropForeign(['inbound_invoice_id']);
        });

        // Xóa bảng
        Schema::dropIfExists('inbound_invoice_details');
    }
};