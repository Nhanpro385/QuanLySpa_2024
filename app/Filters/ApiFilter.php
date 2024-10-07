<?php

namespace App\Filters;
use Illuminate\Http\Request;
class ApiFilter
{
    protected $safeParams = [];

    protected $columnMap = [];

    protected $operatorMap = [];

    protected $sortParams = [];


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
        $sorts = $this->getSorting($request);

        return ['filter' => $eloQuery, 'sorts' => $sorts];
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
}
