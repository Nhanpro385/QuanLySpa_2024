<?php

namespace App\Filters\Admin;
use App\Filters\ApiFilter;
use Illuminate\Http\Request;
class ProductFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'position_id' => ['eq'],
        'role' => ['eq'],
        'name' => ['eq', 'like'],
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
        'sort_by' => 'id',
        'sort_order' => 'asc'
    ];
}
