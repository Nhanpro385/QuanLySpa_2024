<?php

namespace App\Http\Controllers\Client\Promotion;

use App\Models\Promotion;
use App\Filters\Admin\PromotionFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Client\Promotion\PromotionResource;
use App\Http\Resources\Client\Promotion\PromotionCollection;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function index(Request $request, PromotionFilter $filter)
    {
        try {
            $query = Promotion::with(['createdByUser', 'updatedByUser']);
            $promotion = $filter->apply($request, $query)->paginate($request->input('per_page', 5));

            return new PromotionCollection($promotion);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh sách khuyến mãi.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
