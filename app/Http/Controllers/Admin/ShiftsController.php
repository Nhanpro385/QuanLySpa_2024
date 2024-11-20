<?php

namespace App\Http\Controllers\Admin;

use App\Models\Shift;
use App\Http\Requests\Admin\Shifts\StoreShiftRequest;
use App\Http\Requests\Admin\Shifts\UpdateShiftRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Shift\ShiftResource;
use App\Http\Resources\Admin\Shift\ShiftCollection;
use App\Filters\Admin\ShiftFilter;
use Illuminate\Http\Request;

class ShiftsController extends Controller
{
    // Get a paginated list of shifts
    public function index(Request $request)
    {
        try {
            // Áp dụng bộ lọc từ ShiftFilter
            $filter = new ShiftFilter();
            $queryResult = $filter->transform($request); // Lấy filters, relations, sorts từ request
            $filters = $queryResult['filter'];
            $relations = $queryResult['relations'];
            $sorts = $queryResult['sorts'];
    
            $perPage = $request->query('per_page', 5); // Chỉ số bản ghi trên mỗi trang
            $today = now()->toDateString(); // Lấy ngày hôm nay
    
            // Tạo query ban đầu
            $query = Shift::query();
    
            // Áp dụng các bộ lọc thông thường
            if (!empty($filters)) {
                foreach ($filters as $filter) {
                    [$column, $operator, $value] = $filter;
                    $query->where($column, $operator, $value);
                }
            }
    
            // Áp dụng các bộ lọc liên quan
            if (!empty($relations)) {
                foreach ($relations as $relationFilter) {
                    [$relation, $column, $operator, $value] = $relationFilter;
                    $query->whereHas($relation, function ($q) use ($column, $operator, $value) {
                        $q->where($column, $operator, $value);
                    });
                }
            }
    
            // Áp dụng logic sắp xếp: ngày hôm nay lên trước
            $query->orderByRaw("CASE WHEN shift_date = ? THEN 0 ELSE 1 END", [$today]);
    
            // Áp dụng sắp xếp tùy chọn (nếu có)
            if (!empty($sorts)) {
                [$sortBy, $sortOrder] = $sorts;
                $query->orderBy($sortBy, $sortOrder);
            }
    
            // Phân trang kết quả
            $shifts = $query->paginate($perPage);
    
            // Trả về dữ liệu
            return (new ShiftCollection($shifts))->additional(['status' => true]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }



    // Store a new shift
    // Store a new shift
    public function store(StoreShiftRequest $request)
    {



        $data = $request->validated();

        $data['created_by'] = auth()->id();

        // In dữ liệu để kiểm tra


        $shift = Shift::create($data);

        return response()->json([
            'message' => 'Tạo ca làm việc thành công',
            'data' => new ShiftResource($shift),
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
