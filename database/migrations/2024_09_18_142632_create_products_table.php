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
        Schema::create('products', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('category_id', 20)->nullable();
            $table->string('name')->unique();
            $table->decimal('price', 20, 2);
            $table->decimal('cost', 20, 2);
            $table->integer('capacity');
            $table->string('bar_code', 20);
            $table->date('date');
            $table->string('image_url')->default('default.jpg');
            $table->text('description');
            $table->tinyInteger('priority')->default(1);
            $table->boolean('status')->default(true);
            $table->string('created_by', 20)->nullable();
            $table->string('updated_by', 20)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreign(columns: 'created_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
