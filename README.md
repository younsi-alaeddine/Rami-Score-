# Rami Score – تونسي

تطبيق ويب لحساب ومتابعة **سكورات لعبة الرامي التونسي**. Offline d'abord, avec option de partage en temps réel (Firebase).

**🌐 Site en ligne / Live demo:** [https://rami-score.vercel.app](https://rami-score.vercel.app)

**تنبيه قانوني (مهم):** التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.  
**Legal disclaimer:** This app calculates scores only. No gambling or money involved.

---

## Fonctionnalités

- **Accueil** : Nouvelle partie, Historique, Rejoindre une partie, Mes stats, Mes amis
- **Nouvelle partie** : 2–6 joueurs, noms (ou noms par défaut tunisiens), Rami tunisien, option partage en temps réel
- **Scoreboard** : Totaux auto, scores par round (0 ou positifs), classement en direct, arrêt à 1000 points, bouton « Copier le code » en mode partagé
- **Résumé** : Classement final, gagnant mis en avant, confetti, sauvegarde LocalStorage
- **Historique** : Liste des parties, détails, supprimer une partie ou tout effacer
- **Rejoindre une partie** : Saisie du code 6 chiffres pour voir les scores en temps réel
- **Mes stats** : Parties jouées, victoires, score moyen, meilleur score, graphiques, succès
- **Mes amis** : Code ami, ajout par code, liste avec statut en ligne/hors ligne
- **Langues** : Français et arabe tunisien (Darja), sélecteur + détection au premier lancement
- **Thème** : Mode clair / sombre
- **Auth** : Connexion Google + anonyme, lien anonyme → Google pour garder les stats

## Tech stack

- React (Vite), JavaScript
- LocalStorage + Firebase (Realtime Database, Auth) pour partage et stats
- Offline-first, PWA (manifest)

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre l’URL affichée dans le terminal (ex. `http://localhost:5173`).

## Build production

```bash
npm run build
```

Les fichiers sont générés dans `dist/`.

## Notes

- Données sauvegardées en local (LocalStorage) et, si partage activé, synchronisées via Firebase.
- Aucun argent, pari, récompense ou paiement — uniquement un suivi de scores.

