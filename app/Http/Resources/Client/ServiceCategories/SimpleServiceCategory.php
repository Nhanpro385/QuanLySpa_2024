<?php

namespace App\Http\Resources\Client\ServiceCategories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleServiceCategory extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'childs' => $this->childrentIds ? SimpleServiceCategory::collection($this->childrentIds) : [],
        ];
    }
}
