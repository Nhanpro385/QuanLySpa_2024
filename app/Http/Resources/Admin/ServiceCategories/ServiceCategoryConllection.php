<?php

namespace App\Http\Resources\Admin\ServiceCategories;

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
        // return [
        //     'data' => $this->collection->map(function ($serviceCategory) {
        //         return [
        //             'id' => $serviceCategory->id,
        //             'name' => $serviceCategory->name,
        //             'description' => $serviceCategory->description,
        //             'status' => $serviceCategory->status,
        //             'created_by' => $serviceCategory->createdBy->name ?? null,
        //             'created_at' =>
        //                 $serviceCategory->created_at->format('Y-m-d '),
        //             'updated_at' => $serviceCategory->updated_at->format('Y-m-d')
        //         ];
        //     }),
        //     'status' => true,
        //     'message' => 'Danh sách các loại dịch vụ',
        // ];
        return parent::toArray($request);
    }
}
