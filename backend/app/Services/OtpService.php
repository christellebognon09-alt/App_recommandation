<?php

namespace App\Services;

use App\Models\Otp;
use App\Mail\SendOtpMail;
use Illuminate\Support\Facades\Mail;

class OtpService
{
    /**
     * Générer et envoyer un OTP
     */
    public function generateAndSend($email)
    {
        // Nettoyer les anciens OTP non utilisés
        $this->cleanupExpiredOtp($email);

        // Générer un code OTP (6 chiffres)
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Créer l'enregistrement OTP
        $otp = Otp::create([
            'email' => $email,
            'code' => $code,
            'attempts' => 0,
            'expires_at' => now()->addMinutes(15), // OTP valable 15 minutes
        ]);

        // Envoyer l'OTP par email
        try {
            Mail::to($email)->send(new SendOtpMail($code));
            return [
                'success' => true,
                'message' => 'OTP envoyé avec succès',
                'expires_in' => 900, // 15 minutes en secondes
            ];
        } catch (\Exception $e) {
            // Si l'email échoue, supprimer l'OTP créé
            $otp->delete();
            return [
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de l\'email',
            ];
        }
    }

    /**
     * Vérifier un OTP
     */
    public function verify($email, $code)
    {
        // Récupérer l'OTP le plus récent pour cet email
        $otp = Otp::forEmail($email)->latest()->first();

        // Vérifier si l'OTP existe
        if (!$otp) {
            return [
                'success' => false,
                'message' => 'Aucun OTP trouvé pour cet email',
                'code' => 404,
            ];
        }

        // Vérifier si l'OTP a expiré
        if ($otp->isExpired()) {
            return [
                'success' => false,
                'message' => 'OTP expiré',
                'code' => 410,
            ];
        }

        // Vérifier si le nombre de tentatives est dépassé
        if ($otp->isAttemptsExceeded()) {
            return [
                'success' => false,
                'message' => 'Nombre de tentatives dépassé. Demandez un nouvel OTP.',
                'code' => 429,
            ];
        }

        // Vérifier si l'OTP est déjà utilisé
        if ($otp->is_used) {
            return [
                'success' => false,
                'message' => 'OTP déjà utilisé',
                'code' => 400,
            ];
        }

        // Vérifier le code OTP
        if ($otp->code !== $code) {
            $otp->increment('attempts');
            return [
                'success' => false,
                'message' => 'OTP invalide',
                'code' => 401,
                'attempts_remaining' => 5 - $otp->attempts,
            ];
        }

        // OTP valide - le marquer comme utilisé
        $otp->update(['is_used' => true]);

        return [
            'success' => true,
            'message' => 'OTP vérifié avec succès',
            'code' => 200,
        ];
    }

    /**
     * Nettoyer les OTP expirés pour un email
     */
    public function cleanupExpiredOtp($email)
    {
        Otp::forEmail($email)
            ->where('expires_at', '<', now())
            ->delete();
    }

    /**
     * Nettoyer tous les OTP expirés (à appeler via un job)
     */
    public function cleanupAllExpired()
    {
        Otp::where('expires_at', '<', now())->delete();
    }
}
