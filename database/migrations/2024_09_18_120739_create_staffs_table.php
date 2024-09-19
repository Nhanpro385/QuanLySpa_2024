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
        Schema::create('staffs', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('position_id', 20)->nullable();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['supper', 'advice', 'staff'])->default('staff');
            $table->string('full_name');
            $table->enum('gender', ['male', 'female'])->default('female');
            $table->string('phone', 20)->unique();
            $table->string('address');
            $table->date('date_of_birth');
            $table->string('note')->nullable();
            $table->boolean('status')->default(true);
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            $table->softDeletes();
            $table->string('created_by', 20)->nullable();
            $table->timestamps();
        });

        Schema::table('staffs', function (Blueprint $table) {
            $table->foreign('position_id')
                ->references('id')
                ->on('positions')
                ->onDelete('set null');

            $table->foreign('created_by')
                ->references('id')
                ->on('staffs')
                ->onDelete('no action');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('staff_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('staff_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staffs');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
