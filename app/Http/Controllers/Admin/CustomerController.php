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

class CustomerController extends Controller
{
    public function index()
    {
        try {
            $customers = Customer::paginate(5);
            return new CustomerCollection($customers);
        } catch (\Throwable $th) {
            return $this->errorResponse('Đã xảy ra lỗi trong quá trình xử lý.', $th);
        }
    }

    public function show($id)
    {
        try {
            $customer = Customer::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết khách hàng: ' . $customer->full_name,
                'data' => new CustomerResource($customer),
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


            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $customer = Customer::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới khách hàng thành công',
                'data' => new CustomerResource($customer),
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

           
            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $customer->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật khách hàng thành công!',
                'data' => new CustomerResource($customer),
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

    private function errorResponse($message, $exception)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'error' => $exception->getMessage(),
        ], 500);
    }
}
