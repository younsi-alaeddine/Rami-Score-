# Correction des règles Firebase - Solution au problème de partage

## Le problème

L'erreur "Erreur lors de la création de la partie partagée" indique que Firebase bloque l'écriture dans la base de données à cause des règles de sécurité.

## Solution : Mettre à jour les règles Firebase

### Étape 1 : Aller dans Firebase Console

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionne ton projet `rami-d5c58`
3. Clique sur **"Realtime Database"** dans le menu de gauche
4. Clique sur l'onglet **"Rules"**

### Étape 2 : Remplacer les règles

**Remplace TOUT le contenu** par ces règles :

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
        ".write": true
      }
    },
    "games": {
      "$code": {
        "chat": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

**OU** (version plus simple pour tester rapidement) :

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **Note** : Cette dernière version permet tout (lecture/écriture) pour tester. Pour la production, utilise la première version.

### Étape 3 : Publier

1. Clique sur **"Publish"** en haut à droite
2. Attends la confirmation "Rules published successfully"

### Étape 4 : Tester

1. Rafraîchis l'app (Ctrl+F5)
2. Essaie de créer une partie partagée
3. Ça devrait fonctionner maintenant !

## Vérifications supplémentaires

### Vérifier l'authentification

1. Ouvre la console du navigateur (F12)
2. Regarde s'il y a des erreurs d'authentification
3. Tu devrais voir : `Auth error:` suivi d'un message si problème

### Vérifier la connexion Firebase

Dans la console, tu devrais voir :
- `Creating shared game with code: XXXXXX User: [user-id]`
- Si tu vois une erreur, copie-la et partage-la

## Si ça ne fonctionne toujours pas

1. **Vérifie que Anonymous Auth est activé** :
   - Firebase Console > Authentication > Sign-in method
   - "Anonymous" doit être **Activé**

2. **Vérifie l'URL de la base de données** dans `src/config/firebase.js` :
   - Doit être : `https://rami-d5c58-default-rtdb.europe-west1.firebasedatabase.app`

3. **Vide le cache** :
   - Ctrl+Shift+Delete > Coche "Images et fichiers en cache" > Supprimer
   - Recharge la page (Ctrl+F5)

4. **Vérifie la console** pour les erreurs exactes et partage-les
