<?php

namespace App\Filters\Client;
use App\Filters\ApiFilter;
class ServiceFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'name' => ['eq', 'like'],
        'service_category_id' => ['eq', 'like'],
        'price' => ['eq', 'gte', 'lte'],
        'status' => ['eq']
    ];

    protected $columnMap = [
        'id' => 'id',
        'name' => 'name',
        'price' => 'price',
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
        'sort_by' => 'priority',
        'sort_order' => 'asc'
    ];
}
