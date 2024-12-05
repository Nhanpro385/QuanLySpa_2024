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
        Schema::create('services', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('service_category_id', 20)->nullable();
            $table->string('name')->unique();
            $table->decimal('price', 20, 2);
            $table->text('description');
            $table->string('image_url')->default('default.jpg');
            $table->integer('duration');
            $table->tinyInteger('priority')->default(1);
            $table->boolean('status')->default(true);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
            $table->foreign('service_category_id')
                ->references('id')
                ->on('service_categories')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign('services_service_category_id_foreign');
            $table->dropForeign('services_created_by_foreign');
        });
        Schema::dropIfExists('services');
    }
};
