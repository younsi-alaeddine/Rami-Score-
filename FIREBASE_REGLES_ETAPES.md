# 🔥 Corriger PERMISSION_DENIED – Règles Realtime Database

Tu es bien connecté avec Google mais tu as encore **PERMISSION_DENIED**.  
C’est presque toujours les **règles** de la **Realtime Database** (pas Firestore).

---

## ⚠️ Important : Realtime Database, pas Firestore

- **Realtime Database** = menu de gauche **"Realtime Database"** (icône base de données).
- **Firestore** = autre produit, avec "Firestore Database".  
→ Il faut modifier les règles de **Realtime Database** uniquement.

---

## Étape 1 : Ouvrir les règles

1. Va sur **https://console.firebase.google.com**
2. Ouvre le projet **rami-d5c58**
3. Dans le menu de gauche, clique sur **"Realtime Database"** (sous "Build").
4. En haut, ouvre l’onglet **"Règles"** / **"Rules"**.

Si tu vois **"Créer une base de données"** / **"Create Database"**, crée d’abord la base (région **europe-west1** pour correspondre à l’URL de l’app).

---

## Étape 2 : Remplacer TOUT le contenu des règles

**Supprime tout** ce qui est dans l’éditeur de règles, puis colle **exactement** ce qui suit.

### Option A – Pour tester tout de suite (tout autoriser)

Colle ceci **temporairement** pour vérifier que l’app fonctionne :

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Enregistre (Publier). Teste la création de partie partagée.  
Si ça marche → le blocage venait bien des règles. Passe alors à l’option B.

### Option B – Règles correctes (utilisateur connecté = peut écrire)

Une fois que l’option A marche, remplace les règles par :

```json
{
  "rules": {
    "games": {
      "$code": {
        ".read": true,
        ".write": "auth != null"
      }
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

- `auth != null` = toute personne connectée (Google ou anonyme) peut écrire dans `games`.
- Chaque utilisateur ne peut lire/écrire que son propre `users/{uid}`.

---

## Étape 3 : Publier

1. Clique sur **"Publier"** / **"Publish"** (en haut à droite).
2. Attends le message du type "Règles publiées avec succès".

---

## Étape 4 : Tester

1. Rafraîchis l’app (F5 ou Ctrl+F5).
2. Connecte-toi avec Google si besoin.
3. Nouvelle partie → coche "Partage en temps réel" → Démarrer.

Si tu as encore **PERMISSION_DENIED** après avoir mis l’option A et publié :

- Vérifie bien que tu es dans **Realtime Database** → **Rules** (pas Firestore).
- Vérifie que l’URL de la base dans l’app est la même que dans la console :  
  `https://rami-d5c58-default-rtdb.europe-west1.firebasedatabase.app`

---

## Résumé

| Problème              | Solution                                      |
|-----------------------|-----------------------------------------------|
| PERMISSION_DENIED     | Règles Realtime Database (option A puis B)    |
| Mauvais endroit       | Realtime Database, pas Firestore             |
| Règles pas prises     | Tout supprimer, coller le JSON, puis Publier |
