<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class AppointmentFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'shift_id' => ['eq', 'like'],
        'customer_id' => ['eq', 'like'],
        'start_time' => ['eq'],
        'appointment_date' => ['eq'],
        'status' => ['eq'],
        'created_by' => ['eq', 'like'],

    ];

    protected $columnMap = [
        'id' => 'id',
        'shift_id' => 'shift_id',
        'customer_id' => 'customer_id',
        'start_time' => 'start_time',
        'appointment_date' => 'appointment_date',
        'status' => 'status',
        'created_by' => 'created_by',

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
        'shift' => [
            'shift_date' => 'LIKE',
            'max_customers' => 'LIKE'
        ],
        'services' => [
            'name' => 'LIKE',
        ],
    ];
}
