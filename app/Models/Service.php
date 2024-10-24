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
        'priority',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'status' => true,
        'image_url' => 'default.jpg',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id', 'id');
    }

    public function appointmentServices()
    {
        return $this->hasMany(Appointment::class, 'service_id', 'id');
    }

    public function treatmentHistories()
    {
        return $this->hasMany(TreatmentHistory::class, 'service_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'service_id', 'id');
    }


    public function productServices()
    {
        return $this->hasMany(ProductService::class, 'service_id', 'id');
    }


    public function serviceImages()
    {
        return $this->hasMany(ServiceImage::class, 'service_id', 'id');
    }


    public function customers()
    {
        return $this->hasManyThrough(Customer::class, Comment::class, 'service_id', 'id', 'id', 'customer_id');
    }
}
