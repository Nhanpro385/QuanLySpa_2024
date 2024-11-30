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
        $createdStaffShifts = [];

        foreach ($data['staff_ids'] as $staffId) {
            $createdStaffShifts[] = StaffShift::create([
                'shift_id' => $data['shift_id'],
                'staff_id' => $staffId,
                'created_by' => auth()->id(),
            ]);
        }
    
        // Sử dụng Resource Collection để trả về dữ liệu
        return response()->json([
            'status' => true,
            'message' => 'Thêm nhân viên vào ca làm việc thành công.',
            'data' => $createdStaffShifts, // Trả về danh sách bản ghi vừa tạo
        ], 201);
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

    public function update(Request $request, $shiftId)
    {
        $validated = $request->validate([
            'staff_ids_to_add' => 'array',
            'staff_ids_to_add.*' => 'exists:users,id', // Danh sách ID nhân viên cần thêm hoặc cập nhật
            'staff_ids_to_remove' => 'array',
            'staff_ids_to_remove.*' => 'exists:users,id', // Danh sách ID nhân viên cần xóa
        ], [
            'staff_ids_to_add.*.exists' => 'Nhân viên trong danh sách thêm không tồn tại.',
            'staff_ids_to_remove.*.exists' => 'Nhân viên trong danh sách xóa không tồn tại.',
        ]);
    
        $staffIdsToAdd = $validated['staff_ids_to_add'] ?? [];
        $staffIdsToRemove = $validated['staff_ids_to_remove'] ?? [];
    
        // **Thêm hoặc cập nhật nhân viên trong shift**
        foreach ($staffIdsToAdd as $staffId) {
            StaffShift::updateOrCreate(
                [
                    'shift_id' => $shiftId,
                    'staff_id' => $staffId,
                ],
                [
                    'created_by' => auth()->id(),
                ]
            );
        }
    
        // **Xóa nhân viên khỏi shift**
        if (!empty($staffIdsToRemove)) {
            StaffShift::where('shift_id', $shiftId)
                ->whereIn('staff_id', $staffIdsToRemove)
                ->delete();
        }
    
        // **Trả về danh sách nhân viên mới trong shift**
        $updatedStaffShifts = StaffShift::where('shift_id', $shiftId)
            ->with('staff:id,full_name') // Thêm thông tin nhân viên (tùy vào quan hệ trong model)
            ->get();
    
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công.',
            'data' => $updatedStaffShifts,
        ], 200);
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