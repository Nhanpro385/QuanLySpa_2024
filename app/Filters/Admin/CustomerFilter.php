<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter; 
use Illuminate\Http\Request;

class CustomerFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'full_name' => ['eq', 'like'],
        'name' => ['eq', 'like'],
        'email' => ['eq', 'like'],
        'gender' => ['eq'],
        'phone' => ['eq', 'like'],
        'address' => ['eq', 'like'],
        'date_of_birth' => ['eq', 'gte', 'lte'],
        'status' => ['eq'],
        'created_by' => ['eq'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'full_name' => 'full_name',
        'name' => 'name',
        'email' => 'email',
        'gender' => 'gender',
        'phone' => 'phone',
        'address' => 'address',
        'date_of_birth' => 'date_of_birth',
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
        'sort_by' => 'id',
        'sort_order' => 'asc',
    ];
}
