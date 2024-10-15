<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class SupplierFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'name' => ['eq', 'like'],
        'country' => ['eq', 'like'],
        'contact_email' => ['eq', 'like'],
        'code' => ['eq', 'like'],
        'created_by' => ['eq'],

    ];

    protected $columnMap = [
        'id' => 'id',
        'name' => 'name',
        'country' => 'country',
        'contact_email' => 'contact_email',
        'code' => 'code',
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
