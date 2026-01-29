# Configuration Firebase Authentication

## Étapes pour activer l'authentification

### 1. Activer Authentication dans Firebase Console

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionne ton projet `rami-d5c58`
3. Dans le menu de gauche, clique sur **"Authentication"**
4. Clique sur **"Get started"** si c'est la première fois
5. Va dans l'onglet **"Sign-in method"**

### 2. Activer les méthodes de connexion

#### A. Anonymous Authentication (Recommandé pour débuter)
1. Clique sur **"Anonymous"**
2. Active le toggle **"Enable"**
3. Clique sur **"Save"**

#### B. Email/Password (Optionnel)
1. Clique sur **"Email/Password"**
2. Active le toggle **"Enable"**
3. Clique sur **"Save"**

### 3. Configurer les règles de sécurité Realtime Database

Dans Firebase Console > Realtime Database > Rules, mets :

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "games": {
      "$code": {
        ".read": true,
        ".write": "auth != null"
      }
    }
  }
}
```

Puis clique sur **"Publish"**.

## Fonctionnalités activées

✅ **Authentification anonyme automatique** : Chaque utilisateur est automatiquement connecté
✅ **Statistiques utilisateur** : Suivi des parties, victoires, scores
✅ **Chat en temps réel** : Messages dans les parties partagées
✅ **Sauvegarde cloud** : Historique synchronisé

## Test

1. Lance l'app : `npm run dev`
2. L'authentification anonyme se fait automatiquement
3. Va sur **"Mes Statistiques"** pour voir tes stats
4. Crée une partie partagée et teste le chat

## Notes

- L'authentification anonyme ne nécessite aucune configuration utilisateur
- Les stats sont automatiquement mises à jour après chaque partie
- Le chat fonctionne uniquement dans les parties partagées
