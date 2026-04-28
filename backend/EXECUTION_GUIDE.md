# 🚀 Guide d'exécution - Phase 1

## ✅ Fichiers créés

```
backend/
├── app/
│   ├── Http/Controllers/
│   │   └── OtpController.php              ✨ CRÉÉ
│   ├── Mail/
│   │   └── SendOtpMail.php                ✨ CRÉÉ
│   ├── Models/
│   │   └── Otp.php                        ✨ CRÉÉ
│   └── Services/
│       └── OtpService.php                 ✨ CRÉÉ
├── database/migrations/
│   └── 2026_04_28_000001_create_otps_table.php  ✨ CRÉÉ
├── resources/views/emails/
│   └── send-otp.blade.php                 ✨ CRÉÉ
├── routes/
│   └── api.php                            ✅ MODIFIÉ (ajout OTP routes)
└── EMAIL_CONFIGURATION.md                 ✨ CRÉÉ
```

---

## 📝 Étapes d'exécution

### **Étape 1 : Configurer l'email** (5 minutes)

Suivez [EMAIL_CONFIGURATION.md](EMAIL_CONFIGURATION.md) pour configurer :
- Mailtrap (recommandé) **OU**
- Gmail **OU**
- Log (développement)

Mettez à jour votre `.env` avec les credentials.

### **Étape 2 : Exécuter les migrations** (2 minutes)

```bash
# Allez dans le dossier backend
cd backend

# Exécutez la migration OTP
php artisan migrate
```

✅ La table `otps` doit être créée

### **Étape 3 : Tester les endpoints** (10 minutes)

Utilisez Postman ou Insomnia avec les requêtes ci-dessous.

---

## 🧪 Test des endpoints

### **1️⃣ Register (sans OTP)**

```bash
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "Password123",
  "password_confirmation": "Password123"
}
```

**Réponse attendue** (201) :
```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "role": "user"
  }
}
```

---

### **2️⃣ Request OTP**

```bash
POST http://localhost:8000/api/request-otp
Content-Type: application/json

{
  "email": "jean@example.com"
}
```

**Réponse attendue** (200) :
```json
{
  "message": "OTP envoyé avec succès",
  "expires_in": 900
}
```

📧 **Vérifiez Mailtrap ou votre email** pour le code OTP

---

### **3️⃣ Verify OTP**

```bash
POST http://localhost:8000/api/verify-otp
Content-Type: application/json

{
  "email": "jean@example.com",
  "code": "123456"  // Le code reçu par email
}
```

**Réponse attendue** (200) :
```json
{
  "message": "Email vérifié avec succès",
  "email_verified_at": "2026-04-28T15:30:00.000000Z",
  "access_token": "...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "role": "user",
    "email_verified_at": "2026-04-28T15:30:00.000000Z"
  }
}
```

---

### **4️⃣ Login**

```bash
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "jean@example.com",
  "password": "Password123"
}
```

**Réponse attendue** (200) :
```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com"
  }
}
```

---

### **5️⃣ Get Current User (Protected)**

```bash
GET http://localhost:8000/api/me
Authorization: Bearer {access_token}
```

**Réponse attendue** (200) :
```json
{
  "id": 1,
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "role": "user",
  "created_at": "2026-04-28T15:00:00.000000Z"
}
```

---

### **6️⃣ Logout (Protected)**

```bash
POST http://localhost:8000/api/logout
Authorization: Bearer {access_token}
```

**Réponse attendue** (200) :
```json
{
  "message": "Logged out"
}
```

---

## 🔍 Cas d'erreur à tester

### ❌ OTP expiré

Attendez 15 minutes ou modifiez dans `OtpService.php` la ligne 34 :

```php
'expires_at' => now()->addMinutes(15), // Changez à addSeconds(5) pour tester
```

Puis testez :
```json
{
  "email": "jean@example.com",
  "code": "123456"
}
```

Erreur attendue (422) :
```json
{
  "message": "OTP expiré. Demandez un nouvel OTP.",
  "errors": {"code": [...]}
}
```

### ❌ OTP invalide

```json
{
  "email": "jean@example.com",
  "code": "000000"
}
```

Erreur attendue (422) :
```json
{
  "message": "OTP invalide. Vous avez encore 4 tentative(s).",
  "errors": {"code": [...]}
}
```

---

## ✅ Checklist finale

- [ ] Email configuré dans `.env` ✅
- [ ] Migration OTP exécutée ✅
- [ ] Endpoint `/register` fonctionne ✅
- [ ] Endpoint `/request-otp` envoie l'email ✅
- [ ] Endpoint `/verify-otp` valide le code ✅
- [ ] Endpoint `/login` fonctionne ✅
- [ ] Endpoint `/me` fonctionne (avec token) ✅
- [ ] Endpoint `/logout` fonctionne ✅

---

## 🎯 Prochaines étapes (Phase 2)

Une fois tout validé, on passe à :
1. **Backend Places** - CRUD des lieux
2. **Backend Reviews** - Système d'avis
3. **Frontend** - Interface React

---

## 📞 Points de problème courants

| Problème | Solution |
|----------|----------|
| Email non reçu | Vérifier MAIL_MAILER et credentials dans `.env` |
| OTP expire immédiatement | Vérifier `expires_at` dans OtpService.php |
| 404 sur `/api/request-otp` | Vérifier que OtpController est importé dans api.php |
| CORS error | Ajouter le domaine frontend dans config/cors.php |
| Token invalide | Vérifier que Sanctum est configuré dans User.php |

