<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\UserFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Users\UserRequest;
use App\Http\Requests\Admin\Users\UserUpdateRequest;
use App\Http\Resources\Admin\Users\UserConllection;
use App\Http\Resources\Admin\Users\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
            $query = User::select([
                'id',
                'position_id',
                'name',
                'role',
                'full_name',
                'gender',
                'phone',
                'email',
                'status'
            ])->where($queryItems);
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
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            $validatorData = $request->validated();
            //Mã hóa mật khẩu.
            $validatorData['password'] = Hash::make(12345678);
            $user = User::create($validatorData);
            $response = [
                "status" => "success",
                "message" => "Thêm mới nhân viên thành công.",
                "data" => new UserResource($user),
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới loại dịch vụ.',
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
            $userData = User::find($id);

            if (!$userData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết thông tin nhân viên: ' . $userData->name,
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


    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, UserUpdateRequest $request)
    {
        try {

            $user = User::findOrFail($id);
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $validator = $request->validated();
            $user->update($validator);
            $arr = [
                'status' => 'success',
                'message' => 'Chỉnh sửa thành công thông tin nhân viên: ' . $user->name,
                'data' => new UserResource(resource: $user)
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
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $user->delete();
            $arr = [
                'status' => 'success',
                'message' => 'Xóa thành công nhân viên: ' . $user->name,
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xóa.',
            ];
            return response()->json($arr, 500);
        }
    }
}