<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;

class Customer extends Model
{
    use HasFactory, HasSnowflakePrimary;
    protected $keyType = 'string';
    protected $table = 'customers';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'full_name',
        'name',
        'password',
        'email',
        'gender',
        'phone',
        'address',
        'date_of_birth',
        'note',
        'status',
        'created_by'
    ];

    protected $attributes = [
        'status' => true,
        'gender' => 'female',
        'name' => null,
        'email' => null,

    ];
    public function consulation()
    {
        return $this->hasMany(Customer::class, 'customer_id', 'id');
    }
    public function appointment()
    {
        return $this->hasMany(Customer::class, 'customer_id', 'id');
    }
    public function treatmentHistory()
    {
        return $this->hasMany(Customer::class, 'customer_id', 'id');
    }
}
