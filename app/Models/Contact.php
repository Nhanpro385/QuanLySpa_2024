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
    protected $table = 'contacts';

    protected $fillable = [
        'id',
        'name',
        'phone',
        'email',
        'evaluete',
        'note',
    ];

    protected $attributes = [
        'status' => false,
    ];
}
