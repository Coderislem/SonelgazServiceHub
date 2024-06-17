<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\reclamateons;
use Illuminate\Support\Facades\Auth;
use Validator;

class Reclamtion extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function storeReclamation(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'nombreCompteurs' => 'required|integer',
            'type_reclamation' => 'required|string',
            'description' => 'nullable',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'fails' => true,
                'message' => 'Sorry, data not stored',
                'error' => $validator->errors()
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

        $reclamation = reclamateons::create($input);

        return response()->json($reclamation);
    }


    public function indexReclamateon()
    {
        $reclamation = reclamateons::all();
        return response()->json(
         $reclamation
        );
    }
    public function updateStateResponseReclamtion(Request $request, $id)
    {
        $this->validate($request, [
            'Responce' => 'required|string|max:255',
        ]);
    
        try {
            $reclamation = reclamateons::findOrFail($id);
            $reclamation->Responce = $request->Responce;
            $reclamation->save();
    
           
            return response()->json([
                'message' => 'Responce updated successfully',
                'demande' => $Responce
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'not update Responce'], 404);
        }
    }
}


