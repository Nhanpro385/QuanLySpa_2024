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

    protected $casts = [
        'id' => 'string',
        'service_category_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
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
        return $this->hasMany(Comment::class, 'service_id', 'id')->orderBy('created_at', 'desc');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_services', 'service_id', 'product_id')->withPivot('quantity_used')->withTimestamps();
    }


    public function serviceImages()
    {
        return $this->hasMany(ServiceImage::class, 'service_id', 'id');
    }


    public function customers()
    {
        return $this->hasManyThrough(Customer::class, Comment::class, 'service_id', 'id', 'id', 'customer_id');
    }

    public function clientComments()
    {
        return $this->hasMany(Comment::class, 'service_id', 'id')->where('status', 1)->where('parent_comment_id', null)->orderBy('created_at', 'desc');
    }

    protected static function boot()
    {
        parent::boot();
        //service_images
        //service_products
        //comments
        static::deleting(function ($service) {
            Comment::where('service_id', $service->id)->update(['service_id' => null]);
        });
        static::softDeleted(function ($service) {
            Comment::where('service_id', $service->id)->update(['service_id' => null]);
        });
        //appointment_services
        static::deleting(function ($service) {
            AppointmentService::where('service_id', $service->id)->update(['service_id' => null]);
        });
        static::softDeleted(function ($service) {
            AppointmentService::where('service_id', $service->id)->update(['service_id' => null]);
        });
    }
}
