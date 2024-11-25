<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\CommentImage;
use App\Http\Requests\Admin\Comments\CommentRequest;
use App\Http\Requests\Admin\Comments\CommentUpdateRequest;
use App\Http\Resources\Admin\Comments\CommentResource;
use App\Http\Resources\Admin\Comments\CommentCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Kra8\Snowflake\Snowflake;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Filters\Admin\CommentFilter;
use Illuminate\Http\Request;



class CommentController extends Controller
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
        try {

            $comment = Comment::findOrFail($id);

            $validatedData = $request->validated();
            $validatedData['updated_by'] = Auth::id();

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
                        'created_by' => Auth::id(),
                    ]);
                }
            }

            $comment->update($validatedData);
            $comment->load(['service', 'customer', 'parent', 'replies']);
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
        try {
            $parentComment = Comment::findOrFail($id);

            $validatedData = $request->validated();
            $validatedData['parent_comment_id'] = $parentComment->id;
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = Auth::id();

            $reply = Comment::create($validatedData);


            if ($request->hasFile('image_url')) {
                $image = $request->file('image_url');

                if ($image->isValid()) {
                    $imageName = time() . '.' . $image->getClientOriginalExtension();

                    $imagePath = $image->storeAs('uploads/comments', $imageName, 'public');


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

    public function destroy($id)
    {
        try {

            $comment = Comment::findOrFail($id);


            if ($comment->image_url) {
                $oldImagePath = storage_path('app/public/uploads/comments/' . $comment->image_url);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
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
