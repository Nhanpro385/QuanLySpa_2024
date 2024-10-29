<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\CommentImage; // Đảm bảo đã import model CommentImage
use App\Http\Requests\Admin\Comments\CommentRequest;
use App\Http\Requests\Admin\Comments\CommentUpdateRequest;
use App\Http\Resources\Admin\Comments\CommentResource;
use App\Http\Resources\Admin\Comments\CommentCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

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
            $userId = Auth::id();
            if (!$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn cần đăng nhập để thêm bình luận.',
                ], 401);
            }

            $validatedData = $request->validated();
            $validatedData['created_by'] = $userId;

            // Thêm bình luận vào cơ sở dữ liệu
            $comment = Comment::create($validatedData);

            // Kiểm tra xem có tệp hình ảnh nào được gửi lên không
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                if ($image->isValid()) {
                    // Lưu tệp hình ảnh vào thư mục public/uploads/comments
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $imagePath = $image->storeAs('uploads/comments', $imageName, 'public');

                    // Tạo ID tự định nghĩa với chiều dài <= 20 ký tự
                    $customId = 'cid_' . substr(md5(uniqid()), -8); // Duy trì chiều dài <= 20

                    // Lưu thông tin hình ảnh vào bảng comment_images
                    CommentImage::create([
                        'id' => $customId,
                        'comment_id' => $comment->id,
                        'image_url' => $imagePath,
                        'created_by' => $userId,
                        'updated_by' => $userId, // Hoặc không thiết lập nếu không cần
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Tệp hình ảnh không hợp lệ.',
                    ], 400);
                }
            }

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
            $validatedData['updated_by'] = Auth::id(); // Cập nhật người chỉnh sửa

            // Cập nhật bình luận
            $comment->update($validatedData);

            // Kiểm tra xem có tệp hình ảnh nào được gửi lên không
            if ($request->hasFile('image_url')) {
                $image = $request->file('image_url');
                if ($image->isValid()) {
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    // Lưu tệp hình ảnh vào thư mục public/uploads/comments
                    $imagePath = $image->storeAs('uploads/comments', $imageName, 'public');

                    // Lưu thông tin hình ảnh vào bảng comment_images
                    CommentImage::create([
                        'comment_id' => $comment->id,
                        'image_url' => $imagePath,
                        'created_by' => Auth::id(),
                        'updated_by' => Auth::id(),
                    ]);

                    // Cập nhật lại trường image_url của comment nếu cần
                    $comment->update(['image_url' => $imagePath]);
                }
            }

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

            // Xóa các hình ảnh liên quan nếu cần thiết (nếu có xóa trong model)
            CommentImage::where('comment_id', $comment->id)->delete();

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
            $parentComment = Comment::findOrFail($id);

            $validatedData = $request->validated();
            $validatedData['parent_comment_id'] = $parentComment->id;
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = Auth::id(); // Đảm bảo updated_by không phải null

            // Thêm bình luận trả lời
            $reply = Comment::create($validatedData);

            // Kiểm tra xem có tệp hình ảnh nào được gửi lên không
            if ($request->hasFile('image_url')) {
                $image = $request->file('image_url');

                if ($image->isValid()) {
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    // Lưu tệp hình ảnh vào thư mục public/uploads/comments
                    $imagePath = $image->storeAs('uploads/comments', $imageName, 'public');

                    // Lưu thông tin hình ảnh vào bảng comment_images
                    CommentImage::create([
                        'comment_id' => $reply->id,
                        'image_url' => $imagePath,
                        'created_by' => Auth::id(),
                        'updated_by' => Auth::id(),
                    ]);
                }
            }

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
