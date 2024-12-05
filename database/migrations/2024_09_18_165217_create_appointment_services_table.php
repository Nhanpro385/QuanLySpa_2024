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
        Schema::create('appointment_services', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('appointment_id', 20)->nullable();
            $table->string('service_id', 20)->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('price', 20, 2);
            $table->timestamps();
        });

        Schema::table('appointment_services', function (Blueprint $table) {

            $table->foreign('appointment_id')
                ->references('id')
                ->on('appointments')
                ->onDelete('set null');

            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_services');
    }
};
