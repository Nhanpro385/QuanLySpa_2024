<?php

namespace App\Http\Middleware\Client;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkStatusCustomer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $arr = [
            'status' => false,
            'message' => 'Tài khoản không có quyền thực hiện chức năng này.'
        ];
        $status = auth('customer_api')->user()->status;

        if ($status != 1 || $status == 0) {
            return response()->json($arr, 403);
        }
        return $next($request);
    }
}
