<?php

namespace App\Http\Controllers\Auth\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\AuthLoginRequest;
use App\Http\Requests\Client\Auth\AuthRegisterRequest;
use App\Http\Resources\Admin\Customers\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Kra8\Snowflake\Snowflake;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthCustomerController extends Controller
{
    public function login(AuthLoginRequest $request)
    {
        $validateData = $request->validated();

        $credentials = $validateData;

        if (!$token = auth('customer_api')->attempt($credentials)) {
            $response = [
                'status' => 'error',
                'message' => 'Đăng nhập thất bại do thông tin tài khoản không chính xác.',
            ];
            return response()->json($response, 401);
        }

        $refeshToken = $this->createReferchToken();
        return $this->respondWithToken($token, $refeshToken);
    }

    public function register(AuthRegisterRequest $request)
    {
        $validateData = $request->validated();

        $customer = new Customer;
        $customer->id = app(Snowflake::class)->next();
        $customer->full_name = $validateData['full_name'];
        $customer->email = $validateData['email'];
        $customer->phone = $validateData['phone'];
        $customer->password = $validateData['password'];
        $customer->save();

        $credentials = [
            'email' => $customer->email,
            'password' => $validateData['password'],
        ];


        if (!$token = auth('customer_api')->attempt($credentials)) {
            $response = [
                'status' => 'error',
                'message' => 'Đăng ký thất bại do thông tin tài khoản không chính xác.',
            ];
            return response()->json($response, 401);
        }

        $refeshToken = $this->createReferchToken();
        return $this->respondWithToken($token, $refeshToken);
    }

    public function me(Request $request)
    {
        try {
            $id = auth('customer_api')->user()->id;
            $customer = Customer::find($id);
            if (!$customer) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $response = [
                'status' => true,
                'message' => 'Thông tin chi tiết tài khoản: ' . auth('customer_api')->user()->full_name,
                'data' => new CustomerResource(resource: $customer)
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
        auth('customer_api')->logout();

        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất tài khoản thành công'
        ]);
    }

    private function createReferchToken()
    {
        $data = [
            'user_id' => auth('customer_api')->user()->id,
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
            'expires_in' => auth('customer_api')->factory()->getTTL() * 360,
        ]);
    }
}

