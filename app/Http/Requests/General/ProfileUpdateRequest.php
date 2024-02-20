<?php

namespace App\Http\Requests\General;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
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
        $rules = [
            'fullName' => 'required|string|max:255',
            'email' => ['required', 'email:rfc,dns', Rule::unique('users')->ignore(auth()->user()->id, 'id')],
            "phoneNumber" => 'required|string|max:15|min:10|regex:/^[0-9]+$/',
        ];
    
        // Check if a new file is being uploaded before applying image rules
        if ($this->hasFile('avatar')) {
            $rules['avatar'] = [
                'image', // Ensures that the file is an image
                'mimes:jpg,jpeg,png', // Specifies allowed file types
                'max:2048', // Specifies the maximum file size (in kilobits)
                'nullable', // Allows the avatar field to be nullable
            ];
        } else {
            // If no new file is being uploaded, allow the avatar field to be nullable
            $rules['avatar'] = 'nullable';
        }
    
        return $rules;
    }
}