<?php

namespace App\Http\Resources\Admin\Positions;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PositionConllection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public $collects = PositionResource::class;
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
