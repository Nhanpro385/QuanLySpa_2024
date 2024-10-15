<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class CategoryFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'name' => ['eq', 'like'],
        'status' => ['eq'],
        'created_by' => ['eq'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'name' => 'name',
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
