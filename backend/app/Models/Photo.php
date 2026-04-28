<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'place_id',
        'url'
    ];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
