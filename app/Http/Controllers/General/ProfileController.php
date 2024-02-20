<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\General\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show()
    {
        return Inertia::render('General/Profile/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        return Inertia::render('General/Profile/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request, string $id)
    {
        // Mendapatkan instance user berdasarkan ID
        $user = User::findOrFail($id);

        // Mengambil data masukan yang telah divalidasi
        $validated = $request->validated();

        // Variable untuk menandai adanya perubahan data
        $perubahan = false;

        // Memeriksa perubahan pada field full_name
        if ($validated['fullName'] !== $user->full_name) {
            $user->full_name = $validated['fullName'];
            $perubahan = true;
        }

        // Memeriksa perubahan pada field email
        if ($validated['email'] !== $user->email) {
            $user->email = $validated['email'];
            $perubahan = true;
        }

        // Memeriksa perubahan pada field no_telp
        if ($validated['phoneNumber'] !== $user->phone_number) {
            $user->phone_number = $validated['phoneNumber'];
            $perubahan = true;
        }

        // Memeriksa perubahan pada field avatar
        if ($request->hasFile('avatar')) {
            if ($user->avatar !== null) {
                File::delete(public_path($user->avatar));
            }

            $patch = '/upload/profile/';
            $avatar = $validated['avatar'];
            $slug = Str::slug($avatar->getClientOriginalName());
            $filename = time() . '-' . $slug . '.' . $avatar->getClientOriginalExtension();
            $avatar->move(public_path($patch), $filename);
            $user->avatar = $patch . $filename;
            $perubahan = true;
        }

        if ($perubahan) {
            $user->save();
            return to_route('profile.show', $id)->with('message', 'Profile Berhasil Diubah');
        }

        return to_route('profile.show', $id)->with('message', 'Tidak Ada Perubahan Pada Profile');
    }
}
