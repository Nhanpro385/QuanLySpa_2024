<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TreatmentProduct extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'treatment_products';

    protected $fillable = [
        'id',
        'treatment_history_id',
        'product_id',
        'quantity_used'
    ];
    public function treatmentHistory()
    {
        return $this->belongsTo(TreatmentHistory::class, 'treatment_historie_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id');
    }

}
