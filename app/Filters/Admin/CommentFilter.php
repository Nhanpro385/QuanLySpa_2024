<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class CommentFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'comment' => ['eq', 'like'],
        'status' => ['eq'],
        'created_by' => ['eq'],
        'updated_by' => ['eq'],
        'customer_name' => ['like'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'comment' => 'comment',
        'status' => 'status',
        'created_by' => 'created_by',
        'updated_by' => 'updated_by',
        'customer_name' => 'customer.name',
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

    public function apply(Request $request, $query)
    {

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($query) use ($search) {
                $query->where('id', 'LIKE', "%$search%")
                      ->orWhere('comment', 'LIKE', "%$search%")
                      ->orWhere('status', 'LIKE', "%$search%")
                      ->orWhereHas('customer', function ($query) use ($search) {
                          $query->where('full_name', 'LIKE', "%$search%");
                      });
            });
        }

        foreach ($this->safeParams as $param => $operators) {
            if ($request->has($param)) {
                $value = $request->input($param);
                foreach ($operators as $operator) {
                    if (array_key_exists($operator, $this->operatorMap)) {
                        $column = $this->columnMap[$param];
                        $operatorSymbol = $this->operatorMap[$operator];

                        if ($operator == 'like') {
                            if ($param === 'customer_name') {
                                $query->whereHas('customer', function ($query) use ($column, $operatorSymbol, $value) {
                                    $query->where('full_name', $operatorSymbol, "%$value%");
                                });
                            } else {
                                $query->where($column, $operatorSymbol, "%$value%");
                            }
                        } else {
                            $query->where($column, $operatorSymbol, $value);
                        }
                    }
                }
            }
        }

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $sortBy = $request->input('sort_by');
            $sortOrder = $request->input('sort_order');

            if (array_key_exists($sortBy, $this->columnMap)) {
                $query->orderBy($sortBy, $sortOrder);
            } else {
                $query->orderBy($this->sortParams['sort_by'], $this->sortParams['sort_order']);
            }
        }

        return $query;
    }
}
