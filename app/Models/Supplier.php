<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, HasSnowflakePrimary;
    use SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $casts = [
        'id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];


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
    protected static function boot()
    {
        //InboundInvoice
        parent::boot();
        static::deleting(function ($InboundInvoice) {
            InboundInvoice::where('supplier_id', $InboundInvoice->id)->update(['supplier_id' => null]);
        });

        static::softDeleted(function ($InboundInvoice) {

            InboundInvoice::where('supplier_id', $InboundInvoice->id)->update(['supplier_id' => null]);
        });


    }

}
