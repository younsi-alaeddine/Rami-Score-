# Configuration Firebase pour le partage en temps réel

## Étapes de configuration

### 1. Créer un projet Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Clique sur **"Add project"** ou **"Créer un projet"**
3. Suis les étapes pour créer le projet

### 2. Activer Realtime Database

1. Dans le menu de gauche, clique sur **"Realtime Database"**
2. Clique sur **"Create Database"**
3. Choisis une région (ex: `europe-west1` pour l'Europe)
4. Choisis **"Start in test mode"** (pour le développement)
5. Clique sur **"Enable"**

### 3. Récupérer les clés de configuration

1. Va dans **Project Settings** (⚙️ en haut à gauche)
2. Scroll jusqu'à **"Your apps"**
3. Clique sur l'icône **Web** (`</>`)
4. Enregistre l'app avec un nom (ex: "Rami Score Tunisia")
5. **Copie les valeurs de configuration** qui apparaissent

### 4. Configurer l'app

1. Ouvre le fichier `src/config/firebase.js`
2. Remplace les valeurs `YOUR_*` par tes vraies valeurs :

```javascript
const firebaseConfig = {
  apiKey: 'AIza...', // Ta clé API
  authDomain: 'ton-projet.firebaseapp.com',
  databaseURL: 'https://ton-projet-default-rtdb.firebaseio.com',
  projectId: 'ton-projet-id',
  storageBucket: 'ton-projet.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abc123',
}
```

### 5. Configurer les règles de sécurité (optionnel mais recommandé)

Dans Firebase Console > Realtime Database > Rules, mets :

```json
{
  "rules": {
    "games": {
      "$code": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

⚠️ **Note** : Ces règles permettent à n'importe qui de lire/écrire. Pour la production, ajoute une authentification.

### 6. Tester

1. Lance l'app : `npm install && npm run dev`
2. Crée une nouvelle partie avec **"مشاركة في الوقت الفعلي"** coché
3. Un code à 6 chiffres sera généré
4. Partage ce code avec un ami
5. L'ami peut rejoindre via **"انضم إلى لعبة مشتركة"**

## Fonctionnalités

- ✅ Partage en temps réel via code à 6 chiffres
- ✅ Synchronisation automatique des scores
- ✅ Fonctionne offline (LocalStorage comme fallback)
- ✅ Pas besoin de compte utilisateur

## Dépannage

**Erreur "Permission denied"** :
- Vérifie que les règles de Realtime Database permettent la lecture/écriture

**Erreur "Game not found"** :
- Vérifie que le code est correct (6 chiffres)
- Vérifie que la partie existe dans Firebase Console > Realtime Database

**Pas de synchronisation** :
- Vérifie ta configuration dans `src/config/firebase.js`
- Vérifie la console du navigateur pour les erreurs
