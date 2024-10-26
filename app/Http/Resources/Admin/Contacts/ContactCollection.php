<?php

namespace App\Http\Resources\Admin\Contacts;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ContactCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($contact) {
                return [
                    'id' => $contact->id,
                    'name' => $contact->name,
                    'phone' => $contact->phone,
                    'email' => $contact->email,
                    'note' => $contact->note,
                    'evaluate' => $contact->evaluate, // Thêm evaluate
                    'status' => $contact->status,
                ];
            }),
            'status' => true,
            'message' => 'Danh sách liên hệ',
        ];
    }
}
