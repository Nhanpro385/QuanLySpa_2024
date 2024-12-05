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
            $table->decimal('cost_import', 20, 2);
            $table->decimal('cost_olded', 20, 2);
            $table->decimal('unit_price', 20, 2);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->timestamps();
            $table->softDeletes(); // Thêm cột deleted_at

            // Ràng buộc khóa ngoại
            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('set null');

            $table->foreign('inbound_invoice_id')
                ->references('id')
                ->on('inbound_invoices')
                ->onDelete('set null');

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
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
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
        });

        // Xóa bảng
        Schema::dropIfExists('inbound_invoice_details');
    }
};
