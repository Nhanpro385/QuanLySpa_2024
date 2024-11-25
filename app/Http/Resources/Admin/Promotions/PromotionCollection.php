<?php

namespace App\Http\Resources\Admin\Promotions;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request as HttpRequest;

class PromotionCollection extends ResourceCollection
{
    public $collects = PromotionResource::class;

    public function toArray(HttpRequest $request): array
    {
        return parent::toArray($request);
    }
}
