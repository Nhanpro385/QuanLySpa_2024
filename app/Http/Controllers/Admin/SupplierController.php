<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Http\Requests\Admin\Suppliers\SupplierRequest;
use App\Http\Requests\Admin\Suppliers\SupplierUpdateRequest;
use App\Http\Resources\Admin\Suppliers\SupplierResource;
use App\Http\Resources\Admin\Suppliers\SupplierCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Filters\Admin\SupplierFilter;

class SupplierController extends Controller
{
    public function index(Request $request, SupplierFilter $filter)
{
    try {
        $query = Supplier::with(['createdBy', 'updatedBy']);

        $suppliers = $filter->apply($request, $query)->paginate($request->input('per_page', 5));
        return new SupplierCollection($suppliers);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => 'error',
            'message' => 'Đã xảy ra lỗi trong quá trình lấy danh sách nhà cung cấp.',
            'error' => $th->getMessage(),
        ], 500);
    }
}


    public function show($id)
    {
        try {
            $supplier = Supplier::with(['createdBy', 'updatedBy'])->find($id);

            if (!$supplier) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhà cung cấp không tồn tại!',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết nhà cung cấp.',
                'data' => new SupplierResource($supplier),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(SupplierRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = null;

            $supplier = Supplier::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới nhà cung cấp thành công.',
                'data' => new SupplierResource($supplier),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới nhà cung cấp.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(SupplierUpdateRequest $request, $id)
    {
        try {
            $supplier = Supplier::with(['createdBy', 'updatedBy'])->findOrFail($id);
            $validatedData = $request->validated();
            $validatedData['updated_by'] = Auth::id();

            $supplier->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật nhà cung cấp thành công!',
                'data' => new SupplierResource($supplier),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nhà cung cấp không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật nhà cung cấp.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $supplier = Supplier::withTrashed()->findOrFail($id);


            if ($supplier->forceDelete()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Nhà cung cấp đã được xóa vĩnh viễn thành công.',
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không thể xóa nhà cung cấp!',
                ], 500);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nhà cung cấp không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xóa nhà cung cấp.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

}
