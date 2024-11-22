<?php

use App\Http\Controllers\Auth\Client\AuthCustomerController;
use App\Http\Controllers\Auth\Client\NewPasswordController;
use App\Http\Controllers\Auth\Client\PasswordResetLinkController;
use Illuminate\Support\Facades\Route;


//AUTH CUSTOMER
Route::group([
    'prefix' => 'authCustomer'
], function ($router) {
    Route::post('/login', [AuthCustomerController::class, 'login']);
    Route::get('/me', [AuthCustomerController::class, 'me'])->middleware('auth:customer_api');
    Route::post('/logout', [AuthCustomerController::class, 'logout'])->middleware('auth:customer_api');
    Route::post('/register', [AuthCustomerController::class, 'register']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);
});
