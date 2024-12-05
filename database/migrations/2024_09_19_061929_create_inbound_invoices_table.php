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
        Schema::create('inbound_invoices', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('staff_id', 20)->nullable();
            $table->string('supplier_id', 20)->nullable();
            $table->string('note')->nullable();
            $table->decimal('total_amount', 20, 2);
            $table->boolean('status')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('inbound_invoices', function (Blueprint $table) {
            $table->foreign('staff_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('supplier_id')
                ->references('id')
                ->on('suppliers')
                ->onDelete('set null');
        });
        Schema::table('inbound_invoices', function (Blueprint $table) {
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inbound_invoices');
    }
};
