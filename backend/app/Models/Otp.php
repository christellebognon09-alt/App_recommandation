<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'code',
        'attempts',
        'expires_at',
        'is_used',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'is_used' => 'boolean',
    ];

    /**
     * Scope : OTP valides (non expirés et non utilisés)
     */
    public function scopeValid($query)
    {
        return $query->where('is_used', false)
                    ->where('expires_at', '>', now());
    }

    /**
     * Scope : OTP pour un email spécifique
     */
    public function scopeForEmail($query, $email)
    {
        return $query->where('email', $email);
    }

    /**
     * Vérifier si l'OTP a expiré
     */
    public function isExpired()
    {
        return $this->expires_at < now();
    }

    /**
     * Vérifier si le nombre de tentatives est dépassé
     */
    public function isAttemptsExceeded()
    {
        return $this->attempts >= 5; // Max 5 tentatives
    }
}
