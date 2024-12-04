<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;
    use SoftDeletes;


    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'comments';
    protected $casts = [
        'id' => 'string',
        'service_id' => 'string',
        'customer_id' => 'string',
        'parent_comment_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];

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


    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id', 'id');
    }


    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function updatedByUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function images()
    {
        return $this->hasMany(CommentImage::class, 'comment_id', 'id');
    }

    public function clientReplies()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id', 'id')->where('status',1);
    }
    protected static function boot()
    {

        parent::boot();
        //parent_comment

        static::deleting(function ($parent_comment) {
            Comment::where('parent_comment_id', $parent_comment->id)->update(['parent_comment_id' => null]);
        });

        static::softDeleted(function ($parent_comment) {

            Comment::where('parent_comment_id', $parent_comment->id)->update(['parent_comment_id' => null]);
        });

         //CommentImage

         static::deleting(function ($commentImage) {
            CommentImage::where('comment_id', $commentImage->id)->update(['comment_id' => null]);
        });

        static::softDeleted(function ($commentImage) {

            CommentImage::where('comment_id', $commentImage->id)->update(['comment_id' => null]);
        });
    }

}
