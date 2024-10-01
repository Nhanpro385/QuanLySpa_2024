<?php

use App\Http\Controllers\Admin\ServiceCategoryController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route Users
Route::group([
    'middleware' => 'api',
    'prefix' => 'v0.0.1/admin',
], function ($router) {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::get('/serviceCategories', [ServiceCategoryController::class, 'index']);
    Route::get('/serviceCategories/{id}', [ServiceCategoryController::class, 'show']);
    Route::post('/serviceCategories', [ServiceCategoryController::class, 'store']);
    Route::put('/serviceCategories/{id}', [ServiceCategoryController::class, 'update']);
    Route::delete('/serviceCategories/{id}', [ServiceCategoryController::class, 'destroy']);

});
//End
