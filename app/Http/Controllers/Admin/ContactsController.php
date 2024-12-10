<?php

namespace App\Http\Controllers\Admin;

use App\Models\Contact;
use App\Http\Requests\Admin\Contacts\StoreContactRequest;
use App\Http\Requests\Admin\Contacts\UpdateContactRequest;
use App\Http\Resources\Admin\Contacts\ContactCollection;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ContactsController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
    
        $contacts = Contact::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                      ->orWhere('phone', 'like', "%$search%")
                      ->orWhere('email', 'like', "%$search%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    
        return new ContactCollection($contacts);
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

    public function show(Contact $contact)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Chi tiết liên hệ',
            'data' => $contact,
        ]);
    }

    public function update(UpdateContactRequest $request, $id)
    {
        $contact = Contact::find($id);
    
        if (!$contact) {
            return response()->json([
                'status' => 'error',
                'message' => 'Liên hệ không tồn tại.',
            ], 404);
        }
    
        // Cập nhật status với forceFill
        $contact->forceFill($request->only('status'))->save();
    
        return response()->json([
            'status' => 'success',
            'message' => 'Trạng thái liên hệ được cập nhật thành công.',
            'data' => $contact,
        ]);
    }
    

    

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Liên hệ đã được xóa thành công.',
        ]);
    }
}
