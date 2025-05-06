<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    protected $guarded = [];
    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return url('storage/' . $this->attributes['file']);
    }
}
