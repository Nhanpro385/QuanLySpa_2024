<?php

namespace App\Http\Resources\Admin\Suppliers;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request as HttpRequest;

class SupplierCollection extends ResourceCollection
{
    public $collects = SupplierResource::class;

    public function toArray(HttpRequest $request): array
    {
        return parent::toArray($request);
    }
}
