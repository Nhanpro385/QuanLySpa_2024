<?php

namespace App\Http\Resources\Admin\Shift;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShiftCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'data' => ShiftResource::collection($this->collection),
            'status' => true,
            'message' => 'Danh sách ca làm việc',
        ];
    }
}