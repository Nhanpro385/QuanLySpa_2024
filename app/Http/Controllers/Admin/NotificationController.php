<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\NotificationFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Notifications\NotificationConllection;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        try {
            $filter = new NotificationFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $query = Notification::where($queryItems);
            $query = $query->orderBy($sorts[0], $sorts[1]);
            $perPage = $request->query('per_page', 10);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }
            return new NotificationConllection($query->paginate($perPage)->appends($request->query()));
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }

    }
}
