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
use App\Models\Customer;
use App\Models\Service;
use App\Models\Shift;
use App\Models\StaffShift;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Kra8\Snowflake\Snowflake;

use function Laravel\Prompts\select;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AppointmentResquest $request)
    {
        try {
            $validateData = $request->validated();

            // 1. Kiểm tra ca làm
            $shift = Shift::where('id', '=', $validateData['shift_id'])->where('shift_date', '=', $validateData['appointment_date'])->first();

            if (!$shift) {
                return response()->json(['error' => 'Shift not found'], 404);
            }

            // 2. Kiểm tra nhân viên trong ca làm
            $staffIds = array_column($validateData['users'], 'staff_id');

            $staffInShift = StaffShift::where('shift_id', $validateData['shift_id'])
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

            $start_time = Shift::where('id', '=', $validateData['shift_id'])->where('end_time', '>=', $validateData['start_time'])
                ->where('start_time', '<=', $validateData['start_time'])
                ->exists();

            if (!$start_time) {
                return response()->json([
                    "status" => "error",
                    "message" => "Dữ liệu đầu vào không hợp lệ.",
                    'error' => 'Thời gian bất đầu của lịch hẹn không nằm trong thời gian ca làm hiện tại.'
                ], 400);
            }




            // 3. Kiểm tra trùng lịch
            foreach ($staffIds as $staffId) {
                $conflictingAppointment = Appointment::where('shift_id', $validateData['shift_id'])
                    ->where('appointment_date', $validateData['appointment_date'])
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
                    'appointment_id' => $validateData['id'],
                    'staff_id' => $staffId,
                    'created_by' => auth('api')->user()->id,
                    'updated_by' => auth('api')->user()->id,
                ]);
            }

            //Thêm dịch vụ vào lịch hẹn
            foreach ($validateData['services'] as $service) {
                $ser = Service::find($service['service_id']);

                AppointmentService::create([
                    'id' => app(Snowflake::class)->next(),
                    'service_id' => $service['service_id'],
                    'quantity' => $service['quantity'],
                    'appointment_id' => $validateData['id'],
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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

        AppointmentStaff::where('appointment_id', $id)->delete();
        AppointmentService::where('appointment_id', $id)->delete();
        $appointment->delete();
        $appointment->update([
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
