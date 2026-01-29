# Guide de débogage - Problèmes de partage et fonctionnalités

## Vérifications à faire

### 1. Vérifier la console du navigateur
Ouvre la console (F12) et regarde s'il y a des erreurs :
- Erreurs Firebase (permissions, connexion)
- Erreurs d'authentification
- Erreurs de réseau

### 2. Vérifier les règles Firebase Realtime Database

Va dans Firebase Console > Realtime Database > Rules et mets :

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

**Important** : Clique sur "Publish" après modification.

### 3. Vérifier que Authentication est activé

Dans Firebase Console > Authentication > Sign-in method :
- ✅ Anonymous : Activé
- ✅ Email/Password : Activé (optionnel)
- ✅ Google : Activé (optionnel)

### 4. Tester étape par étape

#### Test 1 : Authentification
1. Ouvre la console (F12)
2. Regarde s'il y a des erreurs d'auth
3. Va sur "Mes Statistiques" - ça devrait fonctionner même si vide

#### Test 2 : Créer une partie partagée
1. Va sur "Nouvelle Partie"
2. Coche "🔗 مشاركة في الوقت الفعلي"
3. Clique sur "إبدا اللعب"
4. Regarde la console pour les erreurs
5. Un code devrait apparaître en haut du scoreboard

#### Test 3 : Rejoindre une partie
1. Sur un autre appareil/navigateur
2. Va sur "انضم إلى لعبة مشتركة"
3. Entre le code à 6 chiffres
4. Regarde la console pour les erreurs

#### Test 4 : Chat
1. Dans une partie partagée
2. Le chat devrait apparaître en bas
3. Envoie un message
4. Regarde la console pour les erreurs

## Erreurs communes

### "Permission denied"
→ Vérifie les règles Firebase (étape 2)

### "Game not found"
→ Vérifie que le code est correct (6 chiffres)
→ Vérifie que la partie existe dans Firebase Console > Realtime Database > games

### "Auth error"
→ Vérifie que Anonymous Auth est activé
→ Vérifie la console pour plus de détails

### Chat ne fonctionne pas
→ Vérifie que tu es dans une partie partagée (code visible)
→ Vérifie la console pour les erreurs Firebase

## Solution rapide

Si rien ne fonctionne :

1. **Vérifie la configuration Firebase** dans `src/config/firebase.js`
2. **Vérifie les règles** dans Firebase Console
3. **Vide le cache** du navigateur (Ctrl+Shift+Delete)
4. **Recharge** la page (Ctrl+F5)
5. **Vérifie la console** pour les erreurs exactes

## Logs de débogage

Les erreurs sont maintenant loggées dans la console. Regarde :
- `console.error('Error creating shared game:', err)`
- `console.error('Error updating shared game:', err)`
- `console.error('Auth error:', error)`

Ces messages t'aideront à identifier le problème exact.
