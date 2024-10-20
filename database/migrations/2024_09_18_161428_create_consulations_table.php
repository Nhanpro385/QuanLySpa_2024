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
        Schema::create('consulations', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('customer_id', 20)->nullable();
            $table->string('staff_id', 20)->nullable();
            $table->string('consulation');
            $table->string('skin_condition');
            $table->string('treatment_plan');
            $table->boolean('status')->default(true);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('consulations', function (Blueprint $table) {

            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
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
        Schema::dropIfExists('consulations');
    }
};
