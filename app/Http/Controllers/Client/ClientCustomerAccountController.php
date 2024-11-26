<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\ClientCustomerUpdateRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientCustomerAccountController extends Controller
{
    // Xem thông tin tài khoản của khách hàng đã đăng nhập
    public function viewProfile()
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
            'message' => 'Thông tin tài khoản',
            'data' => $customer,  // Trả về thông tin chi tiết của khách hàng
        ]);
    }

    // Cập nhật thông tin khách hàng đã đăng nhập
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

    // Nếu mật khẩu được cập nhật, hash lại mật khẩu
    if (isset($validated['password'])) {
        $validated['password'] = Hash::make($validated['password']);
    } else {
        unset($validated['password']);
    }

    // Loại bỏ các trường không được phép cập nhật
    $fieldsToRemove = ['id', 'created_at', 'updated_at', 'created_by', 'updated_by'];
    $validated = array_diff_key($validated, array_flip($fieldsToRemove));

    try {
        // Cập nhật thông tin khách hàng
        $customer->fill($validated);
        $customer->save();
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
        'data' => $customer,  // Trả về thông tin khách hàng đã cập nhật
    ]);
}



    // Thay đổi mật khẩu cho khách hàng đã đăng nhập
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

        // Cập nhật mật khẩu mới
        $customer->update(['password' => Hash::make($request->new_password)]);

        return response()->json([
            'status' => 'success',
            'message' => 'Đổi mật khẩu thành công!',
        ]);
    }
}
