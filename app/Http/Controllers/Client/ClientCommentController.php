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
            $validatedData['created_by'] = Auth::id();
            $validatedData = $request->validated();
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
                'created_by' => $userId,
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
                            'created_by' => $userId,
                        ]);
                    }
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Thêm bình luận thành công.',
                'data' => $comment,
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
