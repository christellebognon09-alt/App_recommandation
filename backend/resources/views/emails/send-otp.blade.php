<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: white;
            max-width: 600px;
            margin: 20px auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #333;
            margin: 0;
            font-size: 24px;
        }
        .otp-section {
            background-color: #f9f9f9;
            border-left: 4px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #007bff;
            letter-spacing: 2px;
            text-align: center;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }
        .info-text {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
            margin: 15px 0;
        }
        .warning {
            color: #dc3545;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🗺️ App Recommandation</h1>
        </div>

        <p class="info-text">Bonjour,</p>

        <p class="info-text">
            Vous avez demandé un code de vérification pour accéder à votre compte App Recommandation.
        </p>

        <div class="otp-section">
            <p class="info-text" style="margin-top: 0;">Voici votre code OTP :</p>
            <div class="otp-code">{{ $code }}</div>
            <p class="info-text">
                ⏱️ Ce code est valable pendant <strong>{{ $expiresIn }}</strong>
            </p>
        </div>

        <p class="info-text">
            <span class="warning">⚠️ Important :</span>
        </p>
        <ul class="info-text">
            <li>Ne partagez jamais ce code avec quiconque</li>
            <li>L'équipe d'App Recommandation ne vous demandera jamais ce code par email ou message</li>
            <li>Si vous n'avez pas demandé ce code, veuillez ignorer ce message</li>
        </ul>

        <p class="info-text">
            Des questions ? Contactez notre équipe de support.
        </p>

        <div class="footer">
            <p>© 2026 App Recommandation. Tous droits réservés.</p>
            <p>Cet email a été envoyé à {{ $notifiable->email ?? 'votre adresse email' }}</p>
        </div>
    </div>
</body>
</html>
