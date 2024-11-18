<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\UserFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Users\UserRequest;
use App\Http\Requests\Admin\Users\UserUpdateRequest;
use App\Http\Resources\Admin\Users\UserConllection;
use App\Http\Resources\Admin\Users\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
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

            $selectedColumns = ['id', 'full_name', 'address', 'position_id', 'phone', 'status', 'email', 'role'];
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
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {

            $validatorData = $request->validated();
            $validatorData['password'] = Hash::make(Str::random(8));

            $user = User::create([
                'id' => $validatorData['id'],
                'position_id' => $validatorData['position_id'],
                'password' => $validatorData['password'],
                'role' => $validatorData['role'],
                'full_name' => $validatorData['full_name'],
                'gender' => $validatorData['gender'],
                'phone' => $validatorData['phone'],
                'email' => $validatorData['email'],
                'address' => $validatorData['address'],
                'date_of_birth' => $validatorData['date_of_birth'],
                'note' => $validatorData['note'],
                'created_by' => auth('api')->user()->id
            ]);

            $response = [
                "status" => "success",
                "message" => "Thêm mới nhân viên thành công.",
                "data" => new UserResource($user),
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới nhân viên.',
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
            $userData = User::findOrFail($id);

            $position = $request->query('position');
            if ($position) {
                $userData = User::with('position')->findOrFail($id);
            }
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


    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, UserUpdateRequest $request)
    {
        try {

            $user = User::find($id);
            $updated_by = auth('api')->user()->id;
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $validatorData = $request->validated();

            $user->update($validatorData);
            $user->update([
                'updated_by' => $updated_by
            ]);
            $arr = [
                'status' => 'success',
                'message' => 'Chỉnh sửa thành công thông tin nhân viên: ' . $user->full_name,
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
    public function destroy(string $id, Request $request)
    {
        try {
            $updated_by = auth('api')->user()->id;
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            if ($user->id === $updated_by) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không thể xóa chính bản thân.',
                ], 404);
            }

            $user->update([
                'updated_by' => $updated_by
            ]);
            $user->delete();
            $arr = [
                'status' => 'success',
                'message' => 'Xóa thành công nhân viên: ' . $user->full_name,
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
