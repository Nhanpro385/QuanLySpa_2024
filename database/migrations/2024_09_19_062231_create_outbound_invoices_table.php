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
        Schema::create('outbound_invoices', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('staff_id', 20)->nullable();
            $table->string('note')->nullable();
            $table->enum('outbound_invoice_type', ['service', 'use']);
            $table->decimal('total_amount', 10, 2);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
        Schema::table('outbound_invoices', function (Blueprint $table) {
            $table->foreign('staff_id')->references('id')->on('staffs')->onDelete('set null');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outbound_invoices');
    }
};
