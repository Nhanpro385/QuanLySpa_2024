<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Appointments\AppointmentResquest;
use App\Http\Resources\Client\Appointments\AppointmentResource;
use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\Inventory;
use App\Models\Notification;
use App\Models\Service;
use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Kra8\Snowflake\Snowflake;

class AppointmentController extends Controller
{
    public function store(AppointmentResquest $request)
    {
        try {
            $validateData = $request->validated();

            // 1. Kiểm tra ca làm
            $shift = Shift::where('id', '=', $validateData['shift_id'])
                ->first();

            if (!$shift) {
                return response()->json([
                    "status" => "error",
                    "message" => "Thời gian lịch hẹn không hợp lệ.",
                    'error' => 'Ca làm hiện tại và lịch hẹn không hợp lệ.'
                ], 404);
            }

            $countAppointmentShift = Appointment::where('shift_id', $validateData['shift_id'])->whereIn('status', [1, 2])->count();
            if ($shift->max_customers <= $countAppointmentShift) {
                return response()->json([
                    "status" => false,
                    "message" => "Số lượng khách hàng đặt lịch đã đến giới hạn.",
                ], 403);
            }

            $appointment_customer = Appointment::where('customer_id', auth('customer_api')->user()->id)
                ->where('shift_id', $validateData['shift_id'])
                ->whereIn('status', [1, 2, 3])
                ->exists();

            if ($appointment_customer) {
                return response()->json([
                    "status" => false,
                    "message" => "Bạn đã đặt lịch cho thời gian trên.",
                ], 403);
            }

            $currentDate = Carbon::now();
            $today = $currentDate->format('Y-m-d');

            if ($today > $shift->shift_date) {
                return response()->json([
                    "status" => false,
                    "message" => "Đã có lỗi xảy ra vui lòng liên hệ để nhận được hỗ trợ.",
                ], 403);
            }

            if ($today == $shift->shift_date) {
                $shift = Shift::where('id', '=', $validateData['shift_id'])
                    ->whereDate('shift_date', Carbon::today())
                    ->whereTime('start_time', '<=', $validateData['start_time'])
                    ->whereTime('end_time', '>=', $validateData['start_time'])
                    ->first();

                if (!$shift) {
                    return response()->json([
                        "status" => "error",
                        "message" => "Thời gian lịch hẹn không hợp lệ.",
                        'error' => 'Ca làm hiện tại và lịch hẹn không hợp lệ.'
                    ], 404);
                }
            }


            // Thêm mới lịch hẹn và liên kết nhân viên
            DB::beginTransaction();

            // Tạo lịch hẹn
            $appointment = Appointment::create([
                'id' => app(Snowflake::class)->next(),
                'shift_id' => $validateData['shift_id'],
                'customer_id' => auth('customer_api')->user()->id,
                'start_time' => $validateData['start_time'] ?? $shift->start_time,
                'note' => $validateData['note'],
                'appointment_date' => $shift->shift_date,
                'status' => 1
            ]);

            //Kiểm tra số lượng sản phẩm cần thực hiện.

            $products_out_of_stock = [];
            $service_total = 0;

            foreach ($validateData['services'] as $index => $productService) {
                $service = Service::with('products')->find($productService['service_id']);
                $service_total += $service->price;
                foreach ($service->products as $product) {
                    $productId = $product->id;
                    $quantity_needed = $product->pivot->quantity_used * $productService['quantity'];
                    array_push($products_out_of_stock, [
                        'product_id' => $productId,
                        'quantity' => $quantity_needed
                    ]);
                }
            }

            foreach ($products_out_of_stock as $product) {
                $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                if (!$inventory || $inventory->quantity < $product['quantity'] || $inventory->quantity <= 0) {
                    DB::rollBack();
                    return response()->json([
                        "status" => "error",
                        "message" => "Xin lỗi dịch vụ bạn cần thực hiện hiện tại chúng tôi không thể đáp ứng đủ sản phẩm.",
                        'error' => 'Số lượng sản phẩm: ' . $product['product_id'] . ' của dịch vụ bạn chọn trong kho không đáp ứng đc yêu cầu của quý khách.'
                    ], 400);
                }
            }


            //Thêm dịch vụ vào lịch hẹn
            foreach ($validateData['services'] as $service) {
                $ser = Service::find($service['service_id']);
                AppointmentService::create([
                    'id' => app(Snowflake::class)->next(),
                    'appointment_id' => $appointment->id,
                    'service_id' => $service['service_id'],
                    'quantity' => $service['quantity'],
                    'price' => $ser->price
                ]);
            }

            Notification::create([
                'id' => app(Snowflake::class)->next(),
                'type' => 'Khách hàng đặt lịch hẹn',
                'notifiable_type' => 'App\Models\Appointment',
                'data' => 'Khách hàng đã đặt lịch hẹn.',
                'read_at' => Carbon::now()
            ]);

            DB::commit();

            $response = [
                'status' => 'success',
                'message' => 'Thêm mới lịch hẹn thành công.',
                'data' => new AppointmentResource($appointment)
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            DB::rollBack();
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }
}
