<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\ProductFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\ProductRequest;
use App\Http\Requests\Admin\Products\ProductUpdateRequest;
use App\Http\Resources\Admin\Products\ProductCollection;
use App\Http\Resources\Admin\Products\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new ProductFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }
            $query = Product::where($queryItems);

            if ($sorts) {
                $query = $query->orderBy($sorts[0], $sorts[1]);
            }
            $createdBy = $request->query('created_by');
            if ($createdBy) {
                $query = $query->with('createdBy');
            }
            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }

            return new ProductCollection($query->paginate($perPage));
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
    public function store(ProductRequest $request)
    {
        try {
            $validateData = $request->validated();
            $validateData['image_url'] = $request->image_url ?? 'null';
            $validateData['description'] = $request->description ?? 'Mô tả sản phẩm';

            if ($request->hasFile('image_url')) {
                $file = $request->file('image_url');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('public/uploads/products', $fileName);
                $validateData['image_url'] = $fileName;
            }

            $product = Product::create($validateData);

            $response = [
                'status' => 'success',
                'message' => 'Thêm mới sản phẩm thành công.',
                'data' => new ProductResource($product)
            ];

            return response()->json($response);
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
            $query = Product::query();

            $query = $query->find($id);

            if (!$query) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $createdBy = $request->query('created_by');
            if ($createdBy) {
                $query = $query->with('createdBy')->find($id);
            }
            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết sản phẩm: ' . $query->name,
                'data' => new ProductResource($query)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
            ];
            return response()->json($arr, 500);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, ProductUpdateRequest $request)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $validateData = $request->validated();
            if ($product->image_url) {
                Storage::delete('public/uploads/products/' . $product->image_url);
            }
            $validateData['image_url'] = $request->image_url ?? $product->image_url;
            $validateData['description'] = $request->description ?? $product->description;

            if ($request->hasFile('image_url')) {
                $file = $request->file('image_url');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('public/uploads/products', $fileName);
                $validateData['image_url'] = $fileName;
            }
            $product->update($validateData);
            $arr = [
                'status' => 'success',
                'message' => 'Chỉnh sửa thành công sản phẩm: ' . $product->name,
                'data' => new ProductResource($product)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
            ];
            return response()->json($arr, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            if ($product->image_url) {
                Storage::delete('public/uploads/products/' . $product->image_url);
            }
            $product->delete();
            $arr = [
                'status' => 'success',
                'message' => 'Xóa thành công sản phẩm: ' . $product->name,
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
