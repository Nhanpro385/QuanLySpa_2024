<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
class ApiFilter
{
    protected $safeParams = [];

    protected $columnMap = [];

    protected $operatorMap = [];

    protected $sortParams = [];

    protected $relationMap = [];

    public function transform(Request $request)
    {
        $eloQuery = [];
        foreach ($this->safeParams as $parm => $operators) {
            $query = $request->query($parm);
            if (!isset($query)) {
                continue;
            }
            $column = $this->columnMap[$parm] ?? $parm;
            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    $value = $query[$operator];
                    if ($operator === 'like') {
                        $value = "%$value%";
                    }
                    $eloQuery[] = [$column, $this->operatorMap[$operator], $value];
                }
            }
        }

        $relations = $this->getRelationFilters($request);
        $sorts = $this->getSorting($request);

        return ['filter' => $eloQuery, 'relations' => $relations, 'sorts' => $sorts];
    }

    protected function getRelationFilters(Request $request)
    {
        $relationFilters = [];

        foreach ($this->relationMap as $relation => $fields) {
            foreach ($fields as $field => $operator) {
                $query = $request->query($field);

                if ($query) {
                    $value = $operator === 'like' ? $query : $query;
                    $relationFilters[] = [$relation, $field, $operator, $value];
                }
            }
        }

        return $relationFilters;
    }

    protected function getSorting(Request $request)
    {
        $sortBy = $request->query('sort_by', $this->sortParams['sort_by']);
        $sortOrder = $request->query('sort_order', $this->sortParams['sort_order']);
        if (!in_array($sortOrder, ['asc', 'desc'])) {
            $sortOrder = 'asc';
        }

        return [$sortBy, $sortOrder];
    }

    public function RelationFilters($query, $relation, $column, $value)
    {
        $query->whereHas($relation, function (Builder $q) use ($column, $value) {
            $q->orWhere($column, 'like', '%' . $value . '%');
        });

        return $query;
    }
}
