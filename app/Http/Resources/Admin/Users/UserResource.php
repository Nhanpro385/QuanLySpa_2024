<?php

namespace App\Http\Resources\Admin\Users;

use App\Http\Resources\Admin\Positions\PositionResource;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'position' => $this->relationLoaded('position') ? new PositionResource($this->position) : $this->position_id,
            'name' => $this->name,
            'role' => $this->role,
            'full_name' => $this->full_name,
            'gender' => $this->gender,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'note' => $this->note,
            'status' => $this->status,
        ];
    }
}
