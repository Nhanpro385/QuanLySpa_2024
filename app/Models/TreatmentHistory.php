<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;
use Illuminate\Support\Facades\Storage;




class TreatmentHistory extends Model
{
    use HasFactory, SoftDeletes, HasSnowflakePrimary;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'treatment_histories';

    protected $fillable = [
        'id',
        'customer_id',
        'appointment_id',
        'staff_id',
        'image_before',
        'image_after',
        'feedback',
        'note',
        'evalute',
        'status',
        'created_by',
        'updated_at',
    ];

    protected $attributes = [
        'status' => true,
    ];

    // Relationships
    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    // For the user who created the record
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    // For the user who last updated the record
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    // Example for treatment products, assuming it's a related model
    // public function treatmentProducts()
    // {
    //     return $this->hasMany(TreatmentProduct::class, 'treatment_history_id', 'id');
    // }

    // Auto-assign created_by and updated_by on create and update
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (auth()->check()) {
                $model->created_by = auth()->id();
            }
        });

        static::updating(function ($model) {
            if (auth()->check()) {
                $model->updated_by = auth()->id();
            }
        });


        static::deleting(function ($model) {
            // Xóa ảnh trước khi xóa bản ghi
            if ($model->image_before && Storage::disk('public')->exists($model->image_before)) {
                Storage::disk('public')->delete($model->image_before);
            }
    
            if ($model->image_after && Storage::disk('public')->exists($model->image_after)) {
                Storage::disk('public')->delete($model->image_after);
            }
        });
    }
         // fix id trả về qua js bị 00
    protected $casts = [
        'id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];
    
}
