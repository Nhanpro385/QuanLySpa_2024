<?php

use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\ServiceCategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ContactsController;
use App\Http\Controllers\Client\ContactController as ClientContactsController;
use App\Http\Controllers\Admin\ShiftsController;
use App\Http\Controllers\Client\ClientTreatmentHistoryController;
use App\Http\Controllers\Client\ShiftsController as ClientShiftsController;
use App\Http\Controllers\Admin\StaffShiftController;
use App\Http\Controllers\Admin\TreatmentHistoryController;
use App\Http\Controllers\Admin\InboundInvoiceController;
use App\Http\Controllers\Admin\OutboundInvoiceController;
use App\Http\Controllers\Admin\InventoryController as InventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Auth\Admin\AuthController;
// use App\Http\Controllers\Admin\StaffShiftController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\ConsulationController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\StatisticalController;
use App\Http\Controllers\Client\AppointmentController as ClientAppointmentController;
use App\Http\Controllers\Client\ServiceCategoryController as ClientServiceCategoryController;
use App\Http\Controllers\Client\ServiceController as ClientServiceController;
use App\Http\Controllers\Client\UserController as ClientUserController;
use App\Http\Controllers\Client\ClientCustomerAccountController;
use App\Http\Controllers\Client\ConsulationController as ClientConsulationController;
use App\Http\Controllers\Client\ClientCommentController;
use App\Http\Controllers\Client\ClientPromotionController;

use App\Http\Controllers\Client\Promotion\PromotionController as PromotionPromotionController;

require __DIR__ . '/authCustomer.php';
require __DIR__ . '/auth.php';

// Route ADMIN Quản trị viên - nhân viên
Route::group([
    'middleware' => ['api', 'auth:api', 'roleUser'],
    'prefix' => 'v0.0.1/admin',
], function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);


    Route::get('/shifts', [ShiftsController::class, 'index']);
    Route::post('/shifts', [ShiftsController::class, 'store']);
    Route::get('/shifts/{id}', [ShiftsController::class, 'show']);
    Route::put('/shifts/{id}', [ShiftsController::class, 'update']);
    Route::delete('/shifts/{id}', [ShiftsController::class, 'destroy']);


    Route::get('/inbound-invoices', [InboundInvoiceController::class, 'index']);
    Route::post('/inbound-invoices', [InboundInvoiceController::class, 'store']);
    Route::get('/inbound-invoices/{id}', [InboundInvoiceController::class, 'show']);
    Route::put('/inbound-invoices/{inboundInvoiceId}', [InboundInvoiceController::class, 'update']);
    Route::delete('/inbound-invoices/{id}', [InboundInvoiceController::class, 'destroy']);


    Route::get('/outbound-invoices', [OutboundInvoiceController::class, 'index']);
    Route::post('/outbound-invoices', [OutboundInvoiceController::class, 'store']);
    Route::get('/outbound-invoices/{id}', [OutboundInvoiceController::class, 'show']);
    Route::put('/outbound-invoices/{id}', [OutboundInvoiceController::class, 'update']);
    Route::delete('/outbound-invoices/{id}', [OutboundInvoiceController::class, 'destroy']);

    Route::get('/inventory', [InventoryController::class, 'index']); // Lấy danh sách inventory
    Route::get('/inventory/{id}', [InventoryController::class, 'show']); // Hiển thị chi tiết inventory
    Route::get('/inventory/history/{productId}', [InventoryController::class, 'getInventoryHistory']); // Hiển thị lịch sử inventory của sản phẩm


    Route::get('/contacts', [ContactsController::class, 'index']);
    Route::post('/contacts', [ContactsController::class, 'store']);
    Route::get('/contacts/{id}', [ContactsController::class, 'show']);
    Route::put('/contacts/{id}', [ContactsController::class, 'update']);
    Route::delete('/contacts/{id}', [ContactsController::class, 'destroy']);

    Route::get('/staff-shifts', [StaffShiftController::class, 'index']);
    Route::post('/staff-shifts', [StaffShiftController::class, 'store']);
    Route::get('/staff-shifts/{id}', [StaffShiftController::class, 'show']);
    Route::put('/staff-shifts/{id}', [StaffShiftController::class, 'update']);
    Route::delete('/staff-shifts/{id}', [StaffShiftController::class, 'destroy']);



    Route::get('/treatment-history', [TreatmentHistoryController::class, 'index']);
    Route::get('/customers/{customer_id}/treatment-history', [TreatmentHistoryController::class, 'getByCustomerId']);

    Route::post('/treatment-history', [TreatmentHistoryController::class, 'store']);
    Route::get('/treatment-history/{id}', [TreatmentHistoryController::class, 'show']);
    Route::post('/treatment-history/{id}', [TreatmentHistoryController::class, 'update']);
    Route::delete('/treatment-history/{id}', [TreatmentHistoryController::class, 'destroy']);
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

    //Consulations
    Route::delete('/consulations/{id}', [ConsulationController::class, 'destroy']);

});
//End Route ADMIN Quản trị viên - nhân viên


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
    Route::post('/comment/{id}', [CommentController::class, 'update']);
    Route::delete('/comment/{id}', [CommentController::class, 'destroy']);
    Route::post('/comment/{id}/reply', [CommentController::class, 'reply']);

    // Promotions
    Route::get('/promotion', [PromotionController::class, 'index']);
    Route::post('/promotion', [PromotionController::class, 'store']);
    Route::get('/promotion/{id}', [PromotionController::class, 'show']);
    Route::post('/promotion/{id}', [PromotionController::class, 'update']);
    Route::delete('/promotion/{id}', [PromotionController::class, 'destroy']);

    //Statistical
    Route::get('/statistical/dailyRevenues', [StatisticalController::class, 'dailyRevenues']);

    Route::get('/statistical/weeklyRevenues', [StatisticalController::class, 'weeklyRevenues']);

    Route::get('/statistical/monthlyRevenues', [StatisticalController::class, 'monthlyRevenues']);

    Route::get('/statistical/appointments', [StatisticalController::class, 'appointments']);

    Route::get('/statistical/consulations', [StatisticalController::class, 'consulations']);

    Route::get('/statistical/staffConsulations', [StatisticalController::class, 'staffConsulations']);

    Route::get('/statistical/staffAppoiments', [StatisticalController::class, 'staffAppoiments']);

});
Route::group([
    'middleware' => ['api'],
    'prefix' => 'v0.0.1/client',
], function ($router) {

    //customer
    Route::get('/customer', [ClientCustomerAccountController::class, 'viewProfile'])->middleware('auth:customer_api');
    Route::put('/customer/{id}', [ClientCustomerAccountController::class, 'update'])->middleware('auth:customer_api');
    Route::post('/customer/{id}', [ClientCustomerAccountController::class, 'updatePassword'])->middleware('auth:customer_api');

    //comment
    Route::get('/comment', [ClientCommentController::class, 'index']);
    Route::get('/comment/{id}', [ClientCommentController::class, 'show'])->middleware('auth:customer_api');
    Route::post('/comment', [ClientCommentController::class, 'store'])->middleware('auth:customer_api');
    Route::post('/comment/{id}', [ClientCommentController::class, 'update'])->middleware('auth:customer_api');
    Route::delete('/comment/{id}', [ClientCommentController::class, 'destroy'])->middleware('auth:customer_api');
    Route::post('/comment/{id}/reply', [ClientCommentController::class, 'reply'])->middleware('auth:customer_api');

    //Promotion
    Route::get('/treatment-history/{id}', [TreatmentHistoryController::class, 'show']);

    Route::get('/promotion', [ClientPromotionController::class, 'index']);



    Route::get('/shifts', [ClientShiftsController::class, 'index']);

    Route::get('/shifts/{id}', [ClientShiftsController::class, 'show']);

    Route::get('/customers/{customer_id}/treatment-history', [ClientTreatmentHistoryController::class, 'getByCustomerId']);


    Route::get('/contacts', [ClientContactsController::class, 'index']);

    Route::get('/contacts/{id}', [ClientContactsController::class, 'show']);
});



// End



//Route ADMIN Nhân viên chăm sóc khách hàng
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'v0.0.1/admin',
], function () {
    Route::get('/consulations', [ConsulationController::class, 'index']);
    Route::get('/consulations/{id}', [ConsulationController::class, 'show']);
    Route::put('/consulations/{id}', [ConsulationController::class, 'update']);
    Route::post('/consulations/{id}/browse', [ConsulationController::class, 'browse']);

    //Notification
    Route::get('/notifications', [NotificationController::class, 'index']);


});

//END Route ADMIN Nhân viên chăm sóc khách hàng

// Route Client
Route::group([
    'middleware' => ['api'],
    'prefix' => 'v0.0.1/client',
], function () {
    Route::get('/serviceCategories', [ClientServiceCategoryController::class, 'index']);
    Route::get('/serviceCategories/{id}', [ClientServiceCategoryController::class, 'show']);

    Route::get('/staffs', [ClientUserController::class, 'index']);
    Route::get('/staffs/{id}', [ClientUserController::class, 'show']);
    Route::post('/contacts', [ClientContactsController::class, 'store']);

    Route::get('/services', [ClientServiceController::class, 'index']);
    Route::get('/services/{id}', [ClientServiceController::class, 'show']);

    Route::post('/consulations', [ClientConsulationController::class, 'store'])->middleware(['auth:customer_api', 'checkStatusCustomer']);


    Route::post('/appointments', [ClientAppointmentController::class, 'store'])->middleware(['auth:customer_api', 'checkStatusCustomer']);
});
//END Client
