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
            $table->tinyInteger('promotion_type')->default(1);
            $table->decimal('discount_percent', 20, 2);
            $table->text('description')->nullable();
            $table->decimal('min_order_amount', 20, 2);
            $table->integer('min_quantity')->default(1);
            $table->string('image_url')->nullable();
            $table->boolean('status')->default(true);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('promotions', function (Blueprint $table) {
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
        Schema::dropIfExists('promotions');
    }
};
