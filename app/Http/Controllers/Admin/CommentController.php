<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Http\Requests\Admin\Comments\CommentRequest;
use App\Http\Requests\Admin\Comments\CommentUpdateRequest;
use App\Http\Resources\Admin\Comments\CommentResource;
use App\Http\Resources\Admin\Comments\CommentCollection;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        try {
            $comments = Comment::with('replies.replies')->paginate(5);
            return new CommentCollection($comments);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh sách bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $comment = Comment::with('replies.replies')->find($id);

            if (!$comment) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bình luận không tồn tại!',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết bình luận.',
                'data' => new CommentResource($comment),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(CommentRequest $request)
    {
        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('uploads/comments', $imageName, 'public');
            }

            $validatedData = $request->validated();
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = Auth::id();
            $validatedData['image'] = $imagePath;

            $comment = Comment::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm mới bình luận thành công.',
                'data' => new CommentResource($comment),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình thêm mới bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(CommentUpdateRequest $request, $id)
    {
        try {
            $comment = Comment::findOrFail($id);

            $validatedData = $request->validated();
            $validatedData['updated_by'] = Auth::id();
            $comment->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật bình luận thành công!',
                'data' => new CommentResource($comment),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bình luận không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            $comment->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Bình luận đã được xóa thành công.'
            ]);
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

    public function reply(CommentRequest $request, $id)
    {
        try {
            // Tìm cmt cha
            $parentComment = Comment::findOrFail($id);

            // Kiểm tra nếu có ảnh được tải lên
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('uploads/comments', $imageName, 'public');
            }

            $validatedData = $request->validated();
            $validatedData['parent_comment_id'] = $parentComment->id;
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = Auth::id();
            $validatedData['image'] = $imagePath;
            $validatedData['comment'] = $request->input('comment');

            $reply = Comment::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Trả lời bình luận thành công.',
                'data' => new CommentResource($reply),
            ], 201);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bình luận không tồn tại!',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình trả lời bình luận.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
