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
            $table->decimal('pay', 10, 2);
            $table->decimal('reduce', 10, 2)->nullable();
            $table->decimal('total_amount', 10, 2);
            $table->enum('payment_type', ['cash', 'transfer']);
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
                ->on('staffs')
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
