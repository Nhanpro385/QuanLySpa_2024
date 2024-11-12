<?php

use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\ServiceCategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ContactsController;
use App\Http\Controllers\Admin\ShiftsController;
use App\Http\Controllers\Admin\StaffShiftController;
use App\Http\Controllers\Admin\TreatmentHistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Auth\Admin\AuthController;
// use App\Http\Controllers\Admin\StaffShiftController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\ServiceController;

require __DIR__ . '/auth.php';

// Route Users
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'v0.0.1/admin',
], function () {
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

    Route::get('/positions', [PositionController::class, 'index']);
    Route::get('/positions/{id}', [PositionController::class, 'show']);
    Route::post('/positions', [PositionController::class, 'store']);
    Route::put('/positions/{id}', [PositionController::class, 'update']);
    Route::delete('/positions/{id}', [PositionController::class, 'destroy']);

    // Shifts
    Route::get('/shifts', [ShiftsController::class, 'index']);
    Route::post('/shifts', [ShiftsController::class, 'store']);
    Route::get('/shifts/{id}', [ShiftsController::class, 'show']);
    Route::put('/shifts/{id}', [ShiftsController::class, 'update']);
    Route::delete('/shifts/{id}', [ShiftsController::class, 'destroy']);

    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/products/uploadImages/{id}', [ProductController::class, 'uploadImages']);
    Route::delete('/products/deleteImage/{id}', [ProductController::class, 'deleteImage']);
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::post('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    Route::post('/services/products/{id}', [ServiceController::class, 'serviceProducts']);
    Route::put('/services/products/{id}', [ServiceController::class, 'serviceUpdateProducts']);

    //Appointment

    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);


    //Payments

    Route::get('/payments', [PaymentController::class, 'index']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::get('/payments/{id}', [PaymentController::class, 'show']);
    Route::put('/payments/{id}', [PaymentController::class, 'update']);

});
//End

//Route JWT
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
    Route::put('/me/{id}', [AuthController::class, 'update'])->middleware('auth:api')->name('meUpdate');
    Route::patch('/me/resetPassword', [AuthController::class, 'resetPassword'])->middleware('auth:api')->name('meResetPassword');



    Route::get('/contacts', [ContactsController::class, 'index']);
    Route::post('/contacts', [ContactsController::class, 'store']);
    Route::get('/contacts/{id}', [ContactsController::class, 'show']);
    Route::put('/contacts/{id}', [ContactsController::class, 'update']);
    Route::delete('/contacts/{id}', [ContactsController::class, 'destroy']);

 

    Route::get('/treatment-history', [TreatmentHistoryController::class, 'index']);
    Route::post('/treatment-history', [TreatmentHistoryController::class, 'store']);
    Route::get('/treatment-history/{id}', [TreatmentHistoryController::class, 'show']);
    Route::put('/treatment-history/{id}', [TreatmentHistoryController::class, 'update']);
    Route::delete('/treatment-history/{id}', [TreatmentHistoryController::class, 'destroy']);

    Route::get('/staff-shifts', [StaffShiftController::class, 'index']);
    Route::post('/staff-shifts', [StaffShiftController::class, 'store']);
    Route::get('/staff-shifts/{id}', [StaffShiftController::class, 'show']);
    Route::put('/staff-shifts/{id}', [StaffShiftController::class, 'update']);
    Route::delete('/staff-shifts/{id}', [StaffShiftController::class, 'destroy']);

});

//End


// Route Category
Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'v0.0.1/admin',
], function ($router) {
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

    // Staff Shift
    Route::get('/staff-shift', [StaffShiftController::class, 'index']);
    Route::post('/staff-shift', [StaffShiftController::class, 'store']);
    Route::get('/staff-shift/{id}', [StaffShiftController::class, 'show']);
    Route::put('/staff-shift/{id}', [StaffShiftController::class, 'update']);
    Route::delete('/staff-shift/{id}', [StaffShiftController::class, 'destroy']);

    // Comments
    Route::get('/comment', [CommentController::class, 'index']);
    Route::post('/comment', [CommentController::class, 'store']);
    Route::get('/comment/{id}', [CommentController::class, 'show']);
    Route::put('/comment/{id}', [CommentController::class, 'update']);
    Route::delete('/comment/{id}', [CommentController::class, 'destroy']);
    Route::post('/comment/{id}/reply', [CommentController::class, 'reply']);

    // Promotions
    Route::get('/promotion', [PromotionController::class, 'index']);
    Route::post('/promotion', [PromotionController::class, 'store']);
    Route::get('/promotion/{id}', [PromotionController::class, 'show']);
    Route::put('/promotion/{id}', [PromotionController::class, 'update']);
    Route::delete('/promotion/{id}', [PromotionController::class, 'destroy']);




});


// End





