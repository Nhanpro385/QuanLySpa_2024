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
    protected $casts = [
        'id' => 'string',
        'product_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
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

    public static function logInventoryChange(string $productId, int $quantityChange, string $userId)
    {
        // Tạo dòng mới trong bảng inventory để ghi nhận thay đổi
        self::create([
            'product_id' => $productId,
            'quantity' => $quantityChange,
            'created_by' => $userId,
            'updated_by' => $userId,
        ]);
    }
    public static function getCurrentQuantity(string $productId): int
    {
        $latestInventory = self::where('product_id', $productId)
            ->latest('created_at') // Sắp xếp theo thời gian tạo mới nhất
            ->first();
    
        return $latestInventory?->quantity ?? 0;
    }
    public static function getInventoryHistory(string $productId)
    {
        return self::where('product_id', $productId)
            ->orderBy('created_at', 'asc') // Sắp xếp từ cũ đến mới
            ->get();
    }
            
}
