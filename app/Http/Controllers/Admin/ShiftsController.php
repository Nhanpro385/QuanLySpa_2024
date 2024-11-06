<?php

namespace App\Http\Controllers\Admin;

use App\Models\Shift;
use App\Http\Requests\Admin\Shifts\StoreShiftRequest;
use App\Http\Requests\Admin\Shifts\UpdateShiftRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Shift\ShiftResource;
use App\Http\Resources\Admin\Shift\ShiftCollection;
use Illuminate\Http\Request;

class ShiftsController extends Controller
{
    // Get a paginated list of shifts
    public function index(Request $request)
    {
        $query = Shift::query();
    
        // Search by shift_date
        if ($request->has('shift_date')) {
            $query->where('shift_date', $request->input('shift_date'));
        }
    
        // Filter by created_by (ID người tạo)
        if ($request->has('created_by')) {
            $query->where('created_by', $request->input('created_by'));
        }
    
        // Search by start_time
        if ($request->has('start_time')) {
            $query->where('start_time', $request->input('start_time'));
        }
    
        // Sort by created_at in descending order
        $query->orderBy('created_at', 'desc');
    
        $shifts = $query->paginate(10);

        if ($shifts->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy dữ liệu đáp ứng các tiêu chí tìm kiếm.'
            ], 404);
        }
        return new ShiftCollection($shifts);
    }
    
    

    // Store a new shift
    public function store(StoreShiftRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['start_time'] = '08:00:00';
        $data['end_time'] = '12:00:00';

        $shift = Shift::create($data);

        return response()->json([
            'message' => 'Tạo ca làm việc thành công',
            'data' => $shift,
        ], 201);
    }

    public function update(UpdateShiftRequest $request, $id)
    {
        $shift = Shift::findOrFail($id);
        $data = $request->validated();
        $data['updated_by'] = auth()->id();

        $shift->update($data);

        return response()->json([
            'message' => 'Cập nhật ca làm việc thành công',
            'data' => $shift,
        ]);
    }

    // Show a specific shift
    public function show($id)
    {
        $shift = Shift::findOrFail($id);
        return new ShiftResource($shift);
    }

    // Update an existing shift
    // public function update(UpdateShiftRequest $request, $id)
    // {
    //     $shift = Shift::findOrFail($id);
    //     $shift->update($request->validated());
    //     return new ShiftResource($shift);
    // }

    // Delete a shift
    public function destroy($id)
    {
        $shift = Shift::findOrFail($id);
        $shift->delete();
        return response()->json(['message' => 'Xóa Shift thành công']);
    }
}
