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
        Schema::create('promotions', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('name')->unique();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->enum('promotion_type', ['cash', 'percent']);
            $table->decimal('discount_percent', 10, 2);
            $table->boolean('status')->default(true);
            $table->string('created_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('promotions', function (Blueprint $table) {
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
        Schema::dropIfExists('promotions');
    }
};
