# 📊 Suivi du projet - App Recommandation

## 🎯 Vue d'ensemble du projet

**Projet** : Application de gestion et recommandation de lieux  
**Statut** : 🟡 En cours - Phase 1  
**Date de démarrage** : 28 avril 2026  

---

## 📅 Phases du projet

### Phase 1 : Backend Authentication ✅ En cours

| Tâche | Responsable | Statut | Deadline |
|-------|-------------|--------|----------|
| API Register | [Ton Nom] | 🟡 À faire | TBD |
| API Login | [Ton Nom] | 🟡 À faire | TBD |
| Génération OTP | [Ton Nom] | 🟡 À faire | TBD |
| Vérification OTP | [Ton Nom] | 🟡 À faire | TBD |
| Gestion des tokens (JWT/Sanctum) | [Ton Nom] | 🟡 À faire | TBD |

**Détails complets** : Voir [PHASE_1_BACKEND_AUTH.md](PHASE_1_BACKEND_AUTH.md)

---

### Phase 2 : Backend Places (à définir)

- [ ] CRUD Places
- [ ] Filtrage par catégories
- [ ] Géolocalisation
- [ ] Recherche

---

### Phase 3 : Backend Reviews & Photos (à définir)

- [ ] CRUD Reviews
- [ ] Calcul des notes moyennes
- [ ] Upload Photos
- [ ] Galerie

---

### Phase 4 : Frontend (à définir)

- [ ] Composants React
- [ ] Intégration Google Maps
- [ ] Authentification UI
- [ ] Formulaires

---

## 📌 Points de décision

| Point | État | Notes |
|-------|------|-------|
| **JWT vs Sanctum** | ✅ Décidé | → Utiliser **Sanctum** (plus simple) |
| **Email/SMS OTP** | 🟡 À décider | Email ou SMS ? |
| **Délai expiration OTP** | ✅ Décidé | → 10-15 minutes |
| **Rate limiting** | 🟡 À valider | À implémenter sur /login et /register |

---

## 🚀 Prochaines étapes immédiates

1. **Lire [PHASE_1_BACKEND_AUTH.md](PHASE_1_BACKEND_AUTH.md)** pour les détails complets
2. **Configurer Laravel** et installer les packages nécessaires
3. **Créer les migrations** pour la table `otps`
4. **Implémenter les services** (`AuthService`, `OtpService`)
5. **Tester avec Postman** au fur et à mesure

---

## 📚 Documentation associée

- [DOCUMENTATION.md](DOCUMENTATION.md) - Vue d'ensemble du projet
- [PHASE_1_BACKEND_AUTH.md](PHASE_1_BACKEND_AUTH.md) - Détails de tes tâches Phase 1
- Backend code : `/backend`

