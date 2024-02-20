<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $this->transformUser($request->user()),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ];
    }

    /**
     * Transformasi objek user dan tambahkan properti tambahan.
     *
     * @param \Illuminate\Contracts\Auth\Authenticatable|null $user
     * @return array|null
     */
    protected function transformUser($user): ?array
    {
        if (!$user) {
            return null;
        }

        return [
            'id' => $user->id,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'role' => $user->roles->first(),
            'phone_number' => $user->phone_number,
            'avatar' => $user->avatar,
            'status' => $user->status,
            'created_at' => $user->created_at,
            'email_verified_at' => $user->email_verified_at,
            'updated_at' => $user->updated_at,
        ];
    }
}
