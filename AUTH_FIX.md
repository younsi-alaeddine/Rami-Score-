# 🔐 Guide de Résolution - Authentification Firebase

## Problème : "Authentification requise pour partager une partie"

Si tu vois ce message, voici comment le résoudre :

### ✅ Solution 1 : Vérifier Firebase Console

1. **Ouvre Firebase Console** : https://console.firebase.google.com/
2. **Sélectionne ton projet** : `rami-d5c58`
3. **Va dans Authentication** → **Sign-in method**
4. **Vérifie que "Anonyme" est activé** :
   - Si non activé → Clique sur "Anonyme" → Active-le → Sauvegarde

### ✅ Solution 2 : Vérifier les Règles Realtime Database

1. **Dans Firebase Console** → **Realtime Database** → **Règles**
2. **Assure-toi que les règles permettent l'accès** :

```json
{
  "rules": {
    "games": {
      ".read": true,
      ".write": true
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || true",
        ".write": "$uid === auth.uid || true"
      }
    }
  }
}
```

3. **Clique sur "Publier"** pour sauvegarder

### ✅ Solution 3 : Utiliser le bouton "Réessayer"

Dans la page "Nouvelle Partie" :
- Coche "🔗 Partager en temps réel"
- Si tu vois un message d'erreur, clique sur **"🔄 Réessayer"**
- L'app tentera de se connecter automatiquement

### ✅ Solution 4 : Rafraîchir la page

Parfois, un simple rafraîchissement (F5) résout le problème :
- L'authentification anonyme se fait automatiquement au chargement
- Si ça ne marche pas, vérifie la console du navigateur (F12) pour voir les erreurs

### ✅ Solution 5 : Vérifier la Console du Navigateur

1. **Ouvre la console** (F12 → Console)
2. **Cherche les messages** :
   - ✅ `Authentification anonyme réussie` = Tout va bien
   - ❌ `Erreur d'authentification` = Problème à résoudre
3. **Note le code d'erreur** et vérifie ci-dessous :

#### Codes d'erreur courants :

- **`auth/operation-not-allowed`** :
  - L'authentification anonyme n'est pas activée dans Firebase
  - **Solution** : Active-la dans Firebase Console (Solution 1)

- **`auth/network-request-failed`** :
  - Problème de connexion internet
  - **Solution** : Vérifie ta connexion, réessaye

- **`auth/too-many-requests`** :
  - Trop de tentatives
  - **Solution** : Attends quelques minutes, réessaye

- **`permission-denied`** :
  - Problème avec les règles Firebase
  - **Solution** : Vérifie les règles (Solution 2)

### 🔍 Vérification Rapide

Pour vérifier si l'authentification fonctionne :

1. **Ouvre la console** (F12)
2. **Tape** : `firebase.auth().currentUser`
3. **Si tu vois un objet** = Authentification OK ✅
4. **Si tu vois `null`** = Problème d'authentification ❌

### 📝 Notes

- L'authentification anonyme est **automatique** au chargement de l'app
- Elle se fait **en arrière-plan**, tu n'as rien à faire
- Si ça ne marche pas, c'est généralement un problème de configuration Firebase

### 🆘 Besoin d'aide ?

Si rien ne fonctionne :
1. Vérifie que tu es bien connecté à internet
2. Vérifie que Firebase est bien configuré (voir `FIREBASE_SETUP.md`)
3. Vérifie les règles de sécurité (voir `FIREBASE_RULES_FIX.md`)
