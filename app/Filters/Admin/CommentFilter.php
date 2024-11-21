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

    public function apply(Request $request, $query)
    {

        $query->with(['customer', 'service']);

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where(function($query) use ($search) {
                $query->where('id', 'LIKE', "%$search%")
                      ->orWhere('content', 'LIKE', "%$search%")
                      ->orWhereHas('customer', function($q) use ($search) {
                          $q->where('name', 'LIKE', "%$search%");
                      })
                      ->orWhereHas('service', function($q) use ($search) {
                          $q->where('name', 'LIKE', "%$search%");
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
                            $query->where($column, $operatorSymbol, "%$value%");
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
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy($this->sortParams['sort_by'], $this->sortParams['sort_order']);
        }

        return $query;
    }

}
