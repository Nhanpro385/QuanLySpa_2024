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
        'created_by',
        'updated_by',
    ];
    public function service()
    {
        return $this->belongsTo(Service::class, 'services_id', 'id');
    }
}
