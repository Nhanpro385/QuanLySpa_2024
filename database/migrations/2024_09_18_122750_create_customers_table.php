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
        Schema::create('customers', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('full_name');
            $table->enum('gender', ['male', 'female'])->default('female');
            $table->string('phone', 20)->unique();
            $table->string('address');
            $table->date('date_of_birth');
            $table->string('note')->nullable();
            $table->boolean('status')->default(true);
            $table->rememberToken();
            $table->softDeletes();
            $table->string('created_by', 20)->nullable();
            $table->timestamps();
        });
        Schema::table('customers', function (Blueprint $table) {
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
        Schema::dropIfExists('customers');
    }
};
