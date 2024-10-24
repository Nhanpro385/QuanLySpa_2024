<?php
namespace App\Http\Controllers\Admin;

use App\Models\Contact;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\Contacts\ContactResource;
use App\Http\Resources\Admin\Contacts\ContactCollection;
use Illuminate\Support\Facades\Validator;

class ContactsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $contacts = Contact::paginate(10); // Số lượng bản ghi trên mỗi trang là 10
            return new ContactCollection($contacts);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đã xảy ra lỗi'], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:contacts',
            'phone' => 'required|string|max:20',
            'evaluate' => 'nullable|integer|min:0|max:255', // Thêm trường này
            'note' => 'required|string|max:255', // Note bắt buộc
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $contact = Contact::create($validator->validated());
            return new ContactResource($contact);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thêm mới liên hệ'], 500);
        }
    }

    public function show($id)
    {
        try {
            $contact = Contact::find($id);
            if (!$contact) {
                return response()->json(['error' => 'Không tìm thấy liên hệ'], 404);
            }
            return new ContactResource($contact);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đã xảy ra lỗi'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:contacts,email,' . $id,
            'phone' => 'string|max:20',
            'evaluate' => 'nullable|integer|min:0|max:255', // Thêm trường này
            'note' => 'required|string|max:255', // Note bắt buộc
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $contact = Contact::find($id);
            if (!$contact) {
                return response()->json(['error' => 'Không tìm thấy liên hệ'], 404);
            }

            $contact->update($validator->validated());
            return new ContactResource($contact);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình cập nhật liên hệ'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $contact = Contact::find($id);
            if (!$contact) {
                return response()->json(['error' => 'Không tìm thấy liên hệ'], 404);
            }

            $contact->delete();
            return response()->json(['message' => 'Xóa liên hệ thành công']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình xóa liên hệ'], 500);
        }
    }
}
