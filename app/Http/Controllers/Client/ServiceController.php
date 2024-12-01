<?php

namespace App\Http\Controllers\Client;

use App\Filters\Client\ServiceFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Client\Services\ServiceCollection;
use App\Http\Resources\Client\Services\ServiceResource;
use App\Models\Service;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new ServiceFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }

            $selectedColumns = ["*"];
            $query = Service::select($selectedColumns)->where($queryItems)->where('status', 1)->orderBy('priority', 'asc');

            if ($request['search']) {
                $value = $request['search'];
                $query->whereHas('serviceCategory', function (Builder $query) use ($value) {
                    $query->where('name', 'like', '%' . $value . '%');
                })
                    ->orWhere('name', 'like', '%' . $value . '%')
                    ->orWhere('id', 'like', '%' . $value . '%')
                ;
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
            return new ServiceCollection($query->paginate($perPage)->appends($request->query()));
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
            $query = Service::query();

            $query = $query->find($id);

            if (!$query) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết dịch vụ: ' . $query->name,
                'data' => new ServiceResource($query)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
            ];
            return response()->json($arr, 500);
        }
    }



}
