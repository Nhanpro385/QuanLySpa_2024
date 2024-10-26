<?php

namespace App\Http\Resources\Admin\Positions;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PositionConllection extends ResourceCollection
{

    public $collects = PositionResource::class;

   
    public function toArray(Request $request): array
    {
        return [
            'status' => 'success',
            'data' => parent::toArray($request),
            'meta' => [
                'total' => $this->total(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'per_page' => $this->perPage(),
            ],
        ];
    }
}
