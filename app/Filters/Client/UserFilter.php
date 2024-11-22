<?php

namespace App\Filters\Client;
use App\Filters\ApiFilter;

class UserFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'position_id' => ['eq'],
        'role' => ['eq'],
        'full_name' => ['eq', 'like'],
        'gender' => ['like'],
        'phone' => ['eq', 'like'],
        'email' => ['eq', 'like'],
        'status' => ['eq'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'name' => 'name',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'LIKE'
    ];


    protected $sortParams = [
        'sort_by' => 'created_at',
        'sort_order' => 'desc'
    ];

    protected $relationMap = [
        'shifts' => [
            'shift_date' => 'LIKE',
            'max_customers' => 'LIKE',
            'status' => 'LIKE',
            "start_time" => 'LIKE',
            "end_time" => 'LIKE'
        ],
    ];
}
