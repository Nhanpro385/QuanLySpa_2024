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
        $shifts = Shift::paginate(10);
        return new ShiftCollection($shifts);
    }

    // Store a new shift
    public function store(StoreShiftRequest $request)
    {
        $shift = Shift::create($request->validated());
        return response()->json([
            'message' => 'Tạo Shift thành công',
            'data' => new ShiftResource($shift)
        ], 201);
    }

    // Show a specific shift
    public function show($id)
    {
        $shift = Shift::findOrFail($id);
        return new ShiftResource($shift);
    }

    // Update an existing shift
    public function update(UpdateShiftRequest $request, $id)
    {
        $shift = Shift::findOrFail($id);
        $shift->update($request->validated());
        return new ShiftResource($shift);
    }

    // Delete a shift
    public function destroy($id)
    {
        $shift = Shift::findOrFail($id);
        $shift->delete();
        return response()->json(['message' => 'Xóa Shift thành công']);
    }
}
