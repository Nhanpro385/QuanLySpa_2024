<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;

class Staff extends Model
{
    use HasFactory, HasSnowflakePrimary;
    protected $keyType = 'string';
    protected $table = 'staffs';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'position_id',
        'name',
        'password',
        'role',
        'full_name',
        'gender',
        'phone',
        'email',
        'address',
        'date_of_birth',
        'note',
        'status',
        'created_by'
    ];

    protected $attributes = [
        'status' => true,
        'gender' => 'female',
        'role' => 'staff'
    ];
}
