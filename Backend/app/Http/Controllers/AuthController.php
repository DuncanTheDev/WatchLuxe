<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $role = $request->input('role', 'customer'); // default is customer

        if ($role === 'admin') {
            $request->validate([
                'first_name' => 'required|string|max:50',
                'last_name' => 'required|string|max:50',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string|min:8'
            ]);
        } else {
            $request->validate([
                'first_name' => 'required|string|max:50',
                'last_name' => 'required|string|max:50',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string|min:8',
                'phone' => 'required|string|max:20',
                'address' => 'required|string|max:100',
                'city' => 'required|string|max:50',
                'state' => 'required|string|max:50',
                'postal_code' => 'required|string|max:4'
            ]);
        }

        $userData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $role,
        ];

        if ($role === 'customer') {
            $userData['phone'] = $request->phone;
            $userData['address'] = $request->address;
            $userData['city'] = $request->city;
            $userData['state'] = $request->state;
            $userData['postal_code'] = $request->postal_code;
        }

        $user = User::create($userData);

        $token = $user->createToken($request->email)->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
