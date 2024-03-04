<?php

namespace App\Http\Controllers\Pelayanan;

use App\Http\Controllers\Controller;
use App\Http\Requests\General\RegisteredUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterdUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Pelayanan/RegisterUser/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisteredUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'full_name' => $validated['fullName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole('Masyarakat');

        return redirect()->route('pelayanan.create-complaint');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
