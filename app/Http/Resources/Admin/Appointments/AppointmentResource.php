<?php

namespace App\Http\Resources\Admin\Appointments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $users = $this->whenLoaded('users') ? $this->users : [];
        $services = $this->whenLoaded('services') ? $this->services : [];
        return [
            'id' => (string) $this->id,
            'shift' => $this->shift_id ? [
                'id' => (string) $this->shift_id,
                'max_customers' => (int) $this->shift->max_customers,
                'status' => $this->shift->status,
                'shift_date' => $this->shift->shift_date
            ] : null,
            'customer' => $this->customer_id ? [
                'id' => (string) $this->customer_id,
                'full_name' => $this->customer->full_name,
                'phone' => $this->customer->phone,
                'email' => $this->customer->email
            ] : null,
            'users' => $users ? $users->map(function ($user) {
                return [
                    'id' => (string) $user->id ?? null,
                    'full_name' => $user->full_name,
                    'role' => $this->roleName($user->role)
                ];
            }) : [],
            'services' => $services ? $services->map(function ($service) {
                return [
                    'id' => (string) $service->id,
                    'serviceCategory' => $service->service_category_id ? [
                        'id' => (string) $service->serviceCategory->id,
                        'name' => $service->serviceCategory->name,
                    ] : null,
                    'name' => $service->name,
                    'quantity' => $service->pivot->quantity,
                    'price' => $service->pivot->price
                ];
            }) : [],
            'start_time' => $this->start_time,
            'note' => $this->note,
            'appointment_date' => $this->appointment_date,
            'status' => $this->statusValue($this->status),
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

    public function statusValue($status)
    {
        $value = 'Đã đặt lịch hẹn.';
        if ($status === 0) {
            $value = 'Đã hủy lịch hẹn.';
        } elseif ($status == 2) {
            $value = 'Đang thực hiện.';
        } elseif ($status == 3) {
            $value = 'Đã hoàn thành.';
        }

        return $value;
    }
}
