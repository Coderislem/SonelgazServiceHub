<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
class RejisterLoginC extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'Document_verify' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender' => 'required',
            'imageProfile' =>'required|image|mimes:jpeg,png,jpg,gif,svg|max:2028',
            
        ]);
    
        $imageProfilePath = $request->file('imageProfile')->store('profiles', 'public');

        // $documentVerifyPath = $request->file('Document_verify') ? $request->file('Document_verify')->store('documents', 'public') : null;
    
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'gender' => $request->gender,
            'imageProfile' => $imageProfilePath,
          
        ]);
    
        $token = $user->createToken('merwan')->accessToken;
    
        return response()->json([
            'token' => $token,
            'user' => $user
        ], 200);
    }
   
    public function updateUser(Request $request, $id)
    {
        $this->validate($request, [
          
            'email' => 'required|email',
            'password' => 'required|min:6',
          
        ]);
    
        try {
            $user = User::findOrFail($id);
    
      
            // $user->first_name = $request->first_name;
            // $user->last_name = $request->last_name;
            $user->email = $request->email;
    
            if ($request->filled('password')) {
                $user->password = bcrypt($request->password);
            }
    
            $user->save();
    
            return response()->json(['message' => 'User information updated successfully', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'User information not found or could not update user'], 404);
        }
    }

    

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password,
        ];

      
        if (auth()->attempt($data)) {
            $user = auth()->user();
            $token = $user->createToken('merwan')->accessToken;
            
            return response()->json([
                'token' => $token,
                'user' => $user
            ], 200);
        } else {
            return response()->json(['error' => 'unauthorized'], 401);
        }
        }
    
       

    
    
       
    public function getuser()
    {
      $user = Auth::user();
      
      if ($user) {
        return $user; 
      } else {
        
        return response()->json(['message' => 'No user logged in'], 401);
      }
    }
 
    public function User($id): JsonResponse
    {
       
        $user = User::find($id);

        
        if (!$user) {
           
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        
        return response()->json([
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'gender' => $user->gender,
            'imageProfile' => $user->imageProfile,
        
            
        ]);
    }

    public function logout(Request $request)
    {
        
        if (Auth::check()) {
           
            $request->user()->token()->revoke();
    
           
            return response()->json(['message' => 'Successfully logged out'], 200);
        } else {
           
            return response()->json(['message' => 'No user authenticated'], 401);
        }
    }
    
}