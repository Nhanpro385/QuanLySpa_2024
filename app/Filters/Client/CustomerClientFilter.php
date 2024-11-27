<?php

namespace App\Filters\Client;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class CustomerClientFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'full_name' => ['eq', 'like'],
        'email' => ['eq', 'like'],
        'gender' => ['eq'],
        'phone' => ['eq', 'like'],
        'address' => ['eq', 'like'],
        'date_of_birth' => ['eq', 'gte', 'lte'],
        'status' => ['eq'],
        'created_by' => ['eq'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'full_name' => 'full_name',
        'email' => 'email',
        'gender' => 'gender',
        'phone' => 'phone',
        'address' => 'address',
        'date_of_birth' => 'date_of_birth',
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
        'sort_by' => 'full_name',
        'sort_order' => 'asc',
    ];

    public function apply(Request $request, $query)
    {

        if ($request->has('search')) {
            $search = $request->input('search');
            $searchTerms = preg_split('/[\s,]+/', $search);

            $query->where(function($query) use ($searchTerms) {
                foreach ($searchTerms as $term) {
                    $query->orWhere('id', 'LIKE', "%$term%")
                          ->orWhere('full_name', 'LIKE', "%$term%")
                          ->orWhere('phone', 'LIKE', "%$term%")
                          ->orWhere('email', 'LIKE', "%$term%")
                          ->orWhere('address', 'LIKE', "%$term%");
                }
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


            if (array_key_exists($sortBy, $this->columnMap)) {
                $query->orderBy($this->columnMap[$sortBy], $sortOrder);
            } else {

                $query->orderBy($this->columnMap['full_name'], 'asc');
            }
        }

        return $query;
    }
}
