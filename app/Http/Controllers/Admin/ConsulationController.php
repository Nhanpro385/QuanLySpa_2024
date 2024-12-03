<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\ConsulationFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Consulations\ConsulationUpdateRequest;
use App\Http\Resources\Admin\Consulations\ConsulationCollection;
use App\Http\Resources\Admin\Consulations\ConsulationResource;
use App\Mail\ConsulationCustomerMail;
use App\Models\Consulation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ConsulationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new ConsulationFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }

            $selectedColumns = [
                'id',
                'customer_id',
                'staff_id',
                'consulation',
                'skin_condition',
                'treatment_plan',
                'status',
                'created_by',
                'updated_by',
            ];
            $query = Consulation::select($selectedColumns)->where($queryItems);
            if ($request['search']) {
                $value = $request['search'];
                $query->whereHas('customer', function (Builder $query) use ($value) {
                    $query->where('full_name', 'like', '%' . $value . '%')
                        ->orWhere('phone', 'like', '%' . $value . '%')
                        ->orWhere('email', 'like', '%' . $value . '%');
                })->orWhere('created_at', 'like', '%' . $value . '%')
                ;
            }

            foreach ($queryResult['relations'] as $relationFilter) {
                [$relation, $column, $operator, $value] = $relationFilter;
                $query->whereHas($relation, function (Builder $query) use ($column, $operator, $value) {
                    $query->where($column, $operator, "%" . $value . "%");
                });
            }

            if ($sorts) {
                $query = $query->orderBy('status', 'asc')->orderBy($sorts[0], $sorts[1]);
            }

            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }

            return new ConsulationCollection($query->paginate($perPage));
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $updated_by = auth('api')->user()->id;
            $consulation = Consulation::find($id);

            if (!$consulation) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $consulation->update([
                'updated_by' => $updated_by
            ]);
            $consulation->delete();
            $arr = [
                'status' => 'success',
                'message' => 'Xóa thành công tư vấn.',
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xóa.',
            ];
            return response()->json($arr, 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $consulationData = Consulation::findOrFail($id);

            if (!$consulationData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết thông tin tư vấn',
                'data' => new ConsulationResource($consulationData)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ConsulationUpdateRequest $request, string $id)
    {
        try {
            $validateData = $request->validated();
            $consulation = Consulation::find($id);
            if (!$consulation) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            if ($consulation->status > 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không thể chỉnh sửa do cuộc tư vấn này đã kết thúc.',
                ], 404);
            }

            if ($validateData['consulation'] == "" && $validateData['treatment_plan'] == "") {
                $validateData['consulation'] = "Trống";
                $validateData['treatment_plan'] = "Trống";
            }

            $consulation->update([
                'consulation' => $validateData['consulation'],
                'skin_condition' => ($validateData['skin_condition'] == "") ? $consulation->skin_condition : $validateData['skin_condition'],
                'treatment_plan' => $validateData['treatment_plan'],
                'status' => $validateData['status'],
                'created_by' => auth('api')->user()->id,
                'updated_by' => auth('api')->user()->id,
                'staff_id' => auth('api')->user()->id,
            ]);

            $arr = [
                'status' => 'success',
                'message' => 'Chỉnh sửa thành công thông tin tư vấn ',
                'data' => new ConsulationResource($consulation)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }

    }

    public function browse(string $id)
    {
        try {
            $consulation = Consulation::find($id);
            if (!$consulation || !$consulation->customer->email) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            if ($consulation->status > 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không thể duyệt do cuộc tư vấn này đã kết thúc.',
                ], 403);
            }

            if ($consulation->status == 1) {
                return response()->json([
                    'status' => 'true',
                    'message' => 'Tham gia cuộc tư vấn này. Chuyển đến trang tư vấn trực tuyến',
                    'data' => new ConsulationResource($consulation)
                ], 200);
            }

            $email = ($consulation->customer->email);
            $full_name = ($consulation->customer->full_name ?? "SPA-ER");
            $url_consulation = env('FRONTEND_URL') . "/tuvankhachhang/videocall/" . $id;
            $time = Carbon::now()->addMinutes(30);

            $mailSend = Mail::to($email)->send(new ConsulationCustomerMail($url_consulation, $full_name, $time));

            if (!$mailSend) {
                return response()->json([
                    'status' => 'false',
                    'message' => 'Duyệt thất bại đã có lỗi xảy ra.',
                ], 403);
            }
            $consulation->update([
                'status' => 1,
                'treatment_plan' => "Tiến hành tư vấn vào lúc: " . Carbon::now()->addMinutes(30) . ' hôm nay.',
            ]);
            $arr = [
                'status' => 'success',
                'message' => 'Duyệt thành công đã gửi mail cho khách hàng yêu cầu. Chuyển đến trang tư vấn trực tuyến',
                'data' => new ConsulationResource($consulation)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }
}
