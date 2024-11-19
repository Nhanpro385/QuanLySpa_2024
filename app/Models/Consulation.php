<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consulation extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'consulations';

    protected $fillable = [
        'id',
        'customer_id',
        'staff_id',
        'consulation',
        'skin_condition',
        'treatment_plan',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $attribute = [
        'status' => true
    ];
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'staff_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

}
