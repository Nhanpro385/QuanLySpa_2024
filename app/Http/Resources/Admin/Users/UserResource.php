<?php

namespace App\Http\Resources\Admin\Users;

use App\Http\Resources\Admin\Appointments\AppointmentCollection;
use App\Http\Resources\Admin\Appointments\AppointmentResource;
use App\Http\Resources\Admin\Consulations\ConsulationCollection;
use App\Models\AppointmentStaff;
use App\Models\Consulation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $day = Carbon::today();
        if ($request->input('day')) {
            $day = Carbon::parse($request->input('day'));
        }

        $countAppoinment_today = $this->countDayAppoinment_Consulation(AppointmentStaff::class, $this->id, $day);

        $countAppoinment_week = $this->countAppointmentWeek($this->id, $day);
        $countAppoinment_month = $this->countAppointmentMonth($this->id, $day);
        $countConsulation_today = $this->countDayAppoinment_Consulation(Consulation::class, $this->id, $day);
        $countConsulation_week = $this->countConsulationWeek($this->id, $day);
        $countConsulation_month = $this->countConsulationMonth($this->id, $day);
        $shifts = [];
        $shifts_after = [];
        $shifts_before = [];
        $treatmentHistories = [];
        $consulations = $appointments = [];
        if ($request->input('shifts') === 'true') {
            $shifts = $this->whenLoaded('shifts') ? $this->shifts : [];
        }
        if ($request->input('shifts_after') === 'true') {
            $shifts_after = $this->whenLoaded('shifts_after') ? $this->shifts_after : [];
        }
        if ($request->input('shifts_before') === 'true') {
            $shifts_before = $this->whenLoaded('shifts_before') ? $this->shifts_before : [];
        }
        if ($request->input('treatmentHistories') === 'true') {
            $treatmentHistories = $this->whenLoaded('treatmentHistories') ? $this->treatmentHistories : [];
        }
        if ($request->input('consulations') === 'true') {
            $consulations = $this->whenLoaded('consulations') ? $this->consulations : [];
        }
        if ($request->input('appointments') === 'true') {
            $appointments = $this->whenLoaded('appointments') ? $this->appointments : [];
        }
        return [
            'id' => (string) $this->id,
            'position' => $this->position_id ? [
                'id' => $this->position->id,
                'name' => $this->position->name,
                'wage' => $this->position->wage
            ] : null,
            'role' => $this->roleName((int) $this->role),
            'full_name' => $this->full_name,
            'gender' => $this->genderName($this->gender),
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'note' => $this->note,
            'status' => $this->status,
            'shifts' => $shifts ? $shifts->map(function ($shift) {
                return [
                    "id" => $shift->id,
                    "start_time" => $shift->start_time,
                    "end_time" => $shift->end_time,
                    "shift_date" => $shift->shift_date,
                    "max_customers" => $shift->max_customers,
                    "note" => $shift->note,
                    "status" => $shift->status,
                ];
            }) : [],
            'shifts_after' => $shifts_after ? $shifts_after->map(function ($shift) {
                return [
                    "id" => $shift->id,
                    "start_time" => $shift->start_time,
                    "end_time" => $shift->end_time,
                    "shift_date" => $shift->shift_date,
                    "max_customers" => $shift->max_customers,
                    "note" => $shift->note,
                    "status" => $shift->status,
                ];
            }) : [],
            'shifts_before' => $shifts_before ? $shifts_before->map(function ($shift) {
                return [
                    "id" => $shift->id,
                    "start_time" => $shift->start_time,
                    "end_time" => $shift->end_time,
                    "shift_date" => $shift->shift_date,
                    "max_customers" => $shift->max_customers,
                    "note" => $shift->note,
                    "status" => $shift->status,
                ];
            }) : [],
            'treatmentHistories' => $treatmentHistories ? $treatmentHistories->map(function ($treatmentHistory) {
                return [
                    'id' => $treatmentHistory->id,
                    'customer_id' => $treatmentHistory->customer_id ? [
                        'id' => $treatmentHistory->customer->id,
                        'full_name' => $treatmentHistory->customer->full_name
                    ] : [],
                    'appointments' => $treatmentHistory->appointment_id ? [
                        new AppointmentResource($treatmentHistory->appointment)
                    ] : [],
                    'feedback' => $treatmentHistory->feedback,
                    'evaluete' => $treatmentHistory->evaluete
                ];
            }) : [],
            'cosulations' => $consulations ? new ConsulationCollection($consulations) : [],
            'appointments' => $appointments ? new AppointmentCollection($appointments) : [],
            'countAppoinment_today' => $countAppoinment_today,
            'countAppoinment_week' => $countAppoinment_week,
            'countAppoinment_month' => $countAppoinment_month,
            'countConsulation_today' => $countConsulation_today,
            'countConsulation_week' => $countConsulation_week,
            'countConsulation_month' => $countConsulation_month,
            'created_by' => $this->created_by ? [
                'id' => (string) $this->createdBy->id,
                'fullname' => $this->createdBy->full_name,
                'role' => $this->roleName((int) $this->createdBy->role)
            ] : null,
            'updated_by' => $this->updated_by ? [
                'id' => (string) $this->updatedBy->id ?? null,
                'fullname' => $this->updatedBy->full_name,
                'role' => $this->roleName((int) $this->updatedBy->role)
            ] : null,
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d') : null,
            'payment_today' => [
                'date' => $day ? $day->format('Y-m-d') : 'Hôm nay',
                'total_amount' => $this->payments($day),
                'total_amount_cash' => $this->payment_type_cash($day),
                'total_amount_transfer' => $this->payment_type_transfer($day),
            ]
        ];
    }

    public function roleName(int $role)
    {
        $name = '';
        if ($role === 0) {
            $name = 'Quản trị viên';
        }
        if ($role === 2) {
            $name = 'Nhân viên tư vấn và chăm sóc khách hàng';
        }
        if ($role === 1) {
            $name = "Nhân viên";
        }
        return $name;
    }

    public function genderName($gender)
    {
        $name = 'Nữ';
        if ($gender == 0) {
            $name = 'Khác';
        } elseif ($gender == 2) {
            $name = 'Nam';
        }
        return $name;
    }

    public function countDayAppoinment_Consulation($model, $staff_id, $day)
    {
        return $model::where('staff_id', $staff_id)->whereDate('created_at', $day)->count();
    }


    public function countAppointmentWeek($staff_id, $day)
    {
        $weeklyAppointmentsCount = DB::table('appointment_staffs')
            ->join('users', 'appointment_staffs.staff_id', '=', 'users.id')
            ->join('appointments', 'appointment_staffs.appointment_id', '=', 'appointments.id')
            ->whereIn('appointments.status', [1, 2, 3])
            ->where('staff_id', $staff_id)
            ->whereBetween('appointment_staffs.created_at', [Carbon::parse($day)->startOfWeek(), Carbon::parse($day)->endOfWeek()])
            ->count();

        return $weeklyAppointmentsCount;
    }

    public function countConsulationWeek($staff_id, $day)
    {
        $weeklyConsultationCount = DB::table('consulations')
            ->join('users', 'consulations.staff_id', '=', 'users.id')
            ->whereIn('consulations.status', [1, 2])
            ->where('staff_id', $staff_id)
            ->whereBetween('consulations.created_at', [Carbon::parse($day)->startOfWeek(), Carbon::parse($day)->endOfWeek()])
            ->count();
        return $weeklyConsultationCount;
    }

    public function countAppointmentMonth($staff_id, $day)
    {
        $monthlyAppointmentsCount = DB::table('appointment_staffs')
            ->join('users', 'appointment_staffs.staff_id', '=', 'users.id')
            ->join('appointments', 'appointment_staffs.appointment_id', '=', 'appointments.id')
            ->whereIn('appointments.status', [1, 2, 3])
            ->where('staff_id', $staff_id)
            ->whereBetween('appointment_staffs.created_at', [Carbon::parse($day)->startOfMonth(), Carbon::parse($day)->endOfMonth()])
            ->count();

        return $monthlyAppointmentsCount;
    }

    public function countConsulationMonth($staff_id, $day)
    {
        $monthConsultationCount = DB::table('consulations')
            ->join('users', 'consulations.staff_id', '=', 'users.id')
            ->whereIn('consulations.status', [1, 2])
            ->where('staff_id', $staff_id)
            ->whereBetween('consulations.created_at', [Carbon::parse($day)->startOfMonth(), Carbon::parse($day)->endOfMonth()])
            ->count();
        return $monthConsultationCount;
    }



}

