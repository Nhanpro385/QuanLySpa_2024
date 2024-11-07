<?php

namespace App\Filters\Admin;
use App\Filters\ApiFilter;
use Illuminate\Http\Request;
class ProductFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'category_id' => ['eq', 'like'],
        'name' => ['eq', 'like'],
        'price' => ['eq', 'like'],
        'cost' => ['eq', 'like'],
        'capacity' => ['eq', 'like'],
        'bar_code' => ['eq', 'like'],
        'date' => ['eq', 'like'],
        'priority' => ['eq', 'like'],
        'status' => ['eq', 'like'],
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
}
