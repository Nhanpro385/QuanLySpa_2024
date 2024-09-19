<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Position extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $id = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'wage',
        'note',
    ];

    public function staffs(): HasMany
    {
        return $this->hasMany(Staff::class);
    }

}
