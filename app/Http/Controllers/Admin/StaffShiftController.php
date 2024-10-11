<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StaffShift;
use App\Http\Requests\Admin\StaffShifts\StaffShiftRequest;
use App\Http\Requests\Admin\StaffShifts\StaffShiftUpdateRequest;
use App\Http\Resources\Admin\StaffShifts\StaffShiftResource;
use App\Http\Resources\Admin\StaffShifts\StaffShiftCollection;

class StaffShiftController extends Controller
{
    public function index()
    {
        try {
            $staffShifts = StaffShift::paginate(5);
            return new StaffShiftCollection($staffShifts);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $staffShift = StaffShift::find($id);

            if (!$staffShift) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ca làm việc không tồn tại!',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết ca làm việc: ' . $staffShift->id,
                'data' => new StaffShiftResource($staffShift),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(StaffShiftRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $staffShift = StaffShift::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới ca làm việc thành công',
                'data' => new StaffShiftResource($staffShift),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới ca làm việc.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(StaffShiftUpdateRequest $request, $id)
    {
        try {
            $staffShift = StaffShift::findOrFail($id);
            $staffShift->update($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật ca làm việc thành công!',
                'data' => new StaffShiftResource($staffShift),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ca làm việc không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $staffShift = StaffShift::findOrFail($id);
            $staffShift->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Ca làm việc đã được xóa thành công',
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ca làm việc không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
