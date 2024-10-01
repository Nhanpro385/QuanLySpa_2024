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
        Schema::create('appointment_staffs', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('appointment_id', 20)->nullable();
            $table->string('staff_id', 20)->nullable();
            $table->timestamps();
        });

        Schema::table('appointment_staffs', function (Blueprint $table) {

            $table->foreign('appointment_id')
                ->references('id')
                ->on('appointments')
                ->onDelete('set null');

            $table->foreign('staff_id')
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
        Schema::table('appointment_staffs', function (Blueprint $table) {
            $table->dropForeign('appointment_staffs_appointment_id_foreign');
            $table->dropForeign('appointment_staffs_staff_id_foreign');
        });
        Schema::dropIfExists('appointment_staffs');
    }
};
