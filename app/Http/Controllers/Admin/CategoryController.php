<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Admin\Categories\CategoryRequest;
use App\Http\Requests\Admin\Categories\CategoryUpdateRequest;
use App\Http\Resources\Admin\Categories\CategoryResource;
use App\Http\Resources\Admin\Categories\CategoryCollection;


class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::paginate(5);
            return new CategoryCollection($categories);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show( $id)
    {
        try {

            $category = Category::find($id);

            if (!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Danh mục không tồn tại!',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết danh mục: ' . $category->name,
                'data' => new CategoryResource($category)
            ];

            return response()->json($arr);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ], 500);
        }
    }

    public function store(CategoryRequest $request)
{
    try {

        $validatedData = $request->validated();


        $category = Category::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Thêm mới danh mục thành công',
            'data' => new CategoryResource($category)
        ], 201);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => 'error',
            'message' => 'Đã xảy ra lỗi trong quá trình thêm mới danh mục.',
        ], 500);
    }
}

    public function update(CategoryUpdateRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->update($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật danh mục thành công!',
                'data' => new CategoryResource($category),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);

            $category->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục đã được xóa thành công'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {

            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
