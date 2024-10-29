<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use Illuminate\Support\Facades\Hash;

class Customer extends Model
{
    use HasFactory, HasSnowflakePrimary;

    protected $keyType = 'string';
    protected $table = 'customers';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'full_name',
        'password',
        'email',
        'gender',
        'phone',
        'address',
        'date_of_birth',
        'note',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'status' => true,
        'gender' => 1,
    ];

    protected static function boot()
    {
        parent::boot();


        static::creating(function ($customer) {
            if (isset($customer->password)) {
                $customer->password = Hash::make($customer->password);
            }
        });
    }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    




    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'customer_id', 'id');
    }


    public function treatmentHistories()
    {
        return $this->hasMany(TreatmentHistory::class, 'customer_id', 'id');
    }
}
