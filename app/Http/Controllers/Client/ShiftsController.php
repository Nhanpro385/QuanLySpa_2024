<?php

namespace App\Http\Controllers\Client;

use App\Models\Shift;
// use App\Http\Requests\Admin\Shifts\StoreShiftRequest;
// use App\Http\Requests\Admin\Shifts\UpdateShiftRequest;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Resources\Client\Shift\ShiftResource;
use App\Http\Resources\Client\Shift\ShiftCollection;
use App\Filters\Admin\ShiftFilter;
use Illuminate\Http\Request;

class ShiftsController extends Controller
{
    // Get a paginated list of shifts
    public function index(Request $request)
    {
        try {
            $filter = new ShiftFilter();
            $queryResult = $filter->transform($request);
            $filters = $queryResult['filter'];
            $relations = $queryResult['relations'];
            $sorts = $queryResult['sorts'];
    
            $perPage = $request->query('per_page', 5);
    
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
    
            // Lọc bỏ các ngày trong quá khứ
            $query->where('shift_date', '>=', now()->toDateString());
    
            // Áp dụng sắp xếp theo query đã đề cập
            $query->orderByRaw("
                ABS(DATEDIFF(shift_date, CURDATE())) ASC, -- Khoảng cách gần nhất
                start_time ASC -- Thời gian bắt đầu
            ");
    
            // Áp dụng sắp xếp tùy chọn (nếu có)
            if (!empty($sorts)) {
                [$sortBy, $sortOrder] = $sorts;
                $query->orderBy($sortBy, $sortOrder);
            }
    
            // Phân trang kết quả
            $shifts = $query->paginate($perPage);
    
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
    // public function store(StoreShiftRequest $request)
    // {



    //     $data = $request->validated();

    //     $data['created_by'] = auth()->id();

    //     // In dữ liệu để kiểm tra


    //     $shift = Shift::create($data);

    //     return response()->json([
    //         'message' => 'Tạo ca làm việc thành công',
    //         'data' => new ShiftResource($shift),
    //     ], 201);
    // }

    // public function update(UpdateShiftRequest $request, $id)
    // {
    //     try {
    //         // Tìm bản ghi
    //         $shift = Shift::findOrFail($id);
    //     } catch (ModelNotFoundException $e) {
    //         // Xử lý khi không tìm thấy
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Không tìm thấy ca làm việc với ID này.',
    //         ], 404);
    //     }
    //     $data = $request->validated();
    //     $data['updated_by'] = auth()->id();

    //     $shift->update($data);

    //     return response()->json([
    //         'message' => 'Cập nhật ca làm việc thành công',
    //         'data' => $shift,
    //     ]);

    // }

    // Show a specific shift
    public function show($id)
    {
        try {
            $shift = Shift::findOrFail($id);
            return new ShiftResource($shift);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy ca làm việc với ID này.',
            ], 404);
        }
    }
    // Update an existing shift
    // public function update(UpdateShiftRequest $request, $id)
    // {
    //     $shift = Shift::findOrFail($id);
    //     $shift->update($request->validated());
    //     return new ShiftResource($shift);
    // }

    // Delete a shift
    // public function destroy($id)
    // {
    //     try {
    //         // Tìm bản ghi cần xóa
    //         $shift = Shift::findOrFail($id);
    //     } catch (ModelNotFoundException $e) {
    //         // Trả về lỗi nếu không tìm thấy
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Không tìm thấy ca làm việc với ID này.',
    //         ], 404);
    //     }
    
    //     // Nếu tìm thấy, thực hiện xóa
    //     $shift->delete();
    
    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Xóa ca làm việc thành công.',
    //     ]);
    // }
}
