<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\OtpService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OtpController extends Controller
{
    protected $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    /**
     * Demander un OTP
     * POST /api/request-otp
     */
    public function request(Request $request)
    {
        // Valider l'email
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->email;

        // Vérifier que l'utilisateur existe
        $user = User::where('email', $email)->first();

        if (!$user) {
            // Pour la sécurité, ne pas révéler que l'email n'existe pas
            return response()->json([
                'message' => 'Si cet email existe, vous recevrez un code OTP',
                'expires_in' => 900,
            ], 200);
        }

        // Générer et envoyer l'OTP
        $result = $this->otpService->generateAndSend($email);

        if (!$result['success']) {
            return response()->json([
                'message' => $result['message'],
            ], 500);
        }

        return response()->json([
            'message' => 'OTP envoyé avec succès',
            'expires_in' => $result['expires_in'],
        ], 200);
    }

    /**
     * Vérifier un OTP
     * POST /api/verify-otp
     */
    public function verify(Request $request)
    {
        // Valider les données
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        // Vérifier l'OTP
        $result = $this->otpService->verify($request->email, $request->code);

        if (!$result['success']) {
            $statusCode = $result['code'];

            // Messages d'erreur personnalisés
            if ($statusCode == 410) {
                throw ValidationException::withMessages([
                    'code' => ['OTP expiré. Demandez un nouvel OTP.'],
                ]);
            } elseif ($statusCode == 429) {
                throw ValidationException::withMessages([
                    'code' => ['Nombre de tentatives dépassé.'],
                ]);
            } elseif ($statusCode == 401) {
                $remaining = $result['attempts_remaining'] ?? 'plusieurs';
                throw ValidationException::withMessages([
                    'code' => ["OTP invalide. Vous avez encore $remaining tentative(s)."],
                ]);
            } else {
                throw ValidationException::withMessages([
                    'code' => [$result['message']],
                ]);
            }
        }

        // OTP valide - retourner le user et un token
        $user = User::where('email', $request->email)->firstOrFail();

        // Marquer l'email comme vérifié
        $user->update(['email_verified_at' => now()]);

        // Générer un token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Email vérifié avec succès',
            'email_verified_at' => $user->email_verified_at,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 200);
    }
}
