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

    protected $attributes = [
        'status' => true,
    ];
}
