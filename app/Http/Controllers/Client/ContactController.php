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
