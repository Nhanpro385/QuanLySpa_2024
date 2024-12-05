<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('outbound_invoices', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('staff_id', 20)->nullable();
            $table->string('note')->nullable();
            $table->enum('outbound_invoice_type', ['service', 'use']);
            $table->decimal('total_amount', 20, 2);
            $table->boolean('status')->default(true);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('staff_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('outbound_invoices');
    }
};
