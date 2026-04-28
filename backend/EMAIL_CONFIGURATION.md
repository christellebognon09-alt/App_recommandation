# ⚙️ Configuration Email pour OTP

## 🔧 Option 1 : Mailtrap (Recommandé pour développement)

Mailtrap est un service gratuit qui simule l'envoi d'emails sans vraiment les envoyer.

### Étapes :

1. Allez sur https://mailtrap.io/
2. Inscrivez-vous gratuitement
3. Créez un projet "Laravel"
4. Allez dans "SMTP Settings" et copiez les credentials

### Configuration dans `.env` :

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username_here
MAIL_PASSWORD=your_password_here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@app.com
MAIL_FROM_NAME="App Recommandation"
```

---

## 📧 Option 2 : Gmail

### Étapes :

1. Activez l'authentification à 2 facteurs sur votre compte Gmail
2. Générez une "App Password" : https://myaccount.google.com/apppasswords
3. Copier le mot de passe généré (16 caractères)

### Configuration dans `.env` :

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password_here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="App Recommandation"
```

---

## 🚀 Option 3 : Log (Développement uniquement)

Si vous voulez juste voir les emails dans les logs, sans les envoyer :

```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@app.com
MAIL_FROM_NAME="App Recommandation"
```

Les OTP s'afficheront dans `storage/logs/laravel.log`

---

## ✅ Tester la configuration

1. Ouvrez un terminal dans le backend
2. Exécutez la commande :

```bash
php artisan tinker

# Dans tinker :
Mail::to('test@example.com')->send(new \App\Mail\SendOtpMail('123456'));
```

Si aucune erreur, la configuration est bonne ✅

---

## 🔑 Variables importantes

```env
# Email du sender
MAIL_FROM_ADDRESS=noreply@app.com
MAIL_FROM_NAME="App Recommandation"

# Délai d'expiration OTP (à modifier si besoin)
# Dans OtpService.php, ligne 34 :
'expires_at' => now()->addMinutes(15),
```

---

## 📝 Notes

- ⚠️ **Ne pas commitez vos credentials** dans `.env` (il est dans `.gitignore`)
- 🔒 **Mailtrap/Gmail** devraient suffire pour le développement
- 📧 **En production**, utilisez un service comme SendGrid, Amazon SES, etc.

