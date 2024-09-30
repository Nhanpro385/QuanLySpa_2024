<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{

    public function index()
    {
        $suppliers = Supplier::paginate(5);
        return response()->json($suppliers);
    }


    public function show($id)
    {

         $supplier = Supplier::find($id);


         if (!$supplier) {
             return response()->json(['message' => 'Nhà cung cấp không tìm thấy.'], 404);
         }


         return response()->json($supplier);
    }


    public function store(Request $request)
    {
        $existingSupplierById = Supplier::where('id', $request->id)->first();
        $existingSupplierByName = Supplier::where('name', $request->name)->first();
        $existingSupplierByEmail = Supplier::where('contact_email', $request->contact_email)->first();
        $existingSupplierByCode = Supplier::where('code', $request->code)->first();


        if ($existingSupplierById && $existingSupplierByName && $existingSupplierByEmail && $existingSupplierByCode) {
            return response()->json(['message' => 'ID của bạn đã tồn tại, tên nhà cung cấp, email và mã code của bạn bị trùng.'], 400);
        } elseif ($existingSupplierById) {
            return response()->json(['message' => 'ID của bạn đã tồn tại.'], 400);
        } elseif ($existingSupplierByName) {
            return response()->json(['message' => 'Tên nhà cung cấp của bạn bị trùng.'], 400);
        } elseif ($existingSupplierByEmail) {
            return response()->json(['message' => 'Email của bạn đã tồn tại.'], 400);
        } elseif ($existingSupplierByCode) {
            return response()->json(['message' => 'Mã code của bạn đã tồn tại.'], 400);
        }

        $request->validate([
            'id' => 'required|string',
            'name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'contact_email' => 'required|email',
            'code' => 'nullable|string|max:255',
            'created_by' => 'nullable|string|max:255',
        ]);


        $supplier = Supplier::create($request->all());

        return response()->json([
            'message' => 'Thêm nhà cung cấp thành công!',
            'supplier' => $supplier,
        ], 201);
    }

    public function update(Request $request, $id)
    {

        $supplier = Supplier::find($id);
        if (!$supplier) {
            return response()->json(['message' => 'Nhà cung cấp không tìm thấy.'], 404);
        }


        $existingSupplierById = Supplier::where('id', $request->id)
                                         ->where('id', '!=', $id)
                                         ->first();
        $existingSupplierByName = Supplier::where('name', $request->name)
                                           ->where('id', '!=', $id)
                                           ->first();
        $existingSupplierByEmail = Supplier::where('contact_email', $request->contact_email)
                                            ->where('id', '!=', $id)
                                            ->first();
        $existingSupplierByCode = Supplier::where('code', $request->code)
                                           ->where('id', '!=', $id)
                                           ->first();


        if ($existingSupplierById && $existingSupplierByName && $existingSupplierByEmail && $existingSupplierByCode) {
            return response()->json(['message' => 'ID của bạn đã tồn tại, tên nhà cung cấp, email và mã code của bạn bị trùng.'], 400);
        } elseif ($existingSupplierById) {
            return response()->json(['message' => 'ID của bạn đã tồn tại.'], 400);
        } elseif ($existingSupplierByName) {
            return response()->json(['message' => 'Tên nhà cung cấp của bạn bị trùng.'], 400);
        } elseif ($existingSupplierByEmail) {
            return response()->json(['message' => 'Email của bạn đã tồn tại.'], 400);
        } elseif ($existingSupplierByCode) {
            return response()->json(['message' => 'Mã code của bạn đã tồn tại.'], 400);
        }


        $request->validate([
            'id' => 'required|string',
            'name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'contact_email' => 'required|email',
            'code' => 'nullable|string|max:255',
            'created_by' => 'nullable|string|max:255',
        ]);


        $supplier->update($request->all());

        return response()->json([
            'message' => 'Cập nhật nhà cung cấp thành công!',
            'supplier' => $supplier,
        ], 200);
    }

    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json(['message' => 'Nhà cung cấp không tìm thấy'], 404);
        }

        $supplier->delete();
        return response()->json(['message' => 'Nhà cung cấp đã được xóa thành công']);
    }
}
