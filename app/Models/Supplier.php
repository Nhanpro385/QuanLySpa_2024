<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;

class Supplier extends Model
{
    use HasFactory, HasSnowflakePrimary;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'suppliers';

    protected $fillable = [
        'id',
        'name',
        'country',
        'contact_email',
        'code',
        'created_by',
        'updated_by',
    ];


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    
    public function inboundInvoice()
    {
        return $this->hasMany(InboundInvoice::class, 'supplier_id', 'id');
    }


}
