<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\ServiceCategoriesFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceCategories\ServiceCategoryRequest;
use App\Http\Requests\Admin\ServiceCategories\ServiceCategoryUpdateRequest;
use App\Http\Resources\Admin\ServiceCategories\ServiceCategoryConllection;
use App\Http\Resources\Admin\ServiceCategories\ServiceCategoryResource;
use App\Models\ServiceCategory;
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
            $query = ServiceCategory::select($selectedColumns)->where($queryItems);

            if ($request['search']) {
                $value = $request['search'];
                $query
                    ->orWhere('name', 'like', '%' . $value . '%')
                    ->orWhere('id', 'like', '%' . $value . '%')
                ;
            }
            if ($sorts) {
                $query = $query->orderBy($sorts[0], $sorts[1]);
            }
            $createdBy = $request->query('created_by');
            if ($createdBy) {
                $query = $query->with('createdBy');
            }
            $updatedBy = $request->query('updated_by');
            if ($updatedBy) {
                $query = $query->with('updatedBy');
            }
            $services = $request->query('services');
            if ($services) {
                $query = $query->with('services');
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
     * Store a newly created resource in storage.
     */
    public function store(ServiceCategoryRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $serviceCategory = ServiceCategory::create([
                'id' => $validatedData['id'],
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'parent_id' => $validatedData['parent_id'],
                'created_by' => auth('api')->user()->id
            ]);


            $response = [
                'status' => 'success',
                'message' => 'Thêm mới loại dịch vụ thành công',
                'data' => new ServiceCategoryResource($serviceCategory)
            ];

            return response()->json($response);
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới loại dịch vụ.',
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
            $createdBy = $request->query('created_by');
            if ($createdBy) {
                $query = $query->with('createdBy');
            }
            $updatedBy = $request->query('updated_by');
            if ($updatedBy) {
                $query = $query->with('updatedBy');
            }
            $services = $request->query('services');
            if ($services) {
                $query = $query->with('services');
            }
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



    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceCategoryUpdateRequest $request, string $id)
    {
        // try {

        $serviceCategory = ServiceCategory::find($id);

        if (!$serviceCategory) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy dữ liệu',
            ], 404);
        }

        $validator = $request->validated();
        $serviceCategory->update([
            'name' => $validator['name'],
            'description' => $validator['description'],
            'status' => $validator['status'],
            'parent_id' => $validator['parent_id'],
            'updated_by' => auth('api')->user()->id
        ]);

        $arr = [
            'status' => 'success',
            'message' => 'Chỉnh sửa thành công loại dịch vụ: ' . $serviceCategory->name,
            'data' => new ServiceCategoryResource($serviceCategory)
        ];
        return response()->json($arr);
        // } catch (\Throwable $th) {
        //     $arr = [
        //         'status' => 'error',
        //         'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
        //     ];
        //     return response()->json($arr, 500);
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $serviceCategory = ServiceCategory::find($id);

            if (!$serviceCategory) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $serviceCategory->delete();
            $arr = [
                'status' => 'success',
                'message' => 'Xóa thành công loại dịch vụ: ' . $serviceCategory->name,
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xóa.',
            ];
            return response()->json($arr, 500);
        }
    }
}
