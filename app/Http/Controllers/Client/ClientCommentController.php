<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Customer;
use App\Models\CommentImage;
use App\Http\Requests\Client\Comment\CommentRequest;
use App\Http\Requests\Client\Comment\CommentUpdateRequest;
use App\Http\Resources\Client\Comment\CommentResource;
use App\Http\Resources\Client\Comment\CommentCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Filters\Admin\CommentFilter;


use Kra8\Snowflake\Snowflake;

class ClientCommentController extends Controller
{

    public function index(Request $request, CommentFilter $filter)
    {
        try {
            $query = Comment::with(['createdByUser', 'updatedByUser']);
            $comments = $filter->apply($request, $query)->paginate($request->input('per_page', 5));
            return new CommentCollection($comments);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh sách bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }


    public function store(CommentRequest $request)
    {
        try {
            $userId = Auth::id();

            if (!$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn cần đăng nhập để thêm bình luận.',
                ], 401);
            }

            $validatedData = $request->validated();


            $hasUsedService = DB::table('appointments')
                ->join('appointment_services', 'appointments.id', '=', 'appointment_services.appointment_id')
                ->join('services', 'services.id', '=', 'appointment_services.service_id')
                ->join('customers', 'customers.id', '=', 'appointments.customer_id')
                ->where('appointments.customer_id', '=', $validatedData['customer_id'])
                ->where('appointment_services.service_id', '=', $validatedData['service_id'])
                ->whereIn('appointments.status',[2,3])
                ->exists();

            if (!$hasUsedService) {
                return response()->json([
                    'status' => false,
                    'message' => 'Bạn chưa sử dụng dịch vụ này!',
                ], 403);
            }


            $parentComment = null;
            if (!empty($validatedData['parent_comment_id'])) {
                $parentComment = Comment::find($validatedData['parent_comment_id']);
                if (!$parentComment) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Bình luận cha không tồn tại.',
                    ], 404);
                }
            }

            $comment = Comment::create([
                'id' => $validatedData['id'],
                'parent_comment_id' => $parentComment?->id,
                'service_id' => $validatedData['service_id'] ?? null,
                'comment' => $validatedData['comment'],
                'customer_id'=>$userId,
                'type' => 1,
                'rate' => $validatedData['rate'],


            ]);
            if ($request->hasFile('image_url')) {
              
                $images = $request->file('image_url');

                if (is_array($images)) {
                    foreach ($images as $index => $file) {

                        $imageName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                        $file->storeAs('public/uploads/comments', $imageName);

                        CommentImage::create([
                            'id' => app(Snowflake::class)->next(),
                            'comment_id' => $comment->id,
                            'image_url' => $imageName,

                        ]);
                    }
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm bình luận thành công.',
                'data' => $comment
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }



    public function update(CommentUpdateRequest $request, $id)
    {
        try {

            $comment = Comment::findOrFail($id);

            $userId = Auth::id();

            if (!$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn cần đăng nhập để sửa bình luận.',
                ], 401);
            }
            if ((int)$comment->customer_id !== (int)$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn không có quyền sửa bình luận này.',
                ], 403);
            }
            $validatedData = $request->validated();
            $hasUsedService = DB::table('appointments')
            ->join('appointment_services', 'appointments.id', '=', 'appointment_services.appointment_id')
            ->join('services', 'services.id', '=', 'appointment_services.service_id')
            ->join('customers', 'customers.id', '=', 'appointments.customer_id')
            ->where('appointments.customer_id', '=', $validatedData['customer_id'])
            ->where('appointment_services.service_id', '=', $validatedData['service_id'])
            ->whereIn('appointments.status',[2,3])
            ->exists();

        if (!$hasUsedService) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn chưa sử dụng dịch vụ này!',
            ], 403);
        }

            if ($request->hasFile('image_url')) {

                $oldImages = CommentImage::where('comment_id', $comment->id)->get();

                foreach ($oldImages as $oldImage) {
                    $oldImagePath = 'uploads/comments/' . $oldImage->image_url;

                    if (Storage::disk('public')->exists($oldImagePath)) {

                        Storage::disk('public')->delete($oldImagePath);
                    }
                    $oldImage->delete();
                }
                $images = $request->file('image_url');
                $images = is_array($images) ? $images : [$images];
                foreach ($images as $index => $file) {
                    $imageName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                    $file->storeAs('public/uploads/comments', $imageName);
                    CommentImage::create([
                        'id' => app(Snowflake::class)->next(),
                        'comment_id' => $comment->id,
                        'image_url' => $imageName,
                    ]);
                }
            }

            $comment->update($validatedData);
            $comment->load(['service', 'customer', 'parent']);
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật bình luận thành công!',
                'data' => $comment,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bình luận không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }



    public function reply(CommentRequest $request, $id)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn cần đăng nhập để trả lời bình luận.',
            ], 401);
        }

        try {

            $parentComment = Comment::findOrFail($id);
            $validatedData = $request->validated();
            $validatedData['parent_comment_id'] = $parentComment->id;
            $validatedData['type'] = 1;
            $hasUsedService = DB::table('appointments')
            ->join('appointment_services', 'appointments.id', '=', 'appointment_services.appointment_id')
            ->join('services', 'services.id', '=', 'appointment_services.service_id')
            ->join('customers', 'customers.id', '=', 'appointments.customer_id')
            ->where('appointments.customer_id', '=', $validatedData['customer_id'])
            ->where('appointment_services.service_id', '=', $validatedData['service_id'])
            ->whereIn('appointments.status',[2,3])
            ->exists();

        if (!$hasUsedService) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn chưa sử dụng dịch vụ này!',
            ], 403);
        }
            $reply = Comment::create($validatedData);
            return response()->json([
                'status' => 'success',
                'message' => 'Trả lời bình luận thành công.',
                'data' => new CommentResource($reply),
            ], 201);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bình luận cha không tồn tại.',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi trả lời bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            $userId = Auth::id();

            if (!$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn cần đăng nhập để thêm bình luận.',
                ], 401);
            }
            if ((int)$comment->customer_id !== (int)$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn không có quyền xóa bình luận này.',
                ], 403);
            }
            $commentImages = CommentImage::where('comment_id', $comment->id)->get();
            if ($commentImages->isNotEmpty()) {
                foreach ($commentImages as $commentImage) {
                    $oldImagePath = Storage::disk('public')->path('uploads/comments/' . $commentImage->image_url);

                    if (Storage::disk('public')->exists('uploads/comments/' . $commentImage->image_url)) {
                        Storage::disk('public')->delete('uploads/comments/' . $commentImage->image_url);
                    }
                    $commentImage->delete();
                }
            }

            $comment->replies()->delete();
            if ($comment->forceDelete()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Bình luận và ảnh liên quan đã được xóa thành công!',
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không thể xóa bình luận!',
                ], 500);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bình luận không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xóa bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }



}
