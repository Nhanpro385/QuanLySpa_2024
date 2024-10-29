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
        return $this->belongsTo(Category::class, 'parent_id')->with('createdByUser'); // Lấy thông tin người tạo của danh mục cha
    }

    // Mối quan hệ với danh mục con
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id'); // Lấy danh mục con
    }

    // Liên kết đến người tạo
    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Liên kết đến người cập nhật
    public function updatedByUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Scope để lấy danh mục hoạt động
    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    // Scope để lấy danh mục theo cha
    public function scopeWithParent($query, $parentId)
    {
        return $query->where('parent_id', $parentId);
    }

    // Phương thức tiện ích để lấy tên người tạo
    public function getCreatorAttribute()
    {
        return $this->createdByUser ? $this->createdByUser->name : null;
    }
}
