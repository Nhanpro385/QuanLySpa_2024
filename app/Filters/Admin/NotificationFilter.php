<?php

namespace App\Filters\Admin;
use App\Filters\ApiFilter;
class NotificationFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'type' => ['eq', 'like'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'type' => 'type',
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
