<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\chafeDagens;
use App\Models\Agence;
use App\Models\type_reclamtion; // Ensure this import is correct
use Validator;
use Illuminate\Support\Facades\Hash;
class Admin extends Controller
{
    public function createChafe(Request $request)
    {
        $input = $request->all();
    
        $validator = Validator::make($input, [
            'first_name' => 'required', 
            'last_name' => 'required',
            'Name_Agency' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'fails' => true,
                'message' => 'Sorry, there are validation errors',
                'errors' => $validator->errors()
            ]);
        }
    
        $existingChafe = chafeDagens::where('email', $input['email'])->first();
        if ($existingChafe) {
            return response()->json([
                'fails' => true,
                'message' => 'Email already exists',
                'errors' => ['email' => ['The email has already been taken.']]
            ]);
        }
    
        // Hash the password before saving
        $input['password'] = bcrypt($input['password']);
    
        $createdChafe = chafeDagens::create($input);
    
        return response()->json([
            'fails' => false,
            'message' => 'Storage successful',
            'createdChafe' => $createdChafe,
        ], 200);
        
        $token = $chafAjence->createToken('Chauffeur/Agency Token')->accessToken;
              
        return response()->json([
            'token' => $token,
            'user' => $chafAjence
        ], 200);
    }
    
    public function loginChafAjence(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $chafAjence = chafeDagens::where('email', $credentials['email'])->first();

        if ($chafAjence && Hash::check($credentials['password'], $chafAjence->password)) {
            $token = $chafAjence->createToken('Chauffeur/Agency Token')->accessToken;
          
            return response()->json([
                'token' => $token,
                'chafAjence' => $chafAjence
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function Allchafe(){ 
        $createdChafe = chafeDagens::all(); 
        return response()->json([
            'createdChafe' => $createdChafe
        ]);
    }

    public function deleteChafe($id){
        $chafe = chafeDagens::find($id);
        $chafe->delete();
    }

    public function createAgence(Request $request){
        $inputt = $request->all();
        
        $validator = Validator::make($inputt, [
            'Name_Agency' => 'required', 
            'Adresse' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'fails' => true,
                'message' => 'Sorry, there are validation errors',
                'errors' => $validator->errors()
            ]);
        }

        $createAjence = Agence::create($inputt); 
        return response()->json([
            'fails' => false,
            'message' => 'Storage successful',
            'createdAjence' => $createAjence
        ]);
    }

    public function AllAgence(){ 
        $createAjence = Agence::all(); 
        return response()->json(    
                    $createAjence
    );
    }
    public function createTipReclamation(Request $request)
    {
        $reclamti = $request->all();
        
        $validator = Validator::make($reclamti, [
            'type_reclamation' => 'required',
            'energy' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'fails' => true,
                'message' => 'Sorry, there are validation errors',
                'errors' => $validator->errors()
            ]);
        }

        $createTipReclamation = type_reclamtion::create($reclamti);
        return response()->json([
            'fails' => false,
            'message' => 'Storage successful',
            'createdTipReclamation' => $createTipReclamation
        ]);
    }

    public function AllTipReclamation()
    { 
        $createTipReclamation = type_reclamtion::all();
        return response()->json($createTipReclamation);
    }
    
    public function deleteTipReclamation($id){
        $createTipReclamation = type_reclamtion::find($id);
        $createTipReclamation->delete();
    }
}