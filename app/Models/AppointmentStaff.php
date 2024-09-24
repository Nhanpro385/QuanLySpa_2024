<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppointmentStaff extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'appointment_staffs';
    protected $fillable = [
        'id',
        'appointment_id',
        'staff_id'
    ];
    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
