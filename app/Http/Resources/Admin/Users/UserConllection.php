<?php

namespace App\Http\Resources\Admin\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserConllection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($user) {
                return [
                    'id' => $user->id,
                    'position_id' => $user->position_id . "==>name",
                    'name' => $user->name,
                    'role' => $user->role,
                    'full_name' => $user->full_name,
                    'gender' => $user->gender,
                    'phone' => $user->phone,
                    'email' => $user->email,
                    'status' => $user->status,
                ];
            }),
            'status' => true,
            'message' => 'Danh sách nhân viên'
        ];
    }
}
