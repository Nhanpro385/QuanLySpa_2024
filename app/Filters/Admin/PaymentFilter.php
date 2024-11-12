<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class PaymentFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'promotion_id' => ['eq', 'like'],
        'appointment_id' => ['eq', 'like'],
        'service_total' => ['eq', 'like'],
        'product_total' => ['eq', 'like'],
        'subtotal' => ['eq', 'like'],
        'reduce' => ['eq', 'like'],
        'total_amount' => ['eq', 'like'],
        'payment_type' => ['eq', 'like'],
        'status' => ['eq', 'like'],
        'created_by' => ['eq', 'like'],

    ];

    protected $columnMap = [
        'id' => 'id',
        'promotion_id' => 'promotion_id',
        'appointment_id' => 'appointment_id',
        'service_total' => 'service_total',
        'product_total' => 'product_total',
        'subtotal' => 'subtotal',
        'reduce' => 'reduce',
        'total_amount' => 'total_amount',
        'payment_type' => 'payment_type',
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
        'sort_by' => 'created_at',
        'sort_order' => 'desc',
    ];

    protected $relationMap = [];

}
