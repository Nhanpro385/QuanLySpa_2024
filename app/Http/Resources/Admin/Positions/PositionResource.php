<?php

namespace App\Http\Resources\Admin\Positions;

use App\Http\Resources\Admin\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $users = [];
        if ($request->input('users') === 'true') {
            $users = $this->whenLoaded('users') ? $this->users : [];
        }
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'wage' => $this->wage ? number_format($this->wage) : null,
            'note' => $this->note,
            'users' => $users ? $users->map(function ($user) {
                return [
                    'id' => (string) $user->id,
                    'full_name' => $user->full_name,
                    'role' => $user->role,
                    'phone' => $user->phone,
                    'email' => $user->email
                ];
            }) : [],
            'created_at' =>
                $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d')
        ];
    }
}
