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
        Schema::create('payments', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('promotion_id', 20)->nullable();
            $table->string('appointment_id', 20)->nullable();
            $table->decimal('service_total', 20, 2);
            $table->decimal('product_total', 20, 2);
            $table->decimal('subtotal', 20, 2);
            $table->decimal('reduce', 20, 2)->nullable();
            $table->decimal('total_amount', 20, 2);
            $table->boolean('payment_type')->default(1);
            $table->boolean('status')->default(false);
            $table->string('created_by', 20)->nullable();
            $table->timestamps();
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->foreign('promotion_id')->references('id')->on('promotions')->onDelete('set null');
            $table->foreign('appointment_id')
                ->references('id')
                ->on('appointments')
                ->onDelete('set null');
            $table->foreign('created_by')
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
        Schema::dropIfExists('payments');
    }
};
