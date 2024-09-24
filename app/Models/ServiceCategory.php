<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

class ServiceCategory extends Model
{
    use HasFactory;
    use HasFactory, HasSnowflakePrimary;

    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'service_categories';

    protected $fillable = [
        'id',
        'name',
        'description',
        'status',
        'created_by'
    ];

    protected $attributes = [
        'status' => true,

    ];
    public function service()
    {
        return $this->hasMany(ServiceCategory::class, 'servicecategory_id', 'id');
    }
}
