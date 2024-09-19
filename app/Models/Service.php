<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'services';
    protected $fillable = [
        'id',
        'service_category_id',
        'name',
        'price',
        'description',
        'image_url',
        'duration',
        'status',
        'created_by'
    ];

    protected $attributes = [
        'status' => true
    ];
}
