<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;
    use SoftDeletes;

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
        'image_url'
    ];


    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }


    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
}
