<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);  // Sử dụng các phương thức từ BaseRepository
    }

    public function register(array $data)
    {
        // Thực hiện xác thực trước khi tạo user
        $validator = Validator::make($data, [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Mã hóa mật khẩu
        $data['password'] = Hash::make($data['password']);

        // Sử dụng phương thức create từ BaseRepository
        return $this->create($data);
    }

    public function login(array $credentials)
    {
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Tạo token sau khi đăng nhập thành công (giả sử dùng Laravel Passport)
        $user = Auth::user();
        $token = $user->createToken('Personal Access Token')->accessToken;

        return ['token' => $token, 'user' => $user];
    }

    public function logout()
    {
        $user = Auth::user();
        // Hủy token của người dùng đang đăng nhập
        $user->token()->revoke();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
