<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;

class TreatmentHistoryFilter extends ApiFilter
{
    // Các tham số an toàn có thể lọc
    protected $safeParams = [
        'customer_id' => ['eq'],
        'staff_id' => ['eq'],
        'status' => ['eq'],
        'evaluete' => ['eq', 'lt', 'gt'],
        'created_at' => ['eq', 'lt', 'gt', 'between'],
        'updated_at' => ['eq', 'lt', 'gt', 'between'],
    ];

    // Map tên cột nếu khác với request params
    protected $columnMap = [
        'customer_id' => 'customer_id',
        'staff_id' => 'staff_id',
        'status' => 'status',
        'evaluete' => 'evaluete',
        'created_at' => 'created_at',
        'updated_at' => 'updated_at',
    ];

    // Map toán tử với ký hiệu tương ứng
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'like' => 'LIKE',
        'between' => 'BETWEEN',
    ];

    // Mặc định sắp xếp
    protected $sortParams = [
        'sort_by' => 'created_at',
        'sort_order' => 'desc',
    ];

    // Định nghĩa quan hệ để lọc
    protected $relationMap = [
        'created_by' => [
            'full_name' => 'like',
            'email' => 'like',
        ],
        'updated_by' => [
            'full_name' => 'like',
            'email' => 'like',
        ],
    ];
}
