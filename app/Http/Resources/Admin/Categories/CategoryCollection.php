<?php

namespace App\Http\Resources\Admin\Categories;

use Illuminate\Http\Request as HttpRequest;
use Illuminate\Http\Resources\Json\ResourceCollection;


class CategoryCollection extends ResourceCollection
{
    public $collects = CategoryResource::class;

    public function toArray(HttpRequest $request): array
    {
        return parent::toArray($request);
    }
}
