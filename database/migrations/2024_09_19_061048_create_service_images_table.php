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
        Schema::create('service_images', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('service_id', 20)->nullable();
            $table->string('image_url');
            $table->string('created_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('service_images', function (Blueprint $table) {

            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('set null');

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_images');
    }
};
