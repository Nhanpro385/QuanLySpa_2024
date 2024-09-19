<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;

class Category extends Model
{
    use HasFactory, HasSnowflakePrimary;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'categories';
    protected $fillable = [
        'id',
        'name',
        'status',
        'description',
        'created_by',
    ];

    protected $attributes = [
        'status' => true,
    ];
}
