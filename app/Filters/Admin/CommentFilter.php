<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class CommentFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
        'content' => ['eq', 'like'],
        'status' => ['eq'],
        'created_by' => ['eq'],
        'updated_by' => ['eq'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'content' => 'content',
        'status' => 'status',
        'created_by' => 'created_by',
        'updated_by' => 'updated_by',
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
                      ->orWhere('status', 'LIKE', "%$search%");
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
        }

        return $query;
    }
}
