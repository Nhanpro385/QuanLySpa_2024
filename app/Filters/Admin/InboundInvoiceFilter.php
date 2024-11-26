<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;

class InboundInvoiceFilter extends ApiFilter
{
    // Danh sách các cột được phép filter
    protected $safeParams = [
        'invoice_date' => ['eq', 'like'], // Lọc theo ngày hoá đơn
        'supplier_id' => ['eq'],          // Lọc theo nhà cung cấp
        'status' => ['eq'],               // Lọc theo trạng thái
        'total_amount' => ['eq', 'lt', 'gt'], // Lọc theo tổng giá trị
    ];

    // Ánh xạ tên cột khi query
    protected $columnMap = [
        'invoice_date' => 'invoice_date',
        'supplier_id' => 'supplier_id',
        'status' => 'status',
        'total_amount' => 'total_amount',
    ];

    // Ánh xạ các toán tử
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'like' => 'LIKE',
    ];

    // Mặc định sắp xếp
    protected $sortParams = [
        'sort_by' => 'created_at',
        'sort_order' => 'desc',
    ];

    // Quan hệ cần filter
    protected $relationMap = [
        'supplier' => [ // Ánh xạ quan hệ với bảng suppliers
            'name' => 'like',
        ],
    ];
}
