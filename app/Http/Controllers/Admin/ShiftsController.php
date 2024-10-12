<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;

use App\Http\Resources\Admin\Shift\ShiftResource;
use App\Http\Resources\Admin\Shift\ShiftCollection;
use Illuminate\Support\Facades\Validator;

class ShiftsController extends Controller
{
    /**
     * Hiển thị danh sách các ca làm việc.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->query('per_page', 10);
            $shifts = Shift::paginate($perPage);

            return new ShiftCollection($shifts);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Đã xảy ra lỗi khi lấy danh sách ca làm việc.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Tạo mới một ca làm việc.
     */
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'shift_date' => 'required|date',
            'max_customers' => 'required|integer|min:1',
            'note' => 'nullable|string|max:255',
            'status' => 'boolean',
            'created_by' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Dữ liệu không hợp lệ.',
                'messages' => $validator->errors()
            ], 422);
        }

        try {
            $shift = Shift::create($validator->validated());

            return response()->json([
                'message' => 'Tạo ca làm việc thành công.',
                'data' => new ShiftResource($shift),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Đã xảy ra lỗi khi tạo ca làm việc.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Hiển thị thông tin chi tiết một ca làm việc.
     */
    public function show($id)
    {
        try {
            $shift = Shift::find($id);

            if (!$shift) {
                return response()->json([
                    'error' => 'Không tìm thấy ca làm việc.'
                ], 404);
            }

            return new ShiftResource($shift);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Đã xảy ra lỗi khi lấy thông tin ca làm việc.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cập nhật thông tin một ca làm việc.
     */
    public function update(Request $request, $id)
    {
        try {
            $shift = Shift::find($id);

            if (!$shift) {
                return response()->json([
                    'error' => 'Không tìm thấy ca làm việc.'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'start_time' => 'sometimes|required|date_format:H:i:s',
                'end_time' => 'sometimes|required|date_format:H:i:s|after:start_time',
                'shift_date' => 'sometimes|required|date',
                'max_customers' => 'sometimes|required|integer|min:1',
                'note' => 'nullable|string|max:255',
                'status' => 'boolean',
                'created_by' => 'sometimes|required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => 'Dữ liệu không hợp lệ.',
                    'messages' => $validator->errors()
                ], 422);
            }

            $shift->update($validator->validated());

            return response()->json([
                'message' => 'Cập nhật ca làm việc thành công.',
                'data' => new ShiftResource($shift),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Đã xảy ra lỗi khi cập nhật ca làm việc.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa một ca làm việc.
     */
    public function destroy($id)
    {
        try {
            $shift = Shift::find($id);

            if (!$shift) {
                return response()->json([
                    'error' => 'Không tìm thấy ca làm việc.'
                ], 404);
            }

            $shift->delete();

            return response()->json([
                'message' => 'Xóa ca làm việc thành công.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Đã xảy ra lỗi khi xóa ca làm việc.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}