<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\AppointmentFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Appointments\AppointmentResquest;
use App\Http\Requests\Admin\Appointments\AppointmentUpdateResquest;
use App\Http\Resources\Admin\Appointments\AppointmentCollection;
use App\Http\Resources\Admin\Appointments\AppointmentResource;
use App\Models\Appointment;
use App\Models\AppointmentService;
use App\Models\AppointmentStaff;
use App\Models\Comment;
use App\Models\Inventory;
use App\Models\OutboundInvoice;
use App\Models\OutboundInvoiceDetail;
use App\Models\Payment;
use App\Models\PaymentProducts;
use App\Models\Product;
use App\Models\Service;
use App\Models\Shift;
use App\Models\StaffShift;
use App\Models\TreatmentHistory;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Kra8\Snowflake\Snowflake;



class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new AppointmentFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }

            $selectedColumns = ['id', 'customer_id', 'appointment_date', 'start_time', 'shift_id', 'status'];

            $query = Appointment::select($selectedColumns)->where($queryItems);
            if ($request['search']) {
                $value = $request['search'];
                $query->whereHas('customer', function (Builder $query) use ($value) {
                    $query->where('full_name', 'like', '%' . $value . '%')
                        ->orWhere('phone', 'like', '%' . $value . '%')
                        ->orWhere('email', 'like', '%' . $value . '%');
                })
                    ->orWhere('appointment_date', 'like', '%' . $value . '%')
                    ->orWhere('id', 'like', '%' . $value . '%')
                ;
            }
            foreach ($queryResult['relations'] as $relationFilter) {
                [$relation, $column, $operator, $value] = $relationFilter;
                $query->whereHas($relation, function (Builder $query) use ($column, $operator, $value) {
                    $query->where($column, $operator, "%" . $value . "%");
                });
            }


            $query = $query->orderBy($sorts[0], $sorts[1]);
            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }
            return new AppointmentCollection($query->paginate($perPage)->appends($request->query()));
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AppointmentResquest $request)
    {
        try {
            $validateData = $request->validated();

            // 1. Kiểm tra ca làm
            $shift = Shift::where('id', '=', $validateData['shift_id'])->where('shift_date', '=', $validateData['appointment_date'])
                ->first();

            if (!$shift) {
                return response()->json([
                    "status" => "error",
                    "message" => "Dữ liệu đầu vào không hợp lệ.",
                    'error' => 'Ca làm hiện tại và lịch hẹn thời gian không hợp lệ.'
                ], 404);
            }

            $currentDate = Carbon::now();
            $today = $currentDate->format('Y-m-d');
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
                        'error' => 'Thời gian lịch hẹn không hợp lệ.'
                    ], 404);
                }
            }

            // 2. Kiểm tra nhân viên trong ca làm
            $staffIds = array_column($validateData['users'], 'staff_id');

            $staffInShift = StaffShift::where('shift_id', $validateData['shift_id'])
                ->whereIn('staff_id', $staffIds)
                ->pluck('staff_id')
                ->toArray();


            if (count($staffInShift) !== count($staffIds)) {
                return response()->json([
                    "status" => false,
                    "message" => "Dữ liệu đầu vào không hợp lệ.",
                    'error' => 'Có một nhân viên không trong ca làm hiện tại.'
                ], 400);
            }

            $start_time = Shift::where('id', '=', $validateData['shift_id'])->where('end_time', '>=', $validateData['start_time'])
                ->where('start_time', '<=', $validateData['start_time'])
                ->exists();

            if (!$start_time) {
                return response()->json([
                    "status" => false,
                    "message" => "Dữ liệu đầu vào không hợp lệ.",
                    'error' => 'Thời gian bất đầu của lịch hẹn không nằm trong thời gian ca làm hiện tại.'
                ], 400);
            }

            // 3. Kiểm tra trùng lịch
            foreach ($staffIds as $staffId) {
                $conflictingAppointment = Appointment::where('shift_id', $validateData['shift_id'])
                    ->where('appointment_date', $validateData['appointment_date'])
                    ->whereIn('status', [1, 2])
                    ->whereHas('users', function ($query) use ($staffId) {
                        $query->where('staff_id', $staffId);
                    })
                    ->where(function ($query) use ($validateData, $shift) {
                        // Kiểm tra lịch hẹn mới nằm trong khoảng thời gian của ca làm
                        $query->where('start_time', '>=', $shift->start_time)
                            ->where('start_time', '<=', $shift->end_time)
                            ->where(function ($subQuery) use ($validateData, $shift) {
                            // Kiểm tra xung đột với các lịch hẹn khác
                            $subQuery->whereBetween('start_time', [$validateData['start_time'], $shift->end_time])
                                ->orWhereBetween(DB::raw("'" . $validateData['start_time'] . "'"), [$shift->start_time, $shift->end_time]);
                        });
                    })
                    ->exists();

                if ($conflictingAppointment) {
                    return response()->json([
                        "status" => "error",
                        "message" => "Dữ liệu đầu vào không hợp lệ.",
                        'error' => 'Có một nhân viên đã bị trùng với một lịch hẹn khác.'
                    ], 400);
                }

            }


            // 4. Thêm mới lịch hẹn và liên kết nhân viên
            DB::beginTransaction();

            // Tạo lịch hẹn
            $appointment = Appointment::create([
                'id' => $validateData['id'],
                'shift_id' => $validateData['shift_id'],
                'customer_id' => $validateData['customer_id'],
                'start_time' => $validateData['start_time'],
                'note' => $validateData['note'],
                'appointment_date' => $validateData['appointment_date'],
                'status' => $validateData['status'],
                'created_by' => auth('api')->user()->id
            ]);

            // Thêm nhân viên vào bảng appointment_staffs
            foreach ($staffIds as $staffId) {
                AppointmentStaff::create([
                    'id' => app(Snowflake::class)->next(),
                    'appointment_id' => $appointment->id,
                    'staff_id' => $staffId,
                    'created_by' => auth('api')->user()->id,
                    'updated_by' => auth('api')->user()->id,
                ]);
            }

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
                        "status" => false,
                        "message" => "Hết hàng trong kho.",
                        'error' => 'Số lượng sản phẩm mã: ' . $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                    ], 400);
                }
            }

            //Kiểm tra dịch vụ với nhân viên
            foreach ($validateData['services'] as $service_quantity) {
                if ($service_quantity['quantity'] > count($validateData['users'])) {
                    return response()->json([
                        "status" => false,
                        "message" => "Số lượng nhân viên không thể đáp ứng.",
                        'error' => 'Vui lòng thêm số lượng nhân viên cho lịch hẹn trên.'
                    ], 400);
                }
            }


            if ($appointment->status == 3) {
                //Them hoa don xuat hang khoi kho
                $outbountInvoice = OutboundInvoice::create([
                    'id' => app(Snowflake::class)->next(),
                    'staff_id' => auth('api')->user()->id,
                    'note' => 'Sử dụng trong lịch hẹn: ' . $appointment->id,
                    'outbound_invoice_type' => 'service',
                    'total_amount' => 0
                ]);

                //them chi tiet hoa don xuat
                $total_amount = 0;
                foreach ($products_out_of_stock as $product) {
                    $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                    if (!$inventory || $inventory->quantity <= 0) {
                        DB::rollBack();
                        return response()->json([
                            "status" => "error",
                            "message" => "Hết hàng trong kho.",
                            'error' => 'Số lượng sản phẩm mã: ' . (string) $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                        ], 400);
                    }
                    $pr = Product::find($product['product_id']);

                    $outbountInvoiceDetail = OutboundInvoiceDetail::create([
                        'id' => app(Snowflake::class)->next(),
                        'product_id' => $product['product_id'],
                        'outbound_invoice_id' => $outbountInvoice->id,
                        'quantity_export' => $product['quantity'],
                        'quantity_olded' => $inventory->quantity,
                        'unit_price' => $pr->price
                    ]);

                    $total_amount += $outbountInvoiceDetail->quantity_export * $outbountInvoiceDetail->unit_price;


                    //Cap nhat moi cho ton kho
                    $updateInventory = Inventory::create([
                        'id' => app(Snowflake::class)->next(),
                        'product_id' => $product['product_id'],
                        'quantity' => $inventory->quantity - $product['quantity'],
                        'created_by' => auth('api')->user()->id,
                        'updated_by' => auth('api')->user()->id,
                    ]);
                }
                //cap nhat hoa don
                $outbountInvoice->update([
                    'total_amount' => $total_amount,
                ]);

                //them moi thanh toan
                if ($appointment->status == 3) {
                    $createPayment = Payment::create([
                        'id' => app(Snowflake::class)->next(),
                        'appointment_id' => $appointment->id,
                        'service_total' => $service_total,
                        'product_total' => 0,
                        'subtotal' => $service_total,
                        'total_amount' => $service_total,
                        'created_by' => auth('api')->user()->id,
                    ]);

                    $treatment_history = TreatmentHistory::create([
                        'id' => app(Snowflake::class)->next(),
                        'appointment_id' => $appointment->id,
                        'customer_id' => $appointment->customer_id,
                        'staff_id' => auth('api')->user()->id,
                        'image_before' => 'Ảnh trước',
                        'image_after' => 'Ảnh sau',
                        'feedback' => 'Nhận xét của khách hàng: ',
                        'note' => 'Ghi chú cho lịch hẹn: ' . $appointment->id,
                        'status' => true,
                        'created_by' => auth('api')->user()->id,
                        'updated_by' => auth('api')->user()->id,
                    ]);

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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $query = Appointment::query();

            $appoiments = $query->find($id);
            if (!$appoiments) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết lịch hẹn. ',
                'data' => new AppointmentResource($appoiments)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(AppointmentUpdateResquest $request, string $id)
    {

        try {
            $validateData = $request->validated();

            // Kiểm tra xem lịch hẹn có tồn tại không
            $appointment = Appointment::find($id);
            if (!$appointment) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy lịch hẹn.'
                ], 404);
            }

            if ($appointment->status == 3 || $appointment->status > $validateData['status']) {
                return response()->json([
                    'status' => 'true',
                    'message' => 'Không thể chỉnh sửa do lịch hẹn đang thực hiện hoặc đã hoàn thành.'
                ], status: 200);
            }


            // 1. Kiểm tra ca làm
            $shift = Shift::where('id', '=', $appointment->shift_id)
                ->where('shift_date', '=', $appointment->appointment_date)
                ->first();

            if (!$shift) {
                return response()->json(['error' => 'Shift not found'], 404);
            }

            // 2. Kiểm tra nhân viên trong ca làm
            $staffIds = array_column($validateData['users'], 'staff_id');
            $staffInShift = StaffShift::where('shift_id', $appointment->shift_id)
                ->whereIn('staff_id', $staffIds)
                ->pluck('staff_id')
                ->toArray();

            if (count($staffInShift) !== count($staffIds)) {
                return response()->json([
                    "status" => "error",
                    "message" => "Dữ liệu đầu vào không hợp lệ.",
                    'error' => 'Có một nhân viên không trong ca làm hiện tại.'
                ], 400);
            }

            // 3. Kiểm tra thời gian bắt đầu trong ca làm
            $start_time = Shift::where('id', '=', $appointment->shift_id)
                ->where('end_time', '>=', $appointment->start_time)
                ->where('start_time', '<=', $appointment->start_time)
                ->exists();

            if (!$start_time) {
                return response()->json([
                    "status" => "error",
                    "message" => "Dữ liệu đầu vào không hợp lệ.",
                    'error' => 'Thời gian bắt đầu của lịch hẹn không nằm trong thời gian ca làm hiện tại.'
                ], 400);
            }

            // 4. Kiểm tra trùng lịch
            foreach ($staffIds as $staffId) {
                $conflictingAppointment = Appointment::where('shift_id', $appointment->shift_id)
                    ->where('appointment_date', $appointment['appointment_date'])
                    ->whereIn('status', [1, 2])
                    ->where('id', '!=', $id) // Loại trừ lịch hẹn hiện tại
                    ->whereHas('users', function ($query) use ($staffId) {
                        $query->where('staff_id', $staffId);
                    })
                    ->where(function ($query) use ($appointment, $shift) {
                        $query->where('start_time', '>=', $shift->start_time)
                            ->where('start_time', '<=', $shift->end_time)
                            ->where(function ($subQuery) use ($appointment, $shift) {
                                $subQuery->whereBetween('start_time', [$appointment->start_time, $shift->end_time])
                                    ->orWhereBetween(DB::raw("'" . $appointment->start_time . "'"), [$shift->start_time, $shift->end_time]);
                            });
                    })
                    ->exists();

                if ($conflictingAppointment) {
                    return response()->json([
                        "status" => "error",
                        "message" => "Dữ liệu đầu vào không hợp lệ.",
                        'error' => 'Có một nhân viên đã bị trùng với một lịch hẹn khác.'
                    ], 400);
                }
            }

            // 5. Bắt đầu cập nhật dữ liệu
            DB::beginTransaction();

            // Cập nhật lịch hẹn
            $appointment->update([
                'status' => $validateData['status'],
                'note' => $validateData['note'],
                'updated_by' => auth('api')->user()->id
            ]);

            // Cập nhật nhân viên trong bảng appointment_staffs
            AppointmentStaff::where('appointment_id', $id)->delete();
            foreach ($staffIds as $staffId) {
                AppointmentStaff::create([
                    'id' => app(Snowflake::class)->next(),
                    'appointment_id' => $id,
                    'staff_id' => $staffId,
                    'created_by' => auth('api')->user()->id,
                    'updated_by' => auth('api')->user()->id,
                ]);
            }


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
                        'product_id' => (string) $productId,
                        'quantity' => $quantity_needed
                    ]);
                }
            }

            foreach ($products_out_of_stock as $index => $product) {
                $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                if ($inventory == null || $inventory->quantity < $product['quantity'] || $inventory->quantity <= 0) {
                    DB::rollBack();
                    return response()->json([
                        "status" => "error",
                        "message" => "Hết hàng trong kho.",
                        'error' => 'Số lượng sản phẩm mã: ' . (string) $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                    ], 400);
                }
            }

            //Kiểm tra dịch vụ với nhân viên
            foreach ($validateData['services'] as $service_quantity) {
                if ($service_quantity['quantity'] > count($validateData['users'])) {
                    return response()->json([
                        "status" => false,
                        "message" => "Số lượng nhân viên không thể đáp ứng.",
                        'error' => 'Vui lòng thêm số lượng nhân viên cho lịch hẹn trên.'
                    ], 400);
                }
            }


            if ($appointment->status == 3) {
                $outbound_invoice_id = OutboundInvoice::where('note', 'LIKE', 'Sử dụng trong lịch hẹn: ' . $appointment->id)->exists();

                if (!$outbound_invoice_id) {
                    //Them hoa don xuat hang khoi kho
                    $outbountInvoice = OutboundInvoice::create([
                        'id' => app(Snowflake::class)->next(),
                        'staff_id' => auth('api')->user()->id,
                        'note' => 'Sử dụng trong lịch hẹn: ' . $appointment->id,
                        'outbound_invoice_type' => 'service',
                        'total_amount' => 0
                    ]);

                    //them chi tiet hoa don xuat
                    $total_amount = 0;
                    $tongxuat = 0;
                    foreach ($products_out_of_stock as $product) {
                        $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                        if (!$inventory || $inventory->quantity <= 0 || $inventory->quantity < $product['quantity']) {
                            DB::rollBack();
                            return response()->json([
                                "status" => "error",
                                "message" => "Hết hàng trong kho.",
                                'error' => 'Số lượng sản phẩm mã: ' . (string) $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                            ], 400);
                        }

                        $pr = Product::find($product['product_id']);

                        $outbountInvoiceDetail = OutboundInvoiceDetail::create([
                            'id' => app(Snowflake::class)->next(),
                            'product_id' => $product['product_id'],
                            'outbound_invoice_id' => $outbountInvoice->id,
                            'quantity_export' => $product['quantity'],
                            'quantity_olded' => $inventory->quantity,
                            'unit_price' => $pr->price
                        ]);

                        $tongxuat += $outbountInvoiceDetail->quantity_export * $outbountInvoiceDetail->unit_price;


                        //Cap nhat moi cho ton kho
                        $updateInventory = Inventory::create([
                            'id' => app(Snowflake::class)->next(),
                            'product_id' => $product['product_id'],
                            'quantity' => $inventory->quantity - $product['quantity'],
                            'created_by' => auth('api')->user()->id,
                            'updated_by' => auth('api')->user()->id,
                        ]);
                    }
                    //cap nhat hoa don
                    $outbountInvoice->update([
                        'total_amount' => $tongxuat,
                    ]);

                }

                if ($appointment->status == 3) {
                    //them moi thanh toan
                    $createPayment = Payment::create([
                        'id' => app(Snowflake::class)->next(),
                        'appointment_id' => $appointment->id,
                        'service_total' => $service_total,
                        'product_total' => 0,
                        'subtotal' => $service_total,
                        'total_amount' => $service_total,
                        'created_by' => auth('api')->user()->id,
                    ]);

                    $treatment_history = TreatmentHistory::create([
                        'id' => app(Snowflake::class)->next(),
                        'appointment_id' => $appointment->id,
                        'customer_id' => $appointment->customer_id,
                        'staff_id' => auth('api')->user()->id,
                        'image_before' => 'Ảnh trước',
                        'image_after' => 'Ảnh sau',
                        'feedback' => 'Nhận xét của khách hàng: ',
                        'note' => 'Ghi chú cho lịch hẹn: ' . $appointment->id,
                        'status' => true,
                        'created_by' => auth('api')->user()->id,
                        'updated_by' => auth('api')->user()->id,
                    ]);
                }
            }

            // Cập nhật dịch vụ trong bảng appointment_services
            AppointmentService::where('appointment_id', $id)->delete();
            foreach ($validateData['services'] as $service) {
                $ser = Service::find($service['service_id']);
                AppointmentService::create([
                    'id' => app(Snowflake::class)->next(),
                    'service_id' => $service['service_id'],
                    'quantity' => $service['quantity'],
                    'appointment_id' => $id,
                    'price' => $ser->price
                ]);
            }

            DB::commit();

            $response = [
                'status' => 'success',
                'message' => 'Cập nhật lịch hẹn thành công.',
                'data' => new AppointmentResource($appointment)
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy lịch hẹn.'
            ], 404);
        }
        if ($appointment->status == 3) {
            return response()->json([
                'status' => 'false',
                'message' => 'Không thể xóa do lịch hẹn đã hoàn thành.'
            ], 500);
        }

        $payments = Payment::where('appointment_id', $id)->pluck('id')->toArray();

        foreach ($payments as $payment) {
            PaymentProducts::where('payment_id', $payment)->delete();
        }
        Payment::where('appointment_id', $id)->delete();
        AppointmentStaff::where('appointment_id', $id)->delete();
        AppointmentService::where('appointment_id', $id)->delete();
        TreatmentHistory::where('appointment_id', $id)->delete();
        Comment::where('appointment_id', $id)->delete();
        $appointment->delete();
        $appointment->update([
            'shift_id' => null,
            'status' => 0,
            'note' => 'Lịch hẹn đã bị hủy: ' . $appointment->deleted_at,
            'updated_by' => auth('api')->user()->id
        ]);

        $response = [
            'status' => 'success',
            'message' => 'Hủy lịch hẹn thành công.',
            'data' => new AppointmentResource($appointment)
        ];
        return response()->json($response);

    }
}
