<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TreatmentHistory extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'treatment_histories';

    protected $fillable = [
        'id',
        'service_id',
        'customer_id',
        'appointment_id',
        'staff_id',
        'image_before',
        'image_after',
        'feedback',
        'note',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $attribute = [
        'status' => true
    ];
    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'id');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'services_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function treatmentProduct()
    {
        return $this->hasMany(TreatmentHistory::class, 'treatment_historie_id', 'id');
    }
}
