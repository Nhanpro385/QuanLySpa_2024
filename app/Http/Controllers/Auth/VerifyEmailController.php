<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request)
    {
        if ($request->user('api')->hasVerifiedEmail()) {
            return 'xoq';
        }

        if ($request->user('api')->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return 'xac nahn';

    }
}
