<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $categories = Category::paginate(5);
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'không tìm thấy danh mục'], 404);
        }

        return response()->json($category);
    }

    public function store(Request $request)
    {

    $existingCategoryById = Category::where('id', $request->id)->first();

    $existingCategoryByName = Category::where('name', $request->name)->first();

    if ($existingCategoryById && $existingCategoryByName) {
        return response()->json(['message' => 'ID của bạn đã tại và tên danh mục của bạn bị trùng.'], 400);
    } elseif ($existingCategoryById) {
        return response()->json(['message' => 'ID của bạn đã tồn tại.'], 400);
    } elseif ($existingCategoryByName) {
        return response()->json(['message' => 'Tên danh mục của bạn bị trùng.'], 400);
    }

    $request->validate([
        'id' => 'required',
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|boolean',
    ]);


    $category = Category::create($request->all());

    return response()->json([
        'message' => 'Thêm danh mục thành công!',
        'category' => $category,
    ], 201);

    }

    public function update(Request $request, $id)
    {

    $category = Category::find($id);

    if (!$category) {
        return response()->json(['message' => 'Danh mục không tìm thấy'], 404);
    }


    $existingCategoryById = Category::where('id', $request->id)->where('id', '!=', $id)->first();

    $existingCategoryByName = Category::where('name', $request->name)->where('id', '!=', $id)->first();

    if ($existingCategoryById && $existingCategoryByName) {
        return response()->json(['message' => 'ID của bạn đã tồn tại và tên danh mục của bạn bị trùng.'], 400);
    } elseif ($existingCategoryById) {
        return response()->json(['message' => 'ID của bạn đã tồn tại.'], 400);
    } elseif ($existingCategoryByName) {
        return response()->json(['message' => 'Tên danh mục của bạn bị trùng.'], 400);
    }

    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'sometimes|required|boolean',
    ]);

    $category->update($request->all());
    return response()->json(['message' => 'Cập nhật danh mục thành công!', 'category' => $category]);
    }

    public function destroy($id)
    {

    $category = Category::find($id);

    if (!$category) {
        return response()->json(['message' => 'Danh mục không tìm thấy'], 404);
    }

    $category->delete();

    return response()->json(['message' => 'Danh mục đã được xóa thành công']);
    }
}
