<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promotion extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'promotions';
    protected $fillable = [
        'id',
        'name',
        'start_date',
        'end_date',
        'promotion_type',
        'discount_percent',
        'status',
        'created_by'
    ];

    protected $attribute = [
        'status' => true
    ];
    public function Payment()
    {
        return $this->hasMany(Promotion::class, 'promotions_id', 'id');
    }
   
}
