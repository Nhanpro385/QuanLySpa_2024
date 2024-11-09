<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\AppointmentStaff;
use App\Models\Category;
use App\Models\Comment;
use App\Models\CommentImage;
use App\Models\CommentImages;
use App\Models\Consulation;
use App\Models\Contact;
use App\Models\Customer;
use App\Models\InboundInvoice;
use App\Models\InboundInvoiceDetail;
use App\Models\Inventory;
use App\Models\Notification;
use App\Models\OutboundInvoice;
use App\Models\OutboundInvoiceDetail;
use App\Models\Payment;
use App\Models\PaymentProducts;
use App\Models\Position;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductImages;
use App\Models\ProductService;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceImage;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\StaffShift;
use App\Models\Supplier;
use App\Models\TreatmentHistory;
use App\Models\TreatmentProduct;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Position::factory(10)->create();
        Contact::factory(10)->create();
        User::factory(10)->create();
        Customer::factory(10)->create();
        Category::factory(10)->create();
        Supplier::factory(10)->create();
        Shift::factory(10)->create();
        Notification::factory(10)->create();
        ServiceCategory::factory(10)->create();
        Appointment::factory(10)->create();
        Product::factory(10)->create();
        Service::factory(10)->create();
        Promotion::factory(10)->create();
        Consulation::factory(10)->create();
        StaffShift::factory(10)->create();
        AppointmentStaff::factory(10)->create();
        AppointmentService::factory(10)->create();
        TreatmentHistory::factory(10)->create();
        ProductService::factory(10)->create();
        Comment::factory(10)->create();
        Payment::factory(10)->create();
        PaymentProducts::factory(10)->create();
        Inventory::factory(10)->create();
        ServiceImage::factory(10)->create();
        ProductImage::factory(10)->create();
        CommentImage::factory(10)->create();
        InboundInvoice::factory(10)->create();
        OutboundInvoice::factory(10)->create();
        InboundInvoiceDetail::factory(10)->create();
        OutboundInvoiceDetail::factory(10)->create();
    }
}
