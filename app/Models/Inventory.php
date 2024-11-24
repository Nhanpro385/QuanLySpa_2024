<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

class Inventory extends Model
{
    use HasFactory,HasSnowflakePrimary;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'inventories';

    protected $fillable = [
        'id',
        'product_id',
        'quantity',
        'created_by',
        'updated_by',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public static function updateOrCreateInventory(string $productId, int $quantity, ?string $userId = null)
{
    $inventory = self::firstOrNew(['product_id' => $productId]);

    if ($inventory->exists) {
        $inventory->quantity += $quantity;
    } else {
        $inventory->quantity = $quantity;
        $inventory->created_by = $userId;
    }

    $inventory->updated_by = $userId;
    $inventory->save();
}

}
