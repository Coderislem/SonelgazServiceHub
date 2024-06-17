<?php

namespace App\Http\Controllers;
use App\Models\Compteur;
use App\Models\demande;
use App\Models\reclamateons;
use App\Models\Agence;
use Illuminate\Http\Request;

class ConterTotel extends Controller
{
    public function indextotel(){
        $totelcompteurs = Compteur::count();
        $toteldemande = demande::count();
        $totelreclamateons = reclamateons::count();
        $totelAgence = Agence::count();
        
        return response()->json([
            'totelcompteurs' => $totelcompteurs,
            'toteldemande' => $toteldemande,
            'totelreclamateons' => $totelreclamateons,
            'totelAgence' => $totelAgence,
        ]);
    }
}

