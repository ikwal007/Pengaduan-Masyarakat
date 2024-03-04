<?php

namespace App\Http\Requests\General;

use Illuminate\Foundation\Http\FormRequest;

class ComplaintPostRequest extends FormRequest
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
            "complainType" => "required",
            "complainMediaType" => "required",
            "userEmail" => ['required', 'email:rfc,dns'],
            "subdistricts" => "required",
            "village" => "required",
            "certificateNumber" => "required",
            "description" => "required",
            "complainStatus" => "required",
        ];
    }
}
