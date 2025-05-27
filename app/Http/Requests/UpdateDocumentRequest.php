<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $documentId = $this->route('document')?->id ?? $this->route('id');

        return [
            "name" => ["required"],
            "locale" => ["required"],
            "position" => [
                "required",
                Rule::unique('documents')
                    ->where(function ($query) {
                        $meetingId = $this->input('meeting_id'); // не $this->meeting_id
                        if ($meetingId) {
                            $query->where('meeting_id', $meetingId);
                        }
                    })
                    ->ignore($documentId),
            ],
            "file" => ["sometimes", "file"],
        ];
    }
}
