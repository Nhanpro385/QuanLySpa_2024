<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, HasSnowflakePrimary;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'categories';
    protected $casts = [
        'id' => 'string',
        'parent_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];

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


    protected static function boot()
    {
        //products
        parent::boot();
        static::deleting(function ($category) {
            Product::where('category_id', $category->id)->update(['category_id' => null]);
        });

        static::softDeleted(function ($category) {

            Product::where('category_id', $category->id)->update(['category_id' => null]);
        });

        // categori
        static::deleting(function ($parent_id) {
            Category::where('parent_id', $parent_id->id)->update(['parent_id' => null]);
        });

        static::softDeleted(function ($parent_id) {

            Category::where('parent_id', $parent_id->id)->update(['parent_id' => null]);
        });
    }
}
