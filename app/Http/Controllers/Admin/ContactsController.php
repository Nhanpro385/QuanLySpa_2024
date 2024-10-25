<?php
namespace App\Http\Controllers\Admin;

use App\Models\Contact;
use App\Http\Requests\Admin\Contacts\StoreContactRequest;
use App\Http\Requests\Admin\Contacts\UpdateContactRequest;
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

    public function store(StoreContactRequest $request)
    {
        try {
            $contact = Contact::create($request->validated());
    
            return response()->json([
                'message' => 'Tạo liên hệ thành công',
                'data' => new ContactResource($contact)
            ], 201, ['Content-Type' => 'application/json']); // Thiết lập Content-Type là application/json
        } catch (\Illuminate\Database\QueryException $e) {
            // Kiểm tra nếu lỗi là do email trùng lặp
            if ($e->errorInfo[1] == 1062) { // Mã lỗi SQL cho trùng lặp UNIQUE
                return response()->json([
                    'error' => 'Email đã tồn tại. Vui lòng sử dụng email khác.'
                ], 422, ['Content-Type' => 'application/json']);
            }
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thêm mới liên hệ'], 500, ['Content-Type' => 'application/json']);
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

    public function update(UpdateContactRequest $request, $id)
    {
        try {
            $contact = Contact::find($id);
            if (!$contact) {
                return response()->json(['error' => 'Không tìm thấy liên hệ'], 404);
            }

            $contact->update($request->validated());
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
