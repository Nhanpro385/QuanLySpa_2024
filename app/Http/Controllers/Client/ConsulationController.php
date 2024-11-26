<?php

namespace App\Http\Controllers\Client;


use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Consulations\ConsulationRequest;
use App\Http\Resources\Client\Consulations\ConsulationResource;
use App\Mail\BrowseConsulation;
use App\Models\Consulation;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Kra8\Snowflake\Snowflake;

class ConsulationController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function store(ConsulationRequest $request)
    {
        try {
            $validateData = $request->validated();
            $consulation = Consulation::create([
                'id' => $validateData['id'],
                'customer_id' => auth('customer_api')->user()->id,
                'skin_condition' => $validateData['skin_condition'],
                'consulation' => 'Chờ tư vấn',
                'treatment_plan' => 'Chờ tư vấn',
                'status' => 0
            ]);

            if (!$consulation) {
                $arr = [
                    'status' => 'false',
                    'message' => 'Yêu cầu tư vấn thất bại, vui lòng liên hệ để nhận được hỗ trợ.',
                ];
                return response()->json($arr, 403);
            }

            Notification::create([
                'id' => app(Snowflake::class)->next(),
                'type' => 'Khách hàng yêu cầu tư vấn trực tuyến',
                'notifiable_type' => 'App\Models\Consulation',
                'data' => 'Khách hàng yêu cầu tư vấn video call trực tuyến',
                'read_at' => Carbon::now()
            ]);

            $email = config('mail.from.address');
            $full_name = auth('customer_api')->user()->full_name ?? "SPA-ER";
            $url_consulation = env('FRONTEND_URL') . "/admin/tuvankhachhang";

            $mailSend = Mail::to($email)->send(new BrowseConsulation($url_consulation, $full_name));

            if (!$mailSend) {
                return response()->json([
                    'status' => 'false',
                    'message' => 'Yêu cầu thất bại đã có lỗi xảy ra.',
                ], 403);
            }

            $consulation->update([
                'status' => 0
            ]);

            $arr = [
                'status' => 'true',
                'message' => 'Yêu cầu tư vấn thành công, vui lòng đợi trong ít phút để nhận mail tham gia tư vấn.',
                'data' => new ConsulationResource($consulation)
            ];
            return response()->json($arr, 201);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }

    // public function browse(string $id)
    // {
    //     try {
    //         $consulation = Consulation::find($id);
    //         if (!$consulation || !$consulation->customer->email) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Không tìm thấy dữ liệu',
    //             ], 404);
    //         }
    //         if ($consulation->status > 1) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Không thể duyệt do cuộc tư vấn này đã kết thúc.',
    //             ], 403);
    //         }

    //         if ($consulation->status == 1) {
    //             return response()->json([
    //                 'status' => 'true',
    //                 'message' => 'Tham gia cuộc tư vấn này. Chuyển đến trang tư vấn trực tuyến',
    //             ], 200);
    //         }

    //         $email = ($consulation->customer->email);
    //         $full_name = ($consulation->customer->full_name ?? "SPA-ER");
    //         $url_consulation = env('FRONTEND_URL') . "/videocall/" . $id;

    //         $mailSend = Mail::to($email)->send(new ConsulationCustomerMail($url_consulation, $full_name));

    //         if (!$mailSend) {
    //             return response()->json([
    //                 'status' => 'false',
    //                 'message' => 'Duyệt thất bại đã có lỗi xảy ra.',
    //             ], 403);
    //         }
    //         $consulation->update([
    //             'status' => 1
    //         ]);
    //         $arr = [
    //             'status' => 'success',
    //             'message' => 'Duyệt thành công đã gửi mail cho khách hàng yêu cầu. Chuyển đến trang tư vấn trực tuyến',
    //             'data' => new ConsulationResource($consulation)
    //         ];
    //         return response()->json($arr);
    //     } catch (\Throwable $th) {
    //         $arr = [
    //             'status' => 'error',
    //             'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
    //         ];
    //         return response()->json($arr, 500);
    //     }
    // }
}
