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

    public function parentCategory()
    {
        return $this->belongsTo(Category::class, 'parent_id')->select(['id', 'name']);

    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id'); 
    }


    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function updatedByUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }


    public function scopeActive($query)
    {
        return $query->where('status', true);
    }


    public function scopeWithParent($query, $parentId)
    {
        return $query->where('parent_id', $parentId);
    }


    public function getCreatorAttribute()
    {
        return $this->createdByUser ? $this->createdByUser->name : null;
    }
}
