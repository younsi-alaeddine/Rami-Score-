# 🎯 TODO - Amélioration Rami Score Tunisia

## 🎨 DESIGN & UI/UX (Priorité HAUTE)

### 1. Design System Moderne
- [x] **Palette de couleurs tunisienne**
  - [x] Couleurs inspirées de la Tunisie (bleu/blanc/rouge subtils)
  - [x] Dégradés modernes et vibrants
  - [x] Mode sombre avec couleurs chaudes (pas juste noir/gris)

- [x] **Typographie améliorée**
  - [x] Police arabe élégante (Cairo)
  - [x] Police latine moderne (Inter)
  - [x] Tailles de texte responsive
  - [x] Hiérarchie visuelle claire

- [x] **Icônes et illustrations**
  - [x] Emojis cohérents et culturellement adaptés (🇹🇳, couronne, trophée, médailles)
  - [x] Avatars avec initiales (chat, amis, header Google)
  - [ ] Icônes SVG personnalisées (cartes, joueurs)
  - [ ] Illustrations minimalistes style flat design

### 2. Composants UI Modernes
- [x] **Cartes redesignées**
  - [x] Glassmorphism (effet verre dépoli)
  - [x] Ombres douces et profondes
  - [x] Bordures subtiles avec gradients
  - [x] Hover effects élégants

- [x] **Boutons améliorés**
  - [x] Boutons avec gradients animés
  - [x] Effets de ripple au clic
  - [x] États hover/active
  - [x] Bouton flottant (FAB) pour action principale (Nouvelle partie, mobile)

- [x] **Inputs modernes**
  - [x] Focus states avec glow
  - [x] Style glassmorphism
  - [ ] Labels flottants animés
  - [ ] Validation visuelle en temps réel

### 3. Animations & Transitions
- [x] **Animations de page**
  - [x] Transitions fluides entre pages (fade sur changement de route)
  - [x] Loading states élégants (skeleton screens)
  - [x] Animations d'apparition (fade-in)

- [x] **Micro-interactions**
  - [x] Feedback visuel sur chaque action
  - [x] Confetti/celebration quand quelqu'un gagne
  - [x] Animations de score (compteur qui monte)
  - [ ] Animations de cartes qui se retournent

- [ ] **Animations de données**
  - [ ] Graphiques animés pour les stats
  - [ ] Barres de progression animées
  - [ ] Nombres qui comptent (count-up animation)

---

## 🎮 FONCTIONNALITÉS SOCIALES (Priorité HAUTE)

### 4. Aspect Communautaire & Amis
- [x] **Système d'amis**
  - [x] Ajouter des amis par code (8 caractères)
  - [x] Liste d'amis avec avatars
  - [x] Supprimer un ami
  - [x] Liste d'amis avec statut (en ligne/hors ligne)
  - [ ] Historique des parties avec amis
  - [ ] Défis entre amis

- [x] **Parties partagées (temps réel)**
  - [x] Créer une partie partagée (code 6 chiffres)
  - [x] Rejoindre par code
  - [x] Inviter des amis directement depuis la liste
  - [ ] Notifications quand un ami crée une partie
  - [ ] Historique des parties avec chaque ami

- [ ] **Classements sociaux**
  - [ ] Classement global des joueurs tunisiens
  - [ ] Classement entre amis
  - [x] Badges et achievements (première partie, 10 parties, première victoire, 5 victoires)
  - [ ] Streaks (séries de victoires)

### 5. Chat & Communication Améliorés
- [x] **Chat enrichi**
  - [x] Emojis tunisiens (🇹🇳, expressions Darja en raccourcis)
  - [x] Avatars dans les messages
  - [ ] Stickers/GIFs
  - [ ] Messages vocaux
  - [ ] Réactions aux messages (👍❤️😂)

- [ ] **Notifications en temps réel**
  - [ ] Notification quand un ami rejoint
  - [ ] Notification quand quelqu'un ajoute un round
  - [ ] Notification de nouveaux messages
  - [ ] Son de notification (optionnel)

### 6. Authentification & Sécurité
- [x] **Connexion**
  - [x] Authentification anonyme (automatique)
  - [x] Connexion Google (bouton header)
  - [x] Déconnexion
  - [x] Retry auth + messages d'erreur clairs
- [x] **Firebase**
  - [x] Guides règles (FIREBASE_REGLES_ETAPES.md, firebase-rules.json)
  - [x] Message PERMISSION_DENIED avec indication Realtime Database
  - [x] Lier compte anonyme à Google (éviter perte de stats)

### 7. Expérience de Jeu Améliorée
- [x] **Avatars**
  - [x] Avatars par défaut avec initiales (chat, amis, header)
  - [x] Photo de profil Google si connecté
  - [ ] Choix d'avatar/photo personnalisée
  - [ ] Badges sur les avatars (vainqueur, etc.)

- [x] **Effets visuels de jeu**
  - [x] Highlight du joueur en tête (couronne 👑, badge)
  - [x] Animation de victoire (confetti, trophée)
  - [x] Animation quand un round est ajouté (highlight ligne)
  - [ ] Sons de jeu (optionnel)

- [ ] **Mode spectateur amélioré**
  - [x] Plusieurs spectateurs peuvent regarder (rejoindre par code)
  - [x] Compteur de spectateurs en direct
  - [x] Chat pour participants
  - [ ] Vue optimisée pour spectateurs

---

## 🇹🇳 LOCALISATION & CULTURE TUNISIENNE (Priorité MOYENNE)

### 8. Contenu Tunisien
- [x] **Expressions Darja**
  - [x] Raccourcis chat (Yallah, Baraka, M3alich, etc.)
  - [ ] Messages système en Darja authentique
  - [ ] Encouragements en Darja dans l'UI

- [x] **Références culturelles**
  - [x] Couleurs inspirées de la Tunisie
  - [x] Noms de joueurs par défaut tunisiens
  - [ ] Illustrations avec éléments tunisiens subtils

- [ ] **Calendrier & Fêtes**
  - [ ] Affichage des dates en format tunisien
  - [ ] Messages spéciaux pendant les fêtes (Aïd, etc.)
  - [ ] Thèmes saisonniers

### 9. Multilingue Amélioré
- [x] **Traductions**
  - [x] Textes principaux en FR et AR-TN
  - [x] Messages d'erreur traduits
  - [x] Auth Google, amis, chat, Firebase
  - [ ] Tooltips et hints partout traduits

- [x] **Détection automatique**
  - [x] Détection de la langue du navigateur au premier lancement
  - [x] Suggestion de langue (FR/AR) via bandeau
  - [x] Mémorisation de la préférence (localStorage)

---

## 📊 STATISTIQUES & ANALYTICS (Priorité MOYENNE)

### 10. Statistiques Avancées
- [x] **Stats de base**
  - [x] Page Mes Statistiques (parties, victoires, score moyen, meilleur score)
  - [x] Mise à jour après chaque partie
  - [ ] Graphique d'évolution des scores
  - [ ] Graphique de performance par mois
  - [ ] Comparaison avec amis

- [ ] **Analyses détaillées**
  - [ ] Score moyen par partie
  - [ ] Taux de victoire
  - [ ] Statistiques par type de Rami
  - [ ] Heatmap des parties (calendrier)

- [ ] **Achievements & Badges**
  - [ ] Badge "Première victoire"
  - [ ] Badge "10 parties jouées"
  - [ ] Badge "Invincible" (5 victoires d'affilée)
  - [ ] Badge "Social" (10 parties avec amis)

---

## 🚀 PERFORMANCE & TECHNIQUE (Priorité BASSE)

### 11. Optimisations
- [x] **Performance**
  - [x] Lazy loading des pages (React.lazy + Suspense)
  - [x] Code splitting (par route)
  - [ ] Optimisation des images
  - [ ] Cache intelligent

- [x] **PWA (Progressive Web App)**
  - [x] Manifest.json complet
  - [ ] Icône d'app personnalisée (vite.svg pour l'instant)
  - [ ] Splash screen
  - [x] Installation sur mobile (Add to Home Screen)
  - [ ] Service Worker (déjà présent si configuré)

- [x] **Accessibilité**
  - [x] Lien "Aller au contenu" (skip link)
  - [x] role="main", id="main"
  - [ ] Support clavier complet
  - [ ] Contraste des couleurs (déjà vérifié)
  - [ ] Taille de texte ajustable

---

## 🎁 FONCTIONNALITÉS BONUS (Priorité BASSE)

### 12. Fonctionnalités Avancées
- [ ] **Tournois**
  - [ ] Créer un tournoi
  - [ ] Brackets automatiques
  - [ ] Classement du tournoi

- [ ] **Replay & Analyse**
  - [ ] Revoir une partie round par round
  - [ ] Export PDF des résultats
  - [ ] Partage de résultats (lien, image)

- [ ] **Thèmes personnalisables**
  - [x] Mode clair / sombre
  - [ ] Thème "Classique Tunisien"
  - [ ] Thème "Moderne" / "Sombre Premium"

- [ ] **Son & Audio**
  - [ ] Sons de jeu (optionnel)
  - [ ] Musique d'ambiance (optionnel)
  - [ ] Contrôle du volume

---

## 📱 MOBILE FIRST (Priorité HAUTE)

### 13. Expérience Mobile
- [x] **Design responsive**
  - [x] Layout adaptatif
  - [x] Bottom navigation bar sur mobile
  - [ ] Gestures (swipe, pull to refresh)
  - [x] Touch targets plus grands (min 44px boutons/inputs sur mobile)

- [ ] **Optimisations mobile**
  - [ ] Performance sur mobile
  - [ ] Réduction de la consommation de données
  - [ ] Support offline complet (SW + cache)

---

## 🎯 PRIORITÉS RECOMMANDÉES

### Phase 1 – Fait ✅
1. Design System (couleurs, typo, glassmorphism)
2. Composants UI (cartes, boutons, inputs)
3. Système d'amis (code, liste, suppression)
4. Chat enrichi (emojis, Darja, avatars)
5. Auth Google + anonyme + retry
6. Règles Firebase + guides (FIREBASE_REGLES_ETAPES, AUTH_FIX)
7. Highlight leader, confetti, médailles
8. i18n FR/AR pour toutes les nouvelles fonctionnalités

### Phase 2 – Fait ✅
1. [x] Statut en ligne/hors ligne des amis (presence Firebase)
2. [x] Graphiques pour les stats (StatBar + CountUp)
3. [x] Notifications (toast round ajouté)
4. [x] Détection langue au premier lancement + bandeau
5. [x] Bottom nav mobile
6. [x] Lier compte anonyme → Google (conserver les stats)

### Phase 3 – En cours / Nice to have
1. [x] Achievements & badges (déjà en place)
2. [ ] Stickers / réactions chat
3. [x] PWA (manifest, install)
4. [x] Transitions pages, FAB, noms tunisiens, lazy loading, touch targets, skip link
5. [ ] Tournois / replay
6. [ ] Thèmes supplémentaires

---

## 💡 IDÉES CRÉATIVES

- [ ] **Mode "Café"** : Ambiance café tunisien avec sons d'ambiance
- [ ] **Mode "Compétition"** : Interface plus sérieuse pour tournois
- [ ] **Mode "Détente"** : Interface plus douce pour parties entre amis
- [ ] **Stickers personnalisés** : Stickers tunisiens uniques
- [ ] **Calendrier de parties** : Planifier des parties à l'avance
- [ ] **Rappels** : Notifier les amis pour jouer ensemble

---

## 📝 NOTES

- Toujours garder l'aspect **légal** (pas d'argent, pas de gambling)
- L'app doit rester **légère** et **rapide**
- Privilégier l'**expérience utilisateur** avant tout
- Tester sur **vraies parties** entre amis tunisiens
- Collecter les **feedbacks** des utilisateurs

---

**Dernière mise à jour** : 2026-01-29 (Phase 3 avancée)
