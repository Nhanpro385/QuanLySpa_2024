<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Http\Requests\Admin\Customers\CustomerRequest;
use App\Http\Requests\Admin\Customers\CustomerUpdateRequest;
use App\Http\Resources\Admin\Customers\CustomerResource;
use App\Http\Resources\Admin\Customers\CustomerCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function index()
{
    try {
        $customers = Customer::with(['createdBy', 'updatedBy'])->paginate(5);
        return response()->json([
            'status' => 'success',
            'message' => 'Xem danh sách khách hàng!',
            'data' => new CustomerCollection($customers),
        ]);
    } catch (\Throwable $th) {
        return $this->errorResponse('Đã xảy ra lỗi trong quá trình xử lý.', $th);
    }
}


    public function show($id)
    {
        try {
            $customer = Customer::with(['createdBy', 'updatedBy'])->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết khách hàng: ' . $customer->full_name,
                'data' => [
                    'id' => $customer->id,
                    'full_name' => $customer->full_name,
                    'gender' => $this->getGenderText($customer->gender),
                    'contact_email' => $customer->email ?? 'gmail',
                    'phone' => $customer->phone ?? 'phone',
                    'date_of_birth' => $customer->date_of_birth,
                    'address' => $customer->address,
                    'created_by' => $this->formatUserRole($customer->createdBy),
                    'updated_by' => $customer->updatedBy ? $this->formatUserRole($customer->updatedBy) : null,
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

    public function store(CustomerRequest $request)
    {
        try {
            $validatedData = $request->validated();

            // Mã hóa mật khẩu
            if (!isset($validatedData['password'])) {
                $validatedData['password'] = $this->generateRandomPassword();
            } else {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            // Ánh xạ giá trị giới tính
            $this->mapGender($validatedData);

            // Thêm thông tin người tạo
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = null;

            $customer = Customer::create($validatedData);

            // Lấy thông tin người tạo
            $creator = $customer->createdBy;

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới khách hàng thành công',
                'data' => [
                    'id' => $customer->id,
                    'full_name' => $customer->full_name,
                    'gender' => $this->getGenderText($customer->gender),
                    'contact_email' => $customer->email ?? 'gmail',
                    'phone' => $customer->phone ?? 'phone',
                    'date_of_birth' => $customer->date_of_birth,
                    'address' => $customer->address,
                    'created_by' => $this->formatUserRole($creator),
                    'updated_by' => null,
                    'created_at' => now()->format('d-m-Y H:i'),
                    'updated_at' => now()->format('d-m-Y H:i'),
                ],
            ], 201);
        } catch (\Throwable $th) {
            return $this->errorResponse('Đã xảy ra lỗi trong quá trình thêm mới khách hàng.', $th);
        }
    }

    public function update(CustomerUpdateRequest $request, $id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $validatedData = $request->validated();

            // Mã hóa mật khẩu nếu có
            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            // Ánh xạ giá trị giới tính
            $this->mapGender($validatedData);

            // Thêm thông tin người cập nhật
            $validatedData['updated_by'] = Auth::id();

            $customer->update($validatedData);

            // Lấy thông tin chi tiết của khách hàng sau khi cập nhật
            $customer->load(['createdBy', 'updatedBy']);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật khách hàng thành công!',
                'data' => [
                    'id' => $customer->id,
                    'full_name' => $customer->full_name,
                    'gender' => $this->getGenderText($customer->gender),
                    'contact_email' => $customer->email ?? 'gmail',
                    'phone' => $customer->phone ?? 'phone',
                    'date_of_birth' => $customer->date_of_birth,
                    'address' => $customer->address,
                    'created_by' => $this->formatUserRole($customer->createdBy),
                    'updated_by' => $customer->updatedBy ? $this->formatUserRole($customer->updatedBy) : null,
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

    public function destroy($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $customer->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Khách hàng đã được xóa thành công',
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

    private function formatUserRole($user)
    {
        return [
            'id' => $user->id,
            'full_name' => $user->full_name,
            'role' => $this->getRoleText($user->role),
        ];
    }

    private function getRoleText($role)
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

    private function getGenderText($gender)
    {
        switch ($gender) {
            case 1:
                return 'Nam';
            case 2:
                return 'Nữ';
            case 3:
                return 'Khác';
            default:
                return 'Không xác định';
        }
    }

    private function generateRandomPassword($length = 8)
    {
        return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / 62))), 1, $length);
    }

    private function errorResponse($message, $exception = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'error' => $exception ? $exception->getMessage() : null,
        ], 500);
    }
}
