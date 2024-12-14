<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Customer\CustomerClientUpdateRequest;
use App\Http\Requests\Client\Customer\PasswordUpdateRequest;
use App\Http\Resources\Client\Customer\CustomerCollection;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;



class ClientCustomerAccountController extends Controller
{

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
            'data' => new CustomerCollection([$customer])
        ]);
    }

    public function update(CustomerClientUpdateRequest $request, $id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $validatedData = $request->validated();




            $customer->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật khách hàng thành công!',
                'data' => [
                    'id' => $customer->id,
                    'full_name' => $customer->full_name,
                    'gender' => $customer->gender,
                    'contact_email' => $customer->email ?? 'gmail',
                    'phone' => $customer->phone ?? 'phone',
                    'date_of_birth' => $customer->date_of_birth,
                    'address' => $customer->address,

                    'created_at' => $customer->created_at->format('d-m-Y H:i'),
                    'updated_at' => $customer->updated_at->format('d-m-Y H:i'),
                ],
            ]);
        } catch (ModelNotFoundException $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Khách hàng không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {

            return $this->errorResponse('Đã xảy ra lỗi trong quá trình xử lý.', $th);
        }
    }

    public function updatePassword(PasswordUpdateRequest $request, $id)
    {
        $validatedData = $request->validated();

        if (!Hash::check($request->current_password, auth('customer_api')->user()->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mật khẩu cũ không khớp.'
            ], 400);
        }

        $customer = Customer::findOrFail($id);
        $password = Hash::make($request->password);
        $resetStatus = $customer->update([
            'password' => $password,
        ]);

        if (!$resetStatus) {
            return response()->json([
                'status' => false,
                'message' => 'Mật khẩu không được cập nhật thành công.'
            ], 400);
        }

        auth('customer_api')->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Mật khẩu đã được cập nhật thành công. Yêu cầu đăng nhập lại tài khoản.'
        ], 200);
    }

    protected function errorResponse($message, $th)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'error' => $th->getMessage(),
        ], 500);
    }
    private function formatUserRole($role)
    {
        switch ($role) {
            case 0:
                return 'Quản trị viên';
            default:
                return 'Nhân viên';
        }
    }

    private function mapGender(&$validatedData)
    {
        if (isset($validatedData['gender'])) {
            switch (strtolower($validatedData['gender'])) {
                case 'nam':
                    $validatedData['gender'] = 1;
                    break;
                case 'nữ':
                    $validatedData['gender'] = 2;
                    break;
                case 'khác':
                    $validatedData['gender'] = 3;
                    break;
                default:
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Giá trị của trường giới tính không hợp lệ.',
                    ], 400);
            }
        }
    }

}
