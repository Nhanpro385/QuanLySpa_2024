<?php

namespace App\Http\Resources\Client\Consulations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ConsulationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public $collects = ConsulationResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
