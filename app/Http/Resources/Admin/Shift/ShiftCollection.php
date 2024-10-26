<?php

namespace App\Http\Resources\Admin\Shift;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ShiftCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => ShiftResource::collection($this->collection),
            'status' => true,
            'message' => 'Danh sách ca làm việc',
            'meta' => [
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'total_pages' => $this->lastPage(),
            ],
        ];
    }
}
