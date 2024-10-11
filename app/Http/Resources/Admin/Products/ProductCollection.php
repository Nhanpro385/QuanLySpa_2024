<?php

namespace App\Http\Resources\Admin\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */

    public $collects = ProductResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
