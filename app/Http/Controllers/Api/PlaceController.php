<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place; // N'oublie pas cette ligne pour lier le modèle
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index()
    {
        // On récupère tous les lieux de la base de données
        return Place::all();
    }
}