<?php

namespace App\Http\Controllers\Admin;

use App\Models\StaffShift;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\StaffShift\StaffShiftCollection;

use App\Http\Resources\Admin\StaffShift\StaffShiftResource;
use Illuminate\Support\Facades\Validator;

class StaffShiftController extends Controller
{
    // Lấy danh sách tất cả các StaffShift
    public function index()
    {
        $staffShifts = StaffShift::all();
        return StaffShiftResource::collection($staffShifts);
    }

    // Tạo mới một StaffShift
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'staff_id' => 'required|string|max:255',
            'shift_id' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Tạo StaffShift mới
        $staffShift = StaffShift::create($request->all());

        return new StaffShiftResource($staffShift);
    }

    // Lấy thông tin chi tiết của một StaffShift
    public function show($id)
    {
        $staffShift = StaffShift::find($id);

        if (!$staffShift) {
            return response()->json(['error' => 'StaffShift not found'], 404);
        }

        return new StaffShiftResource($staffShift);
    }

    // Cập nhật thông tin một StaffShift
    public function update(Request $request, $id)
    {
        $staffShift = StaffShift::find($id);

        if (!$staffShift) {
            return response()->json(['error' => 'StaffShift not found'], 404);
        }

        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'staff_id' => 'required|string|max:255',
            'shift_id' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Cập nhật thông tin
        $staffShift->update($request->all());

        return new StaffShiftResource($staffShift);
    }

    // Xóa một StaffShift
    public function destroy($id)
    {
        $staffShift = StaffShift::find($id);

        if (!$staffShift) {
            return response()->json(['error' => 'StaffShift not found'], 404);
        }

        $staffShift->delete();

        return response()->json(['message' => 'StaffShift deleted successfully']);
    }
}
