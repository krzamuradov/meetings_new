<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MeetingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name_uz" => $this->name_uz,
            "name_en" => $this->name_en,
            "meeting_at" => $this->meeting_at,
            "meeting_at_formatted" => Carbon::parse($this->meeting_at)->format('d.m.Y'),
            "documents" => $this->documents
        ];
    }
}
