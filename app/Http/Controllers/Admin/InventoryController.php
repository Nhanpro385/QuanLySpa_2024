<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Http\Resources\Admin\Inventories\InventoryResource;



class InventoryController extends Controller
{
    public function index(Request $request)

    {
        $perPage = $request->input('perPage', 10);
        $inventories = Inventory::with(['product', 'createdBy', 'updatedBy'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return InventoryResource::collection($inventories);
    }

    /**
     * Hiển thị chi tiết một inventory.
     */
    public function show($id)
    {
        $inventory = Inventory::with(['product', 'createdBy', 'updatedBy'])->findOrFail($id);

        return new InventoryResource($inventory);
    }

    /**
     * Hiển thị lịch sử thay đổi inventory của một sản phẩm.
     */
    public function history($productId)
    {
        $history = Inventory::getInventoryHistory($productId);

        return InventoryResource::collection($history);
    }
}
