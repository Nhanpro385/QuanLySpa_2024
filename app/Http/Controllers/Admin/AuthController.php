<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\AuthLoginRequest;
use App\Http\Resources\Admin\Users\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
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
            $user = User::findOrFail($id);
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $position = $request->query('position');

            if ($position) {
                $user = User::with('position')->find($id);
            }
            $response = [
                'status' => true,
                'message' => 'Thông tin chi tiết tài khoản: ' . auth('api')->user()->name,
                'data' => new UserResource($user)
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

        return response()->json(['message' => 'Đăng xuất tài khoản thành công']);
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
            return response()->json(['message' => 'lOI ROI'], 500);
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
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ]);
    }


}
