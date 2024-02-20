<?php

namespace App\Http\Requests\General;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class PasswordUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'oldPassword' => [
                'required',
                'current_password:web',
            ],
            'password' => [
                'required',
                Password::min(8)->mixedCase()->numbers()->letters()->uncompromised()->symbols(),
                Rule::unique('users')->ignore(auth()->id()), // Validasi unik, ignore saat memperbarui data sendiri
            ],
            'confirmNewPassword' => 'required|same:password',
        ];
    }
}
