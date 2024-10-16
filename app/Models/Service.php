<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id', 'id');
    }
    public function appointmentService()
    {
        return $this->hasMany(Service::class, 'services_id', 'id');
    }

    public function treatmentHistory()
    {
        return $this->hasMany(Service::class, 'services_id', 'id');
    }
    public function comment()
    {
        return $this->hasMany(Service::class, 'services_id', 'id');
    }
    public function productServices()
    {
        return $this->hasMany(ProductService::class, 'service_id', 'id');
    }
    public function serviceImages()
    {
        return $this->hasMany(ServiceImage::class, 'service_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

}
