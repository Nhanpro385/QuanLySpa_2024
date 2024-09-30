<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\CategoryController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route Categories
Route::group([
    'middleware' => 'api',
    'prefix' => 'v0.0.1/admin/category',
], function ($router) {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/create', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/{id}/edit', [CategoryController::class, 'update']);
    Route::delete('/{id}/delete', [CategoryController::class, 'destroy']);
});
//End

// Route Supplier
Route::group([
    'middleware' => 'api',
    'prefix' => 'v0.0.1/admin/supplier',
], function ($router) {
    Route::get('/', [SupplierController::class, 'index']);
    Route::post('/create', [SupplierController::class, 'store']);
    Route::get('/{id}', [SupplierController::class, 'show']);
    Route::put('/{id}/edit', [SupplierController::class, 'update']);
    Route::delete('/{id}/delete', [SupplierController::class, 'destroy']);
});
//End

