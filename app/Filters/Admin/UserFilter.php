<?php

namespace App\Filters\Admin;
use App\Filters\ApiFilter;
use Illuminate\Http\Request;
class UserFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
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
        'sort_by' => 'created_at',
        'sort_order' => 'desc'
    ];
}
