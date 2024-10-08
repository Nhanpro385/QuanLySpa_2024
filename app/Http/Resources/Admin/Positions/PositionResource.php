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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'wage' => $this->wage ? number_format($this->wage) : null,
            'note' => $this->note,
            'users' => UserResource::collection($this->whenLoaded('users')),
            'created_at' =>
                $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d')
        ];
    }
}
