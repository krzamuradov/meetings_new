<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DocumentStore extends FormRequest
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
            "meeting_id" => ["required"],
            "name" => ["required"],
            "locale" => ["required"],
            "position" => [
                "required",
                Rule::unique('documents')->where(function ($query) {
                    return $query->where('meeting_id', $this->meeting_id);
                }),
            ],
            "file" => ["required", "file"],
        ];
    }
}
