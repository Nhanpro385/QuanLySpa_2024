<?php

namespace App\Http\Resources\Client\ServiceCategories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ServiceCategoryConllection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public $collects = ServiceCategoryResource::class;
    public function toArray(Request $request): array
    {

        return parent::toArray($request);
    }
}
