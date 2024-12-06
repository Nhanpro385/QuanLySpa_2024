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
            $query = Comment::with(['createdByUser', 'updatedByUser'])->orderBy('created_at', 'desc');


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
                'type' => 0

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
            if ($comment->type !== 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn không được quyền sửa bình luận này!',
                ], 403);
            }

            $validatedData = $request->validated();
            $validatedData['updated_by'] = Auth::id();
            if ($comment->parent_comment_id) {
                $validatedData['parent_comment_id'] = $comment->parent_comment_id;
            }
            if ($comment->customer_id) {
                $validatedData['customer_id'] = $comment->customer_id;
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
                        'created_by' => Auth::id(),
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
        try {
            $parentComment = Comment::findOrFail($id);

            $validatedData = $request->validated();
            $validatedData['parent_comment_id'] = $parentComment->id;
            $validatedData['created_by'] = Auth::id();
            $validatedData['updated_by'] = Auth::id();
            $validatedData['type'] = 0;
            if ($request->has('service_id')) {
                $validatedData['service_id'] = $request->input('service_id');
            }
            if ($request->has('customer_id')) {
                $validatedData['customer_id'] = $request->input('customer_id');
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

            $comment = Comment::withTrashed()->with('replies')->findOrFail($id);
            if ($comment->type !== 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Bạn không được quyền xóa luận này!',
                ], 403);
            }


            $this->deleteCommentImages($comment);

            foreach ($comment->replies as $reply) {

                $this->deleteCommentImages($reply);

                $reply->forceDelete();
            }


            $comment->forceDelete();

            return response()->json([
                'status' => 'success',
                'message' => 'Bình luận và các bình luận con đã được xóa thành công!'
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

    private function deleteCommentImages($comment)
    {

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
    }





}
