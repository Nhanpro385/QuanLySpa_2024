<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
class Contact extends Model
{
    use HasFactory, HasSnowflakePrimary;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'name',
        'phone',
        'email',
        'note',
    ];

    protected $attributes = [
        'status' => false,
    ];
}
