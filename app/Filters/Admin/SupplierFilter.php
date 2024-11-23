<?php

namespace App\Filters\Admin;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class SupplierFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq', 'like'],
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

    public function apply(Request $request, $query)
    {
        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where(function ($query) use ($search) {
                $query->where('id', 'LIKE', "%$search%")
                      ->orWhere('name', 'LIKE', "%$search%")
                      ->orWhere('country', 'LIKE', "%$search%")
                      ->orWhere('contact_email', 'LIKE', "%$search%")
                      ->orWhere('code', 'LIKE', "%$search%");
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

        $sortBy = $request->input('sort_by', $this->sortParams['sort_by']);
        $sortOrder = $request->input('sort_order', $this->sortParams['sort_order']);
        $query->orderBy($sortBy, $sortOrder);

        return $query;
    }

}
