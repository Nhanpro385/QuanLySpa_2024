<?php

namespace App\Http\Resources\Client\Customer;

use App\Http\Resources\Client\Appointments\AppointmentResource;
use App\Http\Resources\Client\Consulations\ConsulationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'gender' => $this->gender,
            'email' => $this->email ,
            'phone' => $this->phone ,
            'address' => $this->address,

            'created_at' => $this->created_at->format('d-m-Y H:i'),
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
            'appointments' => AppointmentResource::collection($this->appointments),
            'consulations' => ConsulationResource::collection($this->consultations),

        ];
    }
}
