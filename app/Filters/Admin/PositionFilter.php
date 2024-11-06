<?php

namespace App\Filters\Admin;
use App\Filters\ApiFilter;
use Illuminate\Http\Request;
class PositionFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'name' => ['eq', 'like'],
        'wage' => ['like'],
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
