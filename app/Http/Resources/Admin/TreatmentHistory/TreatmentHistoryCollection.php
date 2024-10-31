<?php

namespace App\Http\Resources\Admin\TreatmentHistory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TreatmentHistoryCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => TreatmentHistoryResource::collection($this->collection),
            'status' => true,
            'message' => 'Danh sách Treatment Histories',
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