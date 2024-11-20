<?php

namespace App\Http\Controllers\Auth\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\PasswordResetLinkRequest;
use App\Models\Customer;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(PasswordResetLinkRequest $request)
    {
        $validateDate = $request->validated();

        $phone = $validateDate['phone'];
        $email = $validateDate['email'];

        $query = Customer::where('phone', '=', $phone)->where('email', '=', $email)->count();
        if ($query <= 0) {
            return response()->json([
                'status' => 'error',
                'messages' => 'Không tìm thấy tài khoản có các dữ liệu tương ứng trong hệ thống.'
            ]);
        }

        $status = Password::broker('customers')->sendResetLink(
            $request->only('email')
        );

        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
                'message' => 'Có lẽ email xác nhận đã được gửi. Vui lòng kiểm tra email hoặc chờ ít phút.'
            ]);
        }

        return response()->json([
            'status' => __($status),
            'message' => 'Đã gửi email giúp xác nhận tài khoản.'
        ]);
    }
}
