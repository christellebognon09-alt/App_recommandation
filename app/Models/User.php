<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // <--- AJOUTER CECI

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable; // <--- UTILISER HasApiTokens ICI

    /**
     * Les attributs qui peuvent être assignés en masse.
     * Note: Les attributs PHP 8.2+ #[Fillable] sont élégants, 
     * mais la méthode classique est plus sûre pour la compatibilité Sanctum.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Les attributs à cacher pour la sérialisation (ex: lors d'un retour JSON).
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Typage des attributs.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}