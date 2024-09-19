<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

class Shift extends Model
{
    use HasFactory, HasSnowflakePrimary;

    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'shifts';

    protected $fillable = [
        'id',
        'start_time',
        'end_time',
        'shift_date',
        'max_customers',
        'note',
        'status',
        'created_by',
    ];

    protected $attributes = [
        'start_time' => '08:00:00',
        'end_time' => '12:00:00',
        'status' => true,
        'max_customers' => 6
    ];
}
