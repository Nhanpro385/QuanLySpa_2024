<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Http\Requests\Client\Contacts\StoreContactRequest;
use App\Http\Resources\Client\Contacts\ContactResource;
use App\Http\Resources\Client\Contacts\ContactCollection;
class ContactController extends Controller
{
    //


    public function index(Request $request)
    {
        try {
            $perPage = $request->query('per_page', 5);
            $query = Contact::query();
            $contacts = $query->paginate($perPage); // Số lượng bản ghi trên mỗi trang là 10
            return new ContactCollection($contacts);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Đã xảy ra lỗi'], 500);
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
    public function store(StoreContactRequest $request)
    {
        $contact = Contact::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Liên hệ được tạo thành công.',
            'data' => $contact,
        ], 201);
    }
}
