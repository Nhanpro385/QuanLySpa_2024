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

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $categories = Category::all();
        return response()->json($categories);
    }


    public function store(Request $request)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'id' => 'required|string|max:20|unique:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'created_by' => 'required|string|max:20',
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }


    public function show($id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $category = Category::findOrFail($id);
        return response()->json($category);
    }


    public function update(Request $request, $id)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'created_by' => 'sometimes|required|string|max:20',
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }


    public function destroy($id)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
