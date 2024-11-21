<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\ClientCustomerRequest;
use App\Http\Requests\Client\ClientCustomerUpdateRequest;
use App\Http\Resources\Client\ClientCustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientCustomerAccountController extends Controller
{
 
    public function store(ClientCustomerRequest $request)
    {
        $validated = $request->validated();


        if (Customer::where('email', $validated['email'])->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email đã tồn tại trong hệ thống.',
            ], 400);
        }


        $validated['password'] = Hash::make($validated['password']);


        $customer = Customer::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tạo tài khoản thành công!',
            'data' => new ClientCustomerResource($customer),
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);


        $customer = Customer::where('email', $request->email)->first();


        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Thông tin đăng nhập không chính xác.',
            ], 401);
        }


        $token = $customer->createToken('customer_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Đăng nhập thành công!',
            'data' => [
                'id' => $customer->id,
                'full_name' => $customer->full_name,
                'email' => $customer->email,
                'token' => $token,
            ],
        ]);
    }


    public function profile()
    {
        $customer = Auth::user();


        if (!$customer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vui lòng đăng nhập để xem thông tin tài khoản.',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Thông tin tài khoản khách hàng.',
            'data' => new ClientCustomerResource($customer),
        ]);
    }



    public function updateProfile(ClientCustomerUpdateRequest $request)
    {
        $customer = Auth::user();


        if (!$customer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vui lòng đăng nhập để cập nhật thông tin.',
            ], 401);
        }


        $validated = $request->validated();


        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {

            unset($validated['password']);
        }


        $fieldsToRemove = ['id', 'created_at', 'updated_at', 'created_by', 'updated_by'];
        $validated = array_diff_key($validated, array_flip($fieldsToRemove));

        try {

            $customer->update($validated);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi khi cập nhật thông tin.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật thông tin thành công!',
            'data' => new ClientCustomerResource($customer),
        ]);
    }




    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $customer = Auth::user();


        if (!$customer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vui lòng đăng nhập để đổi mật khẩu.',
            ], 401);
        }


        if (!Hash::check($request->current_password, $customer->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mật khẩu hiện tại không đúng.',
            ], 400);
        }


        $customer->update(['password' => Hash::make($request->new_password)]);

        return response()->json([
            'status' => 'success',
            'message' => 'Đổi mật khẩu thành công!',
        ]);
    }
}
