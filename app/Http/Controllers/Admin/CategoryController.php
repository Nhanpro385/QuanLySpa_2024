<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Admin\Categories\CategoryRequest;
use App\Http\Requests\Admin\Categories\CategoryUpdateRequest;
use App\Http\Resources\Admin\Categories\CategoryResource;
use App\Http\Resources\Admin\Categories\CategoryCollection;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        try {

            $categories = Category::with(['createdByUser', 'updatedByUser', 'parentCategory'])->paginate(5);

            $user = Auth::user();
            $userData = [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'role' => $user->role,
            ];

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách danh mục',
                'user' => $userData,
                'data' => new CategoryCollection($categories),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh sách danh mục.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {

            $category = Category::with(['createdByUser', 'updatedByUser', 'parentCategory'])->find($id);

            if (!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Danh mục không tồn tại!',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết danh mục: ' . $category->name,
                'data' => new CategoryResource($category),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(CategoryRequest $request)
    {
        try {
            $validatedData = $request->validated();


            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = null;

            $category = Category::create($validatedData);


            $category->load(['createdByUser', 'updatedByUser', 'parentCategory']);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới danh mục thành công',
                'data' => new CategoryResource($category)
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới danh mục.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(CategoryUpdateRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $validatedData = $request->validated();
            $validatedData['updated_by'] = Auth::id();

            $category->update($validatedData);


            $category->load(['createdByUser', 'updatedByUser', 'parentCategory']);

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
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::with('children')->findOrFail($id);


            foreach ($category->children as $child) {
                $child->delete();
            }

            
            $category->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục và danh mục con đã được xóa thành công.'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xóa danh mục.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
