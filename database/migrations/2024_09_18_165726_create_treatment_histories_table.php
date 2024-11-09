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
        Schema::create('treatment_histories', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('customer_id', 20)->nullable();
            $table->string('appointment_id', 20)->nullable();
            $table->string('staff_id', 20)->nullable();
            $table->string('image_before');
            $table->string('image_after');
            $table->string('feedback');
            $table->string('note')->nullable();
            $table->boolean('status')->default(true);
            $table->tinyInteger('evaluete')->nullable();
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('treatment_histories', function (Blueprint $table) {
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('set null');

            $table->foreign('appointment_id')
                ->references('id')
                ->on('appointments')
                ->onDelete('set null');

            $table->foreign('staff_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('treatment_histories');
    }
};
