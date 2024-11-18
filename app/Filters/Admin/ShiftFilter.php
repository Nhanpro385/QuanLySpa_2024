<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;

class ShiftFilter extends ApiFilter
{
    protected $safeParams = [
        'shift_date' => ['eq', 'like'],
        'start_time' => ['eq', 'lt', 'gt'],
        'end_time' => ['eq', 'lt', 'gt'],
        'status' => ['eq'],
        'max_customers' => ['eq', 'lt', 'gt'],
    ];


    protected $columnMap = [
        'shift_date' => 'shift_date',
        'start_time' => 'start_time',
        'end_time' => 'end_time',
        'status' => 'status',
        'max_customers' => 'max_customers',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'like' => 'LIKE',
    ];

    protected $sortParams = [
        'sort_by' => 'created_at',
        'sort_order' => 'desc',
    ];

    protected $relationMap = [
        'created_by' => [
            'full_name' => 'like',
            'email' => 'like',
        ],
    ];
}
