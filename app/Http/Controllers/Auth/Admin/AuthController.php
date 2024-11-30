<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\AuthLoginRequest;
use App\Http\Requests\Admin\Auth\AuthResetPasswordRequest;
use App\Http\Requests\Admin\Auth\AuthUpdateRequest;
use App\Http\Resources\Admin\Users\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function login(AuthLoginRequest $request)
    {
        $validateData = $request->validated();

        $credentials = $validateData;

        if (!$token = auth('api')->attempt($credentials)) {
            $response = [
                'status' => 'error',
                'message' => 'Đăng nhập thất bại do thông tin tài khoản không chính xác.',
            ];
            return response()->json($response, 401);
        }

        $refeshToken = $this->createReferchToken();
        return $this->respondWithToken($token, $refeshToken);
    }

    public function me(Request $request)
    {
        try {
            $id = auth('api')->user()->id;
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $response = [
                'status' => true,
                'message' => 'Thông tin chi tiết tài khoản: ' . auth('api')->user()->full_name,
                'data' => new UserResource(resource: $user)
            ];
            return response()->json($response);
        } catch (JWTException $e) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất tài khoản thành công'
        ]);
    }

    public function refresh()
    {
        $refeshToken = request()->refresh_token;
        try {
            $decoded = JWTAuth::getJWTProvider()->decode($refeshToken);
            $user = User::find($decoded['user_id']);
            if (!$user) {
                return response()->json(['message' => 'User not fond']);
            }

            auth('api')->invalidate();
            $token = auth('api')->login($user);
            $refeshToken = $this->createReferchToken();

            return $this->respondWithToken($token, $refeshToken);
        } catch (JWTException $exception) {
            return response()->json(['message' => 'Đã có lỗi xảy ra.'], 500);
        }
    }

    private function createReferchToken()
    {
        $data = [
            'user_id' => auth('api')->user()->id,
            'random' => rand() . time(),
            'exp' => time() + config('jwt.refresh_ttl')
        ];

        $refeshToken = JWTAuth::getJWTProvider()->encode($data);
        return $refeshToken;
    }

    public function respondWithToken($token, $refeshToken)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refeshToken,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 360,
        ]);
    }



    public function update(AuthUpdateRequest $request)
    {
        try {
            $id = auth('api')->user()->id;
            $validateData = $request->validated();
            $user = User::findOrFail($id);
            $user->update($validateData);
            $user->update([
                'updated_by' => $id
            ]);
            $arr = [
                'status' => 'success',
                'message' => 'Chỉnh sửa thành công thông tin tài khoản: ' . $user->full_name,
                'data' => new UserResource(resource: $user)
            ];
            return response()->json($arr);
        } catch (JWTException $exception) {
            return response()->json(['message' => 'Đã có lỗi xảy ra.'], 500);
        }
    }

    public function resetPassword(AuthResetPasswordRequest $request)
    {
        $validateData = $request->validated();
        if (!Hash::check($request->current_password, auth('api')->user()->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mật khẩu cũ không khớp.'
            ], 400);
        }

        $id = auth('api')->user()->id;
        $user = User::findOrFail($id);
        $password = Hash::make($request->password);
        $resetStatus = $user->update([
            'password' => $password,
            'updated_by' => $id
        ]);


        if (!$resetStatus) {
            return response()->json([
                'status' => false,
                'message' => 'Mật khẩu không được cập nhật thành công.'
            ], 400);
        }
        auth('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Mật khẩu đã được cập nhật thành công. Yêu cầu đăng nhập lại tài khoảng.'
        ], 200);
    }

}
