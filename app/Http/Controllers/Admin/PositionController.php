<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\PositionFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Positions\PositionRequest;
use App\Http\Requests\Admin\Positions\PositionUpdateRequest;
use App\Http\Resources\Admin\Positions\PositionConllection;
use App\Http\Resources\Admin\Positions\PositionResource;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new PositionFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }
            $query = Position::where($queryItems);

            if ($request['search']) {
                $value = $request['search'];
                $query
                    ->orWhere('name', 'like', '%' . $value . '%')
                    ->orWhere('id', 'like', '%' . $value . '%');
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
            return new PositionConllection($query->paginate($perPage)->appends($request->query()));
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(PositionRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $position = Position::create($validatedData);
            $response = [
                'status' => 'success',
                'message' => 'Thêm mới vai trò thành công.',
                'data' => new PositionResource($position)
            ];

            return response()->json($response);
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
    public function show(string $id)
    {
        try {
            $users = request()->query('users');

            $position = Position::find($id);

            if ($users) {
                $position->loadMissing('users');
            }


            if (!$position) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết loại dịch vụ: ' . $position->name,
                'data' => new PositionResource($position)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PositionUpdateRequest $request, string $id)
    {
        try {
            $position = Position::find($id);
            if (!$position) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $validator = $request->validated();
            $position->update($validator);
            $arr = [
                'status' => 'success',
                'message' => 'Chỉnh sửa thành công loại dịch vụ: ' . $position->name,
                'data' => new PositionResource($position)
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $position = Position::find($id);


            if (!$position) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $position->delete();
            $arr = [
                'status' => 'success',
                'message' => 'Xóa thành công vai trò: ' . $position->name,
            ];
            return response()->json($arr);

        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xoá.',
            ];
            return response()->json($arr, 500);
        }
    }
}
