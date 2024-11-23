<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppointmentService extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'appointment_services';
    protected $fillable = [
        'id',
        'appointment_id',
        'service_id',
        'quantity',
        'price'
    ];

    protected $casts = [
        'id' => 'string',
        'service_id' => 'string',
        'appointment_id' => 'string',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'id');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'services_id', 'id');
    }
}
