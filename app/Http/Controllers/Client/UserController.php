<?php

namespace App\Http\Controllers\Client;

use App\Filters\Client\UserFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Client\Users\UserConllection;
use App\Http\Resources\Client\Users\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new UserFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }

            $selectedColumns = ['id', 'full_name', 'address', 'position_id', 'status', 'role'];
            $query = User::select($selectedColumns)->where($queryItems);
            if ($request['search']) {
                $value = $request['search'];
                $query
                    ->where('full_name', 'like', '%' . $value . '%')
                    ->orWhere('phone', 'like', '%' . $value . '%')
                    ->orWhere('email', 'like', '%' . $value . '%');
                ;
            }

            foreach ($queryResult['relations'] as $relationFilter) {
                [$relation, $column, $operator, $value] = $relationFilter;
                $query->whereHas($relation, function (Builder $query) use ($column, $operator, $value) {
                    $query->where($column, $operator, "%" . $value . "%");
                });
            }



            if ($sorts) {
                $query = $query->orderBy($sorts[0], $sorts[1]);
            }

            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }

            return new UserConllection($query->paginate($perPage));
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        try {
            $selectedColumns = ['id', 'full_name', 'address', 'position_id', 'status', 'role'];
            $userData = User::select($selectedColumns)->findOrFail($id);

            if (!$userData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết thông tin nhân viên: ' . $userData->full_name,
                'data' => new UserResource($userData)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }

    }

}
