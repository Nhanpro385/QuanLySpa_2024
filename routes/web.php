<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|string|max:20|unique:categories,id',
            'name' => 'required|string|max:255',
            'status' => 'boolean',
            'description' => 'nullable|string',
            'created_by' => 'required|string|max:20',
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }


    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|boolean',
            'description' => 'nullable|string',
            'created_by' => 'sometimes|required|string|max:20',
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }

    
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
