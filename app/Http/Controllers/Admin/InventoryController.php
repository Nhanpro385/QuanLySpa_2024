<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Http\Resources\Admin\Inventories\InventoryHistoryCollection;

use App\Http\Resources\Admin\Inventories\InventoryHistoryResuorce;

use App\Http\Resources\Admin\Inventories\InventoryResource;
use Illuminate\Support\Facades\DB;



class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
    
        // Lấy bản ghi mới nhất của mỗi product_id
        $inventories = Inventory::select('inventories.*')
            ->with(['product', 'createdBy', 'updatedBy'])
            ->join(DB::raw('(SELECT MAX(id) as latest_id FROM inventories GROUP BY product_id) latest'), 'inventories.id', '=', 'latest.latest_id')
            ->orderBy('inventories.created_at', 'desc')
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

    public function getInventoryHistory($productId)
    {
        $histories = collect(DB::select("
    SELECT 
        'inbound' AS type, 
        iid.inbound_invoice_id AS invoice_id,
        iid.product_id,
        p.name AS product_name,
        p.bar_code AS product_barcode,
        iid.quantity_import AS quantity,
        iid.cost_import AS cost,
        NULL AS old_cost, 
        i.created_at AS date,
        i.note AS note,
        u.id AS created_by_id,
        u.full_name AS created_by_name
    FROM inbound_invoice_details AS iid
    JOIN inbound_invoices AS i ON iid.inbound_invoice_id = i.id
    LEFT JOIN products AS p ON iid.product_id = p.id
    LEFT JOIN users AS u ON i.created_by = u.id
    WHERE iid.product_id = ?

    UNION ALL

    SELECT 
        'outbound' AS type, 
        oid.outbound_invoice_id AS invoice_id,
        oid.product_id,
        p.name AS product_name,
        p.bar_code AS product_barcode,
        oid.quantity_export AS quantity,
        oid.unit_price AS cost, 
        oid.quantity_olded AS old_cost, 
        o.created_at AS date,
        o.note AS note,
        u.id AS created_by_id,
        u.full_name AS created_by_name
    FROM outbound_invoice_details AS oid
    JOIN outbound_invoices AS o ON oid.outbound_invoice_id = o.id
    LEFT JOIN products AS p ON oid.product_id = p.id
    LEFT JOIN users AS u ON o.created_by = u.id
    WHERE oid.product_id = ?
    ORDER BY date DESC
", [$productId, $productId]));

    
        return new InventoryHistoryCollection($histories);
    }
    

}
