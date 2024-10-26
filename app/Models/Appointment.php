<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

class Appointment extends Model
{
    use HasFactory, HasSnowflakePrimary;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;


    protected $table = 'appointments';
    protected $fillable = [
        'id',
        'shift_id',
        'customer_id',
        'start_time',
        'note',
        'appointment_date',
        'status',
        'created_by'
    ];


    public function shift()
    {
        return $this->belongsTo(Shift::class, 'shifts_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function appointmentService()
    {
        return $this->hasMany(AppointmentService::class, 'appointment_id', 'id');
    }
    public function payment()
    {
        return $this->hasMany(AppointmentService::class, 'appointment_id', 'id');
    }
    public function treatmentHistory()
    {
        return $this->hasMany(AppointmentService::class, 'appointment_id', 'id');
    }
    public function appointmentStaffs()
    {
        return $this->hasMany(AppointmentService::class, 'appointment_id', 'id');
    }


}
