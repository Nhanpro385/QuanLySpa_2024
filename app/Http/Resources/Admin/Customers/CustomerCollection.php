<?php

namespace App\Http\Resources\Admin\Customers;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request as HttpRequest;

class CustomerCollection extends ResourceCollection
{
    public $collects = CustomerResource::class;

    public function toArray(HttpRequest $request): array
    {
        return parent::toArray($request);
    }


}
