<?php

namespace App\Http\Resources\Admin\Services;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ServiceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */

    public $collects = ServiceResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
