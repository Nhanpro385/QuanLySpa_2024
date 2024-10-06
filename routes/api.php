<?php

use App\Http\Controllers\Admin\ServiceCategoryController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;

// Route Users
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route Category, Users, Service Categories, Supplier, Customer
Route::group([
    'middleware' => 'api',
    'prefix' => 'v0.0.1/admin',
], function () {
    // Users
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    
    // Service Categories
    Route::get('/serviceCategories', [ServiceCategoryController::class, 'index']);
    Route::get('/serviceCategories/{id}', [ServiceCategoryController::class, 'show']);
    Route::post('/serviceCategories', [ServiceCategoryController::class, 'store']);
    Route::put('/serviceCategories/{id}', [ServiceCategoryController::class, 'update']);
    Route::delete('/serviceCategories/{id}', [ServiceCategoryController::class, 'destroy']);

    // Categories
    Route::get('/category', [CategoryController::class, 'index']);
    Route::get('/category/{id}', [CategoryController::class, 'show']);
    Route::post('/category', [CategoryController::class, 'store']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'destroy']);
    
    // Supplier
    Route::get('/supplier', [SupplierController::class, 'index']);
    Route::post('/supplier', [SupplierController::class, 'store']);
    Route::get('/supplier/{id}', [SupplierController::class, 'show']);
    Route::put('/supplier/{id}', [SupplierController::class, 'update']);
    Route::delete('/supplier/{id}', [SupplierController::class, 'destroy']);
    
    // Customer
    Route::get('/customer', [CustomerController::class, 'index']);
    Route::post('/customer', [CustomerController::class, 'store']);
    Route::get('/customer/{id}', [CustomerController::class, 'show']);
    Route::put('/customer/{id}', [CustomerController::class, 'update']);
    Route::delete('/customer/{id}', [CustomerController::class, 'destroy']);
});
// End

