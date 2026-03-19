<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller as BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends BaseController
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $payload = $request->validated();

        $user = User::create([
            'nama' => $payload['nama'],
            'email' => $payload['email'],
            'password' => Hash::make($payload['password']),
            'role' => 'user',
        ]);

        Auth::login($user);

        return response()->json([
            'data' => [
                'user' => $this->serializeUser($user),
            ],
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $payload = $request->validated();

        $ok = Auth::attempt([
            'email' => $payload['email'],
            'password' => $payload['password'],
        ]);

        if (! $ok) {
            return response()->json([
                'message' => 'Email atau password salah.',
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        return response()->json([
            'data' => [
                'user' => $this->serializeUser($user),
            ],
        ]);
    }

    public function logout(): JsonResponse
    {
        Auth::logout();

        // Invalidate session to prevent session fixation.
        if ($request = request()) {
            if (method_exists($request, 'session')) {
                $request->session()->invalidate();
            }
        }

        return response()->json([
            'data' => [
                'message' => 'Logout berhasil.',
            ],
        ]);
    }

    public function me(): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return response()->json([
            'data' => [
                'user' => $this->serializeUser($user),
            ],
        ]);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->id,
            'nama' => $user->nama,
            'email' => $user->email,
            'role' => $user->role,
        ];
    }
}

