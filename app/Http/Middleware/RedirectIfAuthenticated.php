<?php

namespace App\Http\Middleware;

use App\Models\Role;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $userOnRoleId = auth()->user()->roles->first()->id;
                return $this->redirectBasedOnRole($userOnRoleId);
            }
        }

        return $next($request);
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
                return redirect()->intended('/seksi/dashboard');
            default:
                return redirect('/');
        }
    }
}
