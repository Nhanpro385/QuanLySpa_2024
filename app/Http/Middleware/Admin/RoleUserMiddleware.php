<?php

namespace App\Http\Middleware\Admin;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $arr = [
            'status' => false,
            'message' => 'Tài khoản không có quyền thực hiện chức năng này.'
        ];
        $userRole = auth('api')->user()->role;
        if ($userRole != 0 && !$request->isMethod('get')) {
            return response()->json($arr, 403);
        }
        return $next($request);
    }
}
