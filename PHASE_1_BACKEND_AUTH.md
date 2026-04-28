# 🔐 Phase 1 : Backend Authentication (Laravel)

## 👤 Assigné à : [Ton Nom]

---

## 📋 Responsabilités principales

### 1. API Register
- Créer un endpoint POST pour l'inscription
- Valider les données (email, password, name)
- Hasher le mot de passe
- Créer un nouvel utilisateur en base de données
- Retourner un token JWT ou Sanctum

### 2. API Login
- Créer un endpoint POST pour la connexion
- Vérifier les identifiants (email, password)
- Générer et retourner un token
- Gérer les erreurs d'authentification

### 3. Génération OTP
- Générer un code OTP (One-Time Password)
- Envoyer l'OTP par email ou SMS
- Stocker l'OTP en base de données avec expiration
- Définir un délai d'expiration (ex: 10 minutes)

### 4. Vérification OTP
- Vérifier que l'OTP fourni correspond
- Vérifier que l'OTP n'a pas expiré
- Activer le compte utilisateur après vérification
- Supprimer l'OTP utilisé

### 5. Gestion des tokens
- Implémenter JWT ou Laravel Sanctum
- Générer des tokens lors de la connexion
- Valider les tokens pour les requêtes protégées
- Implémenter le refresh token (optionnel mais recommandé)
- Logout et invalidation des tokens

---

## 🔌 Endpoints API à développer

### 1️⃣ POST `/api/register`

**Description** : Inscrire un nouvel utilisateur

**Request Body** :
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "SecurePassword123",
  "password_confirmation": "SecurePassword123"
}
```

**Response** (201 Created) :
```json
{
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "role": "user",
    "created_at": "2026-04-28T10:30:00Z"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Erreurs possibles** :
- `400` : Validation échouée (email déjà existant, password faible, etc.)
- `422` : Données manquantes ou invalides

---

### 2️⃣ POST `/api/login`

**Description** : Connecter un utilisateur

**Request Body** :
```json
{
  "email": "jean@example.com",
  "password": "SecurePassword123"
}
```

**Response** (200 OK) :
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "role": "user"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Erreurs possibles** :
- `401` : Identifiants invalides
- `422` : Données manquantes

---

### 3️⃣ POST `/api/verify-otp`

**Description** : Vérifier le code OTP

**Request Body** :
```json
{
  "email": "jean@example.com",
  "otp": "123456"
}
```

**Response** (200 OK) :
```json
{
  "message": "OTP vérifié avec succès",
  "email_verified_at": "2026-04-28T10:35:00Z",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Erreurs possibles** :
- `401` : OTP invalide
- `410` : OTP expiré
- `422` : Données manquantes

---

### 4️⃣ POST `/api/request-otp` (Optionnel mais utile)

**Description** : Demander un nouvel OTP

**Request Body** :
```json
{
  "email": "jean@example.com"
}
```

**Response** (200 OK) :
```json
{
  "message": "OTP envoyé par email",
  "expires_in": 600  // en secondes
}
```

---

### 5️⃣ POST `/api/logout` (Optionnel)

**Description** : Déconnecter l'utilisateur

**Request** :
- Header : `Authorization: Bearer {token}`

**Response** (200 OK) :
```json
{
  "message": "Déconnexion réussie"
}
```

---

## 🛠️ Stack technologique à utiliser

### Package Laravel recommandés

```bash
composer require tymon/jwt-auth
# OU
composer install (Sanctum est inclus par défaut dans Laravel 8+)
```

### Choix : JWT vs Sanctum

| Aspect | JWT | Sanctum |
|--------|-----|---------|
| **Stockage** | Stateless | Stateless + DB tokens |
| **Sécurité** | Très sûr | Très sûr |
| **Refresh** | Manual | Automatique |
| **Recommandation** | Pour API pures | Pour apps Laravel modernes |

**👉 Recommandation** : **Sanctum** (plus simple à mettre en place dans Laravel)

---

## 📁 Structure de dossiers à créer

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php     ✅ À modifier
│   │   │   └── OtpController.php      ✨ À créer
│   │   └── Requests/
│   │       ├── RegisterRequest.php    ✨ À créer
│   │       ├── LoginRequest.php       ✨ À créer
│   │       └── VerifyOtpRequest.php   ✨ À créer
│   ├── Models/
│   │   ├── User.php                  ✅ À modifier
│   │   └── Otp.php                   ✨ À créer
│   └── Services/
│       ├── AuthService.php            ✨ À créer
│       └── OtpService.php             ✨ À créer
├── database/
│   └── migrations/
│       ├── 2014_10_12_000000_create_users_table.php ✅ À vérifier
│       └── 2026_04_28_000001_create_otps_table.php  ✨ À créer
└── routes/
    └── api.php                        ✅ À modifier
```

---

## 🔑 Tâches détaillées (Checklist)

### Phase 1.1 : Configuration de base

- [ ] Installer et configurer Sanctum (ou JWT)
- [ ] Configurer les variables d'environnement (JWT_SECRET ou similaire)
- [ ] Générer les clés de chiffrement nécessaires

### Phase 1.2 : Modèles et migrations

- [ ] Créer le modèle `Otp` avec les champs :
  - `id`
  - `email`
  - `code` (6 chiffres)
  - `expires_at`
  - `created_at`
- [ ] Créer la migration pour la table `otps`
- [ ] Modifier le modèle `User` pour ajouter les colonnes de vérification
- [ ] Ajouter les relations nécessaires

### Phase 1.3 : Validation des requêtes

- [ ] Créer `RegisterRequest.php` avec règles de validation
- [ ] Créer `LoginRequest.php` avec règles de validation
- [ ] Créer `VerifyOtpRequest.php` avec règles de validation

### Phase 1.4 : Services (Logique métier)

- [ ] Créer `AuthService.php` avec méthodes :
  - `register()`
  - `login()`
  - `generateToken()`
  - `validateToken()`
  - `logout()`
- [ ] Créer `OtpService.php` avec méthodes :
  - `generate()`
  - `send()` (email)
  - `verify()`
  - `cleanup()` (supprimer les OTP expirés)

### Phase 1.5 : Contrôleurs

- [ ] Compléter `AuthController.php` avec :
  - `register()`
  - `login()`
  - `logout()`
- [ ] Créer `OtpController.php` avec :
  - `request()`
  - `verify()`

### Phase 1.6 : Routes

- [ ] Ajouter les routes dans `routes/api.php` :
  - POST `/api/register`
  - POST `/api/login`
  - POST `/api/request-otp`
  - POST `/api/verify-otp`
  - POST `/api/logout` (protected)

### Phase 1.7 : Sécurité et tests

- [ ] Ajouter la validation CSRF (si nécessaire)
- [ ] Implémenter le rate limiting pour les endpoints sensibles
- [ ] Tester les endpoints avec Postman/Insomnia
- [ ] Vérifier les erreurs et codes HTTP
- [ ] Implémenter la gestion des exceptions

---

## 🔒 Règles de sécurité importantes

✅ **À faire** :

1. **Hasher les mots de passe** : Utiliser `bcrypt` (Laravel par défaut)
   ```php
   'password' => Hash::make($request->password)
   ```

2. **Valider tous les inputs** : Règles strictes
   ```php
   $request->validate([
       'email' => 'required|email|unique:users',
       'password' => 'required|min:8|confirmed',
   ]);
   ```

3. **Rate limiting** : Limiter les tentatives
   ```php
   Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
   ```

4. **HTTPS obligatoire** : En production
   ```php
   URL::forceScheme('https');
   ```

5. **Tokens avec expiration** : Sanctum le fait automatiquement

6. **OTP sécurisé** :
   - Générer 6 chiffres aléatoires
   - Expiration : 10-15 minutes max
   - Limiter les tentatives (3-5 max)

❌ **À ÉVITER** :

- Ne jamais stocker les mots de passe en plain text
- Ne jamais envoyer les tokens en URL
- Ne jamais logger les mots de passe
- Ne jamais avoir des OTP trop longs (3-6 chiffres)
- Ne jamais oublier la validation côté serveur

---

## 📧 Envoi d'email pour OTP

### Option 1 : Mailtrap (Gratuit, parfait pour développement)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@app.com
```

### Option 2 : Gmail (Gratuit)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
```

### Créer une Mailable

```php
// app/Mail/SendOtpMail.php
php artisan make:mail SendOtpMail
```

---

## 🧪 Testing avec Postman/Insomnia

### Importez cette collection

```json
{
  "info": {
    "name": "App Recommandation Auth API"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:8000/api/register",
        "body": {
          "raw": "{\"name\": \"Test User\", \"email\": \"test@test.com\", \"password\": \"Password123\", \"password_confirmation\": \"Password123\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:8000/api/login",
        "body": {
          "raw": "{\"email\": \"test@test.com\", \"password\": \"Password123\"}"
        }
      }
    },
    {
      "name": "Request OTP",
      "request": {
        "method": "POST",
        "url": "http://localhost:8000/api/request-otp",
        "body": {
          "raw": "{\"email\": \"test@test.com\"}"
        }
      }
    },
    {
      "name": "Verify OTP",
      "request": {
        "method": "POST",
        "url": "http://localhost:8000/api/verify-otp",
        "body": {
          "raw": "{\"email\": \"test@test.com\", \"otp\": \"123456\"}"
        }
      }
    }
  ]
}
```

---

## 📝 Notes importantes

1. **Commencer par la structure** : Créer les migrations et modèles d'abord
2. **Tester au fur et à mesure** : Ne pas attendre la fin pour tester
3. **Documenter le code** : Ajouter des commentaires
4. **Gérer les erreurs** : Retourner des messages clairs
5. **Logs** : Utiliser Laravel logs pour les erreurs sensibles

---

## 📞 Points de contact

- Code : `/backend`
- Documentation API : [Voir DOCUMENTATION.md](DOCUMENTATION.md)
- Questions frontend : À coordonner avec l'équipe React

---

## ✅ Critères de validation (Avant merge)

- [ ] Tous les endpoints retournent les bons codes HTTP
- [ ] La validation des inputs fonctionne correctement
- [ ] Les tokens sont générés et valides
- [ ] Les OTP expirent correctement
- [ ] Les erreurs sont gérées proprement
- [ ] Le code est commenté et lisible
- [ ] Les tests passent
- [ ] Aucune erreur de sécurité

