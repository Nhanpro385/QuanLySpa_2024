<?php

use App\Http\Controllers\Admin\ServiceCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route ServiceCategories
Route::group([
    'middleware' => 'api',
    'prefix' => 'v0.0.1/admin/serviceCategory',
], function ($router) {
    Route::get('/', [ServiceCategoryController::class, 'index']);
    Route::post('/create', [ServiceCategoryController::class, 'store']);
    Route::get('/{id}', [ServiceCategoryController::class, 'show']);
    Route::post('/{id}/edit', [ServiceCategoryController::class, 'update']);
    Route::delete('/{id}/delete', [ServiceCategoryController::class, 'destroy']);
});
//End
