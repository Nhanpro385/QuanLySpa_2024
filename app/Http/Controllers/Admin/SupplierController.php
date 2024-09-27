<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
{
    
    public function index()
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $suppliers = Supplier::all();
        return response()->json($suppliers);
    }


    public function store(Request $request)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'id' => 'required|string|max:20|unique:suppliers,id',
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'code' => 'nullable|string|max:255',
            'created_by' => 'required|string|max:20',
        ]);

        $supplier = Supplier::create($request->all());
        return response()->json($supplier, 201);
    }


    public function show($id)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $supplier = Supplier::findOrFail($id);
        return response()->json($supplier);
    }


    public function update(Request $request, $id)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'country' => 'sometimes|required|string|max:255',
            'contact_email' => 'sometimes|required|email|max:255',
            'code' => 'nullable|string|max:255',
            'created_by' => 'sometimes|required|string|max:20',
        ]);

        $supplier = Supplier::findOrFail($id);
        $supplier->update($request->all());
        return response()->json($supplier);
    }


    public function destroy($id)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        return response()->json(null, 204);
    }
}
