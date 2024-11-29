<?php

namespace App\Http\Controllers\Admin;

use App\Models\Contact;
use App\Http\Requests\Admin\Contacts\StoreContactRequest;
use App\Http\Requests\Admin\Contacts\UpdateContactRequest;
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

        return response()->json([
            'status' => 'success',
            'message' => 'Danh sách liên hệ',
            'data' => $contacts,
        ]);
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

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Liên hệ được cập nhật thành công.',
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
