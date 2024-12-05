<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TreatmentHistory;
use App\Http\Resources\Client\TreatmentHistories\TreatmentHistoryResource;
use App\Http\Resources\Client\TreatmentHistories\TreatmentHistoryCollection;


class ClientTreatmentHistoryController extends Controller
{
    public function getByCustomerId($customer_id, Request $request)
    {
        try {
            // Áp dụng filter và phân trang (nếu có)
            $perPage = $request->query('per_page', 10);
    
            $treatmentHistories = TreatmentHistory::where('customer_id', $customer_id)
                ->orderBy('created_at', 'desc')
                ->paginate($perPage);
    
            return (new TreatmentHistoryCollection($treatmentHistories))
                ->additional(['status' => true]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi khi lấy danh sách Treatment Histories.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

}
