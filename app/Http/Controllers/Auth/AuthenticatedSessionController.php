<?php

namespace App\Http\Controllers\Auth;

use App\Events\SuperAdmin\UserStatusUpdated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Role;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $userOnRoleId = auth()->user()->roles->first()->id;

        event(new UserStatusUpdated(auth()->user()->email, 'online'));

        return $this->redirectBasedOnRole($userOnRoleId);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {

        event(new UserStatusUpdated(auth()->user()->email, 'offline'));

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }

    /**
     * Redirect user base on their role.
     * 
     * @param \App\Models\User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectBasedOnRole($userOnRoleId): RedirectResponse
    {
        $role = new Role();

        switch ($userOnRoleId) {
            case $role->getRoleIdOnParamName('Super_Admin'):
                return redirect()->intended('/super-admin/dashboard-manages-worker-accounts');
            case $role->getRoleIdOnParamName('Pelayanan_Publik'):
                return redirect()->intended('/pelayanan-publik/dashboard-pengaduan');
            case $role->getRoleIdOnParamName('Masyarakat'):
                return redirect()->intended('/masyarakat/complaint');
            case $role->getRoleIdOnParamName('Seksi'):
                return redirect()->intended('/seksi/complaint-handling');
            default:
                return redirect('/');
        }
    }
}
