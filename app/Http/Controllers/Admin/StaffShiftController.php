<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StaffShift;
use App\Http\Requests\Admin\StaffShifts\StaffShiftRequest;
use App\Http\Requests\Admin\StaffShifts\StaffShiftUpdateRequest;
use Illuminate\Http\Request;

use App\Http\Resources\Admin\StaffShift\StaffShiftResource;
use App\Http\Resources\Admin\StaffShift\StaffShiftCollection;


class StaffShiftController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $shifts = StaffShift::with(['staff', 'shift'])->paginate($perPage);

        if ($shifts->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không có dữ liệu trong danh sách phân công ca làm.',
            ], 404);
        }

        return (new StaffShiftCollection($shifts))->additional(['status' => true]);
    }

    public function store(StaffShiftRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id(); // Lấy ID người dùng đang đăng nhập
        $shift = StaffShift::create($data);

        return (new StaffShiftResource($shift))->additional([
            'status' => true,
            'message' => 'Tạo mới thành công.',
        ]);
    }

    public function show($id)
    {
        $shift = StaffShift::with(['staff', 'shift'])->find($id);

        if (!$shift) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy phân công ca làm với ID này.',
            ], 404);
        }

        return (new StaffShiftResource($shift))->additional(['status' => true]);
    }

    public function update(StaffShiftRequest $request, $id)
    {
        $shift = StaffShift::find($id);

        if (!$shift) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy phân công ca làm để cập nhật.',
            ], 404);
        }

        $data = $request->validated();
        $data['updated_by'] = auth()->id();
        $shift->update($data);

        return (new StaffShiftResource($shift))->additional([
            'status' => true,
            'message' => 'Cập nhật thành công.',
        ]);
    }

    public function destroy($id)
    {
        $shift = StaffShift::find($id);

        if (!$shift) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy phân công ca làm để xóa.',
            ], 404);
        }

        $shift->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa thành công.',
        ]);
    }
}