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
        Schema::create('comments', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('service_id', 20)->nullable();
            $table->string('customer_id', 20)->nullable();
            $table->string('parent_comment_id', 20)->nullable();
            $table->string('appointment_id', 20)->nullable();
            $table->string('comment', 255);
            $table->integer('rate')->nullable();
            $table->boolean('status')->default(true);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->boolean('type')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('set null');
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('set null');
            $table->foreign('parent_comment_id')
                ->references('id')
                ->on('comments')
                ->onDelete('set null');
            $table->foreign('appointment_id')
                ->references('id')
                ->on('appointments')
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
        Schema::dropIfExists('comments');
    }
};
