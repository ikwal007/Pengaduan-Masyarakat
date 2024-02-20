<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\General\PasswordUpdateRequest;
use Illuminate\Support\Facades\Hash;


class PasswordController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(PasswordUpdateRequest $request, String $id)
    {
        // Mengambil data masukan yang telah divalidasi
        $validated = $request->validated();

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return to_route('profile.show', $id)->with('message', 'Tidak Ada Perubahan Pada Profile');
    }
}
