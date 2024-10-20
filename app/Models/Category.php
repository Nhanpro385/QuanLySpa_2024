<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;

class Category extends Model
{
    use HasFactory, HasSnowflakePrimary;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'categories';
    protected $fillable = [
        'id',
        'parent_id',
        'name',
        'status',
        'description',
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'status' => true,
    ];
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
