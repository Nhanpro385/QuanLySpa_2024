<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\CommentImage;
use App\Http\Requests\Client\Comment\CommentRequest;
use App\Http\Requests\Client\Comment\CommentUpdateRequest;
use App\Http\Resources\Client\Comment\CommentResource;
use App\Http\Resources\Client\Comment\CommentCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


use Kra8\Snowflake\Snowflake;

class ClientCommentController extends Controller
{

    public function index()
    {

        $comments = Comment::with(['createdByUser', 'updatedByUser'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);


        return new CommentCollection($comments);
    }



    public function store(CommentRequest $request)
{

    if (!Auth::check()) {
        return response()->json([
            'status' => 'error',
            'message' => 'Bạn cần đăng nhập để thêm bình luận.',
        ], 401);
    }

    try {

        $validatedData = $request->validated();
        $validatedData['created_by'] = Auth::id();

        $hasUsedService = DB::table('appointments')
            ->join('appointment_services', 'appointments.id', '=', 'appointment_services.appointment_id')
            ->join('services', 'services.id', '=', 'appointment_services.service_id')
            ->join('customers', 'customers.id', '=', 'appointments.customer_id')
            ->where('appointments.customer_id', '=', $validatedData['customer_id'])
            ->where('appointment_services.service_id', '=', $validatedData['service_id'])
            ->exists();

        if (!$hasUsedService) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn chỉ có thể bình luận nếu đã sử dụng dịch vụ này.',
            ], 403);
        }


        $comment = Comment::create([
            'id' => app(Snowflake::class)->next(),
            'service_id' => $validatedData['service_id'] ?? null,
            'comment' => $validatedData['comment'],
            'created_by' => Auth::id(),
        ]);


        if ($request->hasFile('image_url')) {
            $image = $request->file('image_url');


            $imagePath = $image->store('public/uploads/comments');


            CommentImage::create([
                'id' => app(Snowflake::class)->next(),
                'comment_id' => $comment->id,
                'image_url' => basename($imagePath),
                'created_by' => Auth::id(),
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Thêm bình luận thành công.',
            'data' => new CommentResource($comment),
        ], 201);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => 'error',
            'message' => 'Đã xảy ra lỗi khi thêm bình luận.',
            'error' => $th->getMessage(),
        ], 500);
    }
}



    public function update(CommentUpdateRequest $request, $id)
    {

        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn cần đăng nhập để cập nhật bình luận.',
            ], 401);
        }

        try {

            $comment = Comment::findOrFail($id);


            if ($comment->created_by != Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn không có quyền chỉnh sửa bình luận này.',
                ], 403);
            }


            $validatedData = $request->validated();
            $comment->update($validatedData);


            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật bình luận thành công.',
                'data' => new CommentResource($comment),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật bình luận.',
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
            $validatedData['created_by'] = Auth::id();


            $reply = Comment::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Trả lời bình luận thành công.',
                'data' => new CommentResource($reply),
            ], 201);
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

        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn cần đăng nhập để xóa bình luận.',
            ], 401);
        }

        try {

            $comment = Comment::findOrFail($id);


            if ($comment->created_by != Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn không có quyền xóa bình luận này.',
                ], 403);
            }

         
            $comment->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa bình luận thành công.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi xóa bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
