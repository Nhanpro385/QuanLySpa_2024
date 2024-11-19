<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class ConsulationFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'customer_id' => ['eq', 'like'],
        'staff_id' => ['eq'],
        'status' => ['eq'],
        'created_by' => ['eq', 'like'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'customer_id' => 'customer_id',
        'staff_id' => 'staff_id',
        'consulation' => 'consulation',
        'skin_condition' => 'skin_condition',
        'treatment_plan' => 'treatment_plan',
        'status' => 'status',
        'created_by' => 'created_by',
        'updated_by' => 'updated_by',

    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'LIKE',
    ];

    protected $sortParams = [
        'sort_by' => 'created_at',
        'sort_order' => 'desc',
    ];

    protected $relationMap = [
        'customer' => [
            'full_name' => 'LIKE',
            'id' => 'LIKE',
            'phone' => 'LIKE',
            'email' => 'LIKE'
        ],
    ];
}
