<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
        'created_by',
        'updated_by',
    ];


    public function shift()
    {
        return $this->belongsTo(Shift::class, 'shift_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function appointmentService()
    {
        return $this->hasMany(AppointmentService::class, 'appointment_id', 'id');
    }
    public function payments()
    {
        return $this->hasMany(Payment::class, 'appointment_id', 'id');
    }
    public function treatmentHistory()
    {
        return $this->hasMany(AppointmentService::class, 'appointment_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'appointment_staffs', 'appointment_id', 'staff_id');
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'appointment_services', 'appointment_id', 'service_id')->withPivot('quantity', 'price');
    }

}
