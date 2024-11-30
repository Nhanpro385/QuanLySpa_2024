<?php

namespace App\Http\Controllers\Client;

use App\Filters\Client\ServiceCategoriesFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Client\ServiceCategories\ServiceCategoryConllection;
use App\Http\Resources\Client\ServiceCategories\ServiceCategoryResource;
use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new ServiceCategoriesFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }
            $selectedColumns = ['id', 'name', 'description', 'status', 'parent_id'];
            $query = ServiceCategory::select($selectedColumns)->where($queryItems)->where('status', 1);

            if ($request['search']) {
                $value = $request['search'];
                $query->whereHas('services', function (Builder $query) use ($value) {
                    $query->where('name', 'like', '%' . $value . '%');
                })
                    ->orwhere('name', 'like', '%' . $value . '%')
                    ->orWhere('id', 'like', '%' . $value . '%')
                ;
            }
            if ($sorts) {
                $query = $query->orderBy($sorts[0], $sorts[1]);
            }

            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }
            return new ServiceCategoryConllection($query->paginate($perPage)->appends($request->query()));
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        try {
            $query = ServiceCategory::query();
            $serviceCategory = $query->find($id);
            if (!$serviceCategory) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết loại dịch vụ: ' . $serviceCategory->name,
                'data' => new ServiceCategoryResource($serviceCategory)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }


}
