<?php

namespace App\Http\Controllers\Auth\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\NewPasswordRequest;
use App\Models\Customer;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(NewPasswordRequest $request)
    {
        $validateData = $request->validated();

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::broker('customers')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (Customer $customer) use ($request) {
                $customer->forceFill([
                    'password' => Hash::make($request->string('password')),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($customer));
            }
        );


        if ($status !== Password::PASSWORD_RESET) {
            $errorMessage = $status === Password::INVALID_TOKEN
                ? 'Token không hợp lệ. Vui lòng thử lại với token hợp lệ.'
                : 'Đã xảy ra lỗi, vui lòng thử lại sau.';

            return response()->json(['status' => __($status), 'message' => $errorMessage]);
        }

        return response()->json(['status' => __($status), 'message' => 'Mật khẩu mới đã được cập nhật thành công vui lòng đến trang đăng nhập.']);
    }
}
