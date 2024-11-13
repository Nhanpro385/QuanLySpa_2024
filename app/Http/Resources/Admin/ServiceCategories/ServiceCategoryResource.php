<?php

namespace App\Http\Resources\Admin\ServiceCategories;

use App\Http\Resources\Admin\Services\ServiceResource;
use App\Http\Resources\Admin\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCategoryResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $services = $childrentIds = [];

        if ($request->input('services') === 'true') {
            $services = $this->whenLoaded('services') ? $this->allServices() : [];
        }
        if ($request->input('childrentIds') === 'true') {
            $childrentIds = $this->whenLoaded('childrentIds') ? $this->childrentIds : [];
        }

        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'services' => $services ? $services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'status' => $service->status,
                ];
            }) : [],
            'parent' => $this->parentId ?
                [
                    'id' => (string) $this->parentId->id,
                    'name' => $this->parentId->name,
                ]
                : null,
            'childs' => $childrentIds ? SimpleServiceCategory::collection($childrentIds) : [],
            'created_by' => $this->created_by ? [
                'id' => (string) $this->createdBy->id,
                'fullname' => $this->createdBy->full_name,
                'role' => $this->roleName($this->createdBy->role)
            ] : null,
            'updated_by' => $this->updated_by ? [
                'id' => (string) $this->updatedBy->id ?? null,
                'fullname' => $this->updatedBy->full_name,
                'role' => $this->roleName($this->updatedBy->role)
            ] : null,
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d') : null,

        ];
    }

    public function roleName($role)
    {
        $name = 'Nhân viên';
        if ($role == 0) {
            $name = 'Quản trị viên';
        } elseif ($role == 2) {
            $name = 'Nhân viên tư vấn và chăm sóc khách hàng';
        }
        return $name;
    }
}
