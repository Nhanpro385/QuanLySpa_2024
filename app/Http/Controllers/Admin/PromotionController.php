<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Http\Requests\Admin\Promotions\PromotionRequest;
use App\Http\Requests\Admin\Promotions\PromotionUpdateRequest;
use App\Http\Resources\Admin\Promotions\PromotionResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Filters\Admin\PromotionFilter;
use App\Http\Resources\Admin\Promotions\PromotionCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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

    public function show($id)
    {
        try {
            $promotion = Promotion::with(['createdByUser', 'updatedByUser'])->find($id);

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
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(PromotionRequest $request)
    {
        try {

            $validatedData = $request->validated();
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = null;
            if ($request->hasFile('image_url')) {
                $image = $request->file('image_url');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('public/uploads/promotions', $imageName);
                $validatedData['image_url'] = $imageName;
            }
            $promotion = Promotion::create($validatedData);
            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới khuyến mãi thành công',
                'data' => new PromotionResource($promotion),
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(PromotionUpdateRequest $request, $id)
{
    try {
        $promotion = Promotion::findOrFail($id);
        $validatedData = $request->validated();
        $validatedData['updated_by'] = Auth::id();


        if ($request->hasFile('image_url')) {
            if ($promotion->image_url) {

                $oldImagePath = storage_path('app/public/uploads/promotions/' . $promotion->image_url);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $image = $request->file('image_url');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/uploads/promotions', $imageName);
            $validatedData['image_url'] = $imageName;
        }


        $promotion->update($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật khuyến mãi thành công',
            'data' => new PromotionResource($promotion),
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Khuyến mãi không tồn tại!',
        ], 404);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => 'error',
            'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
            'error' => $th->getMessage(),
        ], 500);
    }
}

public function destroy($id)
{
    try {

        $promotion = Promotion::withTrashed()->findOrFail($id);


        if ($promotion->image_url) {
            $oldImagePath = storage_path('app/public/uploads/promotions/' . $promotion->image_url);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }


        if ($promotion->forceDelete()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Khuyến mãi và ảnh đã được xóa thành công.',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xóa khuyến mãi!',
            ], 500);
        }
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Khuyến mãi không tồn tại!',
        ], 404);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => 'error',
            'message' => 'Đã xảy ra lỗi trong quá trình xóa khuyến mãi.',
            'error' => $th->getMessage(),
        ], 500);
    }
}



}
