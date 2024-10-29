<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'comments';

    protected $fillable = [
        'id',
        'service_id',
        'customer_id',
        'parent_comment_id',
        'comment',
        'rate',
        'status',
        'created_by',
        'updated_by',
        'image_url',
        'type'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    // Quan hệ 1-nhiều với các cmt phản hồi
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id', 'id');
    }

    // Quan hệ cmt cha
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id', 'id');
    }
}
