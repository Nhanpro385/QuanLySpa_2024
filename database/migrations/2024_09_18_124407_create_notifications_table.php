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
        Schema::create('notifications', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('staff_id', 20);
            $table->string('notification_type');
            $table->string('content');
            $table->string('url_notification');
            $table->integer('pin')->default(1);
            $table->boolean('status')->default(false);
            $table->string('created_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });


        Schema::table('notifications', function (Blueprint $table) {
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
        Schema::dropIfExists('notifications');
    }
};
