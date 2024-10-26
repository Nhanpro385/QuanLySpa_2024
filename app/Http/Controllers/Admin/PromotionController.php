<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Http\Requests\Admin\Promotions\PromotionRequest;
use App\Http\Requests\Admin\Promotions\PromotionUpdateRequest;
use App\Http\Resources\Admin\Promotions\PromotionResource;
use App\Http\Resources\Admin\Promotions\PromotionCollection;

class PromotionController extends Controller
{
    public function index()
    {
        try {
            $promotions = Promotion::paginate(5);
            return new PromotionCollection($promotions);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $promotion = Promotion::find($id);

            if (!$promotion) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Khuyến mãi không tồn tại!',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết khuyến mãi: ' . $promotion->name,
                'data' => new PromotionResource($promotion),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(PromotionRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $promotion = Promotion::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới khuyến mãi thành công',
                'data' => new PromotionResource($promotion),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới khuyến mãi.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(PromotionUpdateRequest $request, $id)
    {
        try {
            $promotion = Promotion::findOrFail($id);
            $promotion->update($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật khuyến mãi thành công!',
                'data' => new PromotionResource($promotion),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Khuyến mãi không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $promotion = Promotion::findOrFail($id);

            $promotion->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Khuyến mãi đã được xóa thành công',
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Khuyến mãi không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

}
