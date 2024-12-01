<?php

namespace App\Http\Controllers\Admin;

use App\Models\TreatmentHistory;
use App\Http\Requests\Admin\TreatmentHistory\StoreTreatmentHistoryRequest as storerq;
use App\Http\Requests\Admin\TreatmentHistory\UpdateTreamentHistoryRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Admin\TreatmentHistory\TreatmentHistoryResource;
use App\Http\Resources\Admin\TreatmentHistory\DetailTreatmentHistoryResource;


use App\Http\Resources\Admin\TreatmentHistory\TreatmentHistoryCollection;
use App\Filters\Admin\TreatmentHistoryFilter;
use Illuminate\Http\Request;

class TreatmentHistoryController extends Controller
{
    // Get a paginated list of treatment histories
    public function index(Request $request)
    {
        try {
            $filter = new TreatmentHistoryFilter();
            $queryResult = $filter->transform($request);
            $filters = $queryResult['filter'];
            $relations = $queryResult['relations'];
            $sorts = $queryResult['sorts'];

            $query = TreatmentHistory::query();

            // Apply filters
            if (!empty($filters)) {
                foreach ($filters as $filter) {
                    [$column, $operator, $value] = $filter;
                    $query->where($column, $operator, $value);
                }
            }

            // Apply related filters
            if (!empty($relations)) {
                foreach ($relations as $relationFilter) {
                    [$relation, $column, $operator, $value] = $relationFilter;
                    $query->whereHas($relation, function ($q) use ($column, $operator, $value) {
                        $q->where($column, $operator, $value);
                    });
                }
            }

            // Apply sorting
            [$sortBy, $sortOrder] = $sorts;
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->query('per_page', 5);
            $treatmentHistories = $query->paginate($perPage);

            // Return data
            return (new TreatmentHistoryCollection($treatmentHistories))->additional(['status' => true]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    // Store a new treatment history
    public function store(storerq $request)
    {
       
        try {
            $data = $request->validated();
    
            // Upload image_before nếu có
            if ($request->hasFile('image_before')) {
                $imageBeforePath = $request->file('image_before')->store('uploads/treatment_histories', 'public');
                $data['image_before'] = $imageBeforePath;
            }
    
            // Upload image_after nếu có
            if ($request->hasFile('image_after')) {
                $imageAfterPath = $request->file('image_after')->store('uploads/treatment_histories', 'public');
                $data['image_after'] = $imageAfterPath;
            }
    
            $data['created_by'] = auth()->id();
    
            $treatmentHistory = TreatmentHistory::create($data);
    
            return response()->json([
                'message' => 'Tạo Treatment History thành công',
                'data' => new TreatmentHistoryResource($treatmentHistory),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi khi tạo Treatment History.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    
  // Update an existing treatment history
  public function update(UpdateTreamentHistoryRequest $request, string $id)
  {

      try {
     
          // Tìm Treatment History theo ID
          $treatmentHistory = TreatmentHistory::find($id);

          // Lấy dữ liệu đã được validate
          $data = $request->validated();
      
          // Upload và cập nhật image_before nếu có
          if ($request->hasFile('image_before')) {
              if ($treatmentHistory->image_before && Storage::disk('public')->exists($treatmentHistory->image_before)) {
                  Storage::disk('public')->delete($treatmentHistory->image_before);
              }
              $data['image_before'] = $request->file('image_before')->store('uploads/treatment_histories', 'public');
          }

          // Upload và cập nhật image_after nếu có
          if ($request->hasFile('image_after')) {
              if ($treatmentHistory->image_after && Storage::disk('public')->exists($treatmentHistory->image_after)) {
                  Storage::disk('public')->delete($treatmentHistory->image_after);
              }
              $data['image_after'] = $request->file('image_after')->store('uploads/treatment_histories', 'public');
          }

          // Gán ID người cập nhật
          $data['updated_by'] = auth()->id();

          // Cập nhật thông tin vào cơ sở dữ liệu
          $treatmentHistory->update($data);

          // Trả về response thành công
          return response()->json([
              'message' => 'Cập nhật Treatment History thành công',
              'data' => new TreatmentHistoryResource($treatmentHistory->refresh()),
          ]);
      } catch (\Throwable $th) {
          // Trả về response lỗi
          return response()->json([
              'status' => false,
              'message' => 'Đã xảy ra lỗi khi cập nhật Treatment History.',
              'error' => $th->getMessage(),
          ], 500);
      }
  }


    // Show a specific treatment history
    public function show($id)
    {
        $treatmentHistory = TreatmentHistory::findOrFail($id);
        return new DetailTreatmentHistoryResource($treatmentHistory);
    }

    // Delete a treatment history
    public function destroy($id)
    {
        try {
            $treatmentHistory = TreatmentHistory::findOrFail($id);
            $treatmentHistory->delete();
    
            return response()->json([
                'message' => 'Xóa lịch sử điều trị thành công',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi khi xóa Treatment History.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    public function getByCustomerId($customer_id, Request $request)
{
    try {
        // Áp dụng filter và phân trang (nếu có)
        $perPage = $request->query('per_page', 10);

        $treatmentHistories = TreatmentHistory::where('customer_id', $customer_id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return (new TreatmentHistoryCollection($treatmentHistories))
            ->additional(['status' => true]);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => 'Đã xảy ra lỗi khi lấy danh sách Treatment Histories.',
            'error' => $th->getMessage(),
        ], 500);
    }
}

    
}
