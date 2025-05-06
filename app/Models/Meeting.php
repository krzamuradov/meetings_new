<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['documents'];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
