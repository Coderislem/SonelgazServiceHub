<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\demande;
use App\Models\Compteur; // Make sure this import is here
use Validator;
use Illuminate\Support\Facades\File;
class demande_C extends Controller{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function storeDemonde(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name_Agency' => 'required',
            'Document' => 'required|mimes:pdf', // Ensure it's a PDF
            'Energy' => 'required',
            'Address' => 'required',
            'phone' => 'required',
            'statistical_identification_number' => 'required',
            'the_neture_of_the_place_of_arrest' => 'required',
            'state_demande' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'fails' => true,
                'message' => 'Sorry, data not stored',
                'error' => $validator->errors()
            ]);
        }
    
        // Ensure the 'documents' directory exists within 'public/storage'
        $documentDirectory = public_path('storage/documents');
        if (!File::exists($documentDirectory)) {
            File::makeDirectory($documentDirectory, 0777, true, true);
        }
    
        if ($request->hasFile('Document')) {
            // Change the storage path here
            $file = $request->file('Document');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('storage/documents'), $fileName);
            $input['Document'] = 'documents/' . $fileName;
        } else {
            return response()->json([
                'fails' => true,
                'message' => 'Document file is required'
            ]);
        }
    
        $userId = Auth::id();
        if (is_null($userId)) {
            return response()->json([
                'fails' => true,
                'message' => 'Unable to retrieve authenticated user ID'
            ], 500);
        }
        $input['user_id'] = $userId;
    
        $dommond = Demande::create($input);
    
        return response()->json([
            'fails' => false,
            'message' => 'Storage successfully',
            'dommond' => $dommond
        ]);
    }
    
    
    public function indexDemmonde()
    {
        $demonde = Demande::all();
        return response()->json([
            'demonde' => $demonde
        ]);
    }
    
    public function updateStateDemande(Request $request, $id)
    {
        $this->validate($request, [
            'state_demande' => 'required|string|max:255',
        ]);
    
        try {
            $demande = demande::findOrFail($id);
            $demande->state_demande = $request->state_demande;
            $demande->save();
    
            if ($demande->state_demande == "Accepted") {
                $this->createCompteur($demande->Energy, $demande->user_id, $demande->name_Agency);
            }
    
            return response()->json([
                'message' => 'State updated successfully',
                'demande' => $demande
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Demande not found or could not update state'], 404);
        }
    }
    
    private function createCompteur($Energy, $user_id,$name_Agency)
    {
        $input = [
            'nombreCompteurs' => rand(1000000000,90000000000000),
            'name_Agency' => $name_Agency, 
            'typeCompteurs' => $Energy,
            'user_id' => $user_id,
        ];
    
        try {
            $compteur = Compteur::create($input);
    
            return [
                'fails' => false,
                'message' => 'Storage successful',
                'createdCompteur' => $compteur
            ];
        } catch (\Exception $e) {
            Log::error('Failed to create Compteur: ' . $e->getMessage());
            return [
                'fails' => true,
                'message' => 'Failed to create compteur'
            ];
        }
    }
    
    public function createCompteurEndpoint(Request $request)
    {
        $result = $this->createCompteur($request->Energy, $request->user_id,$request->name_Agency);
    
        if ($result['fails']) {
            return response()->json([
                'fails' => true,
                'message' => $result['message']
            ], 500);
        }
    
        return response()->json([
            'fails' => false,
            'message' => $result['message'],
            'createdCompteur' => $result['createdCompteur']
        ]);
    }
    public function AllNemberConteres()
{
    $nombreCompteurs = Compteur::select('nombreCompteurs', 'user_id','name_Agency')->get();
    return response()->json($nombreCompteurs);
}

  
}