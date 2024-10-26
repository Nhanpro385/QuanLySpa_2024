<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class CommentFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'service_id' => ['eq'],
        'customer_id' => ['eq'],
        'parent_comment_id' => ['eq'],
        'status' => ['eq'],
        'created_at' => ['eq', 'lt', 'lte', 'gt', 'gte'], 
    ];

    protected $columnMap = [
        'id' => 'id',
        'service_id' => 'service_id',
        'customer_id' => 'customer_id',
        'parent_comment_id' => 'parent_comment_id',
        'status' => 'status',
        'created_at' => 'created_at',
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
        'sort_order' => 'asc',
    ];
}
