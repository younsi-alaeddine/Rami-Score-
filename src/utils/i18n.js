// Translation system for French and Tunisian Arabic

const translations = {
  fr: {
    // Home
    appTitle: 'Rami Score – تونسي',
    appSubtitle: 'Cette application calcule uniquement les scores. Aucun jeu d\'argent ni argent impliqué.',
    homeTagline: 'Suivez les scores de vos parties entre amis',
    newGame: 'Nouvelle Partie',
    gameHistory: 'Historique',
    joinGame: '🔗 Rejoindre une partie partagée (code)',
    
    // New Game
    newGameTitle: 'Nouvelle Partie',
    newGameSubtitle: 'Choisissez les joueurs et commencez à suivre les scores (0 ou valeurs positives uniquement).',
    numberOfPlayers: 'Nombre de joueurs',
    ramiType: 'Type de Rami',
    tunisianRami: 'Rami Tunisien',
    playerName: 'Nom du joueur',
    playerNameHint: 'Vous pouvez laisser vide ; un nom par défaut sera utilisé.',
    shareRealTime: '🔗 Partage en temps réel (les amis peuvent voir les scores avec un code)',
    startGame: 'Commencer la Partie',
    offline: '⚪ Hors ligne • Local',
    online: '🟢 En ligne • Partagé',
    
    // Join Game
    joinGameTitle: 'Rejoindre une partie partagée',
    joinGameSubtitle: 'Entrez le code à 6 chiffres pour voir les résultats en temps réel',
    gameCode: 'Code de la partie (6 chiffres)',
    gameCodeHint: 'Demandez le code au propriétaire de la partie',
    cancel: 'Annuler',
    join: 'Rejoindre',
    connecting: 'Connexion...',
    codeError: 'Le code est incorrect ou la partie n\'existe pas',
    codeRequired: 'Veuillez entrer un code à 6 chiffres',
    
    // Scoreboard
    scoreboardTitle: 'Tableau des Scores',
    scoreboardSubtitle: 'Le total le plus bas est le meilleur. Entrez 0 ou des nombres positifs uniquement. La partie s\'arrête automatiquement si un joueur atteint {max} points.',
    player: 'Joueur',
    totalScore: 'Score Total',
    rank: 'Rang',
    newRound: 'Nouveau Round',
    roundsCount: 'Rondes: {count}',
    enterScore: 'Entrez 0 ou un nombre positif uniquement.',
    addRound: 'Ajouter une Ronde',
    roundAdded: 'Round ajouté',
    discardGame: 'Annuler la Partie',
    endGame: 'Terminer la Partie',
    roundsList: 'Liste des Rondes (dernière en haut)',
    totalsAuto: 'Totaux calculés automatiquement',
    round: 'Ronade',
    total: 'Total',
    shareCode: '🔗 Code: {code}',
    copyCode: 'Copier le code',
    codeCopied: 'Code copié',
    inviteFriends: 'Inviter des amis',
    inviteFriendsSubtitle: 'Partagez le code avec vos amis pour qu\'ils rejoignent la partie.',
    copyCodeFor: 'Copier le code pour {name}',
    spectatorsCount: '{count} spectateur(s)',
    noFriendsToInvite: 'Aucun ami à inviter. Ajoutez des amis depuis la page Amis.',
    
    // Summary
    summaryTitle: 'Résumé Final',
    summarySubtitle: 'Enregistré localement • {date}',
    winner: 'Gagnant: {name} (score total le plus bas)',
    viewHistory: 'Voir l\'Historique',
    
    // History
    historyTitle: 'Historique des Parties',
    historySubtitle: 'Enregistré localement sur cet appareil uniquement.',
    gamesCount: 'Parties: {count}',
    noGames: 'Aucune partie enregistrée pour le moment.',
    startNewGame: 'Commencer une Nouvelle Partie',
    clearAll: 'Effacer tout l\'Historique',
    tip: 'Astuce: Le score le plus bas gagne.',
    date: 'Date',
    players: 'Joueurs',
    type: 'Type',
    actions: 'Actions',
    view: 'Voir',
    delete: 'Supprimer',
    
    // Game Details
    gameDetailsTitle: 'Détails de la Partie',
    backToHistory: 'Retour à l\'Historique',
    deleteGame: 'Supprimer la Partie',
    
    // Common
    home: 'Accueil',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    language: 'Langue',
    french: 'Français',
    tunisian: 'Tunisien',
    suggestLanguage: 'Choisir la langue',
    suggestLanguageSub: 'Utiliser le français ou le tunisien (arabe) ?',
    useThisLanguage: 'Utiliser cette langue',
    offlineFirst: 'Hors ligne d\'abord. Stockage local + Cloud (Firebase).',
    disclaimer: 'Cette application calcule uniquement les scores. Aucun jeu d\'argent ni argent impliqué.',
    
    // 404
    notFound: 'Page non trouvée',
    notFoundSubtitle: 'La page que vous recherchez n\'existe pas.',
    goHome: 'Retour à l\'accueil',
    errorOccurred: 'Une erreur est survenue',
    errorOccurredHint: 'Rechargez la page ou retournez à l\'accueil.',
    skipToContent: 'Aller au contenu',
    
    // Chat
    chat: 'Chat',
    typeMessage: 'Tapez un message...',
    send: 'Envoyer',
    noMessages: 'Aucun message',
    
    // Stats
    myStats: 'Mes Statistiques',
    gamesPlayed: 'Parties jouées',
    gamesWon: 'Victoires',
    totalRounds: 'Total rounds',
    averageScore: 'Score moyen',
    bestScore: 'Meilleur score',
    statsOverview: 'Aperçu des stats',
    achievements: 'Succès',
    firstGame: 'Première partie',
    tenGames: '10 parties',
    firstWin: 'Première victoire',
    fiveWins: '5 victoires',
    profile: 'Profil',
    signInRequired: 'Connexion requise',
    noStats: 'Aucune statistique disponible',
    gameEnded: 'La partie a été terminée',
    gameEndedAuto: 'La partie s\'est terminée automatiquement',
    addedRound: 'a ajouté un round',
    shareError: 'Erreur lors de la création de la partie partagée.',
    shareErrorCheck: 'Vérifiez les règles Realtime Database et que l\'authentification est activée.',
    permissionDeniedHint: '→ Firebase Console → Realtime Database (pas Firestore) → Règles → Colle les règles du fichier FIREBASE_REGLES_ETAPES.md → Publier.',
    waitingAuth: 'Attente de l\'authentification...',
    authRequired: 'Authentification requise pour partager une partie.',
    authRequiredHint: 'L\'authentification est nécessaire pour partager une partie en temps réel.',
    retryAuth: 'Réessayer l\'authentification',
    authReady: 'Authentification prête',
    lowestScore: 'Score le plus bas',
    
    // Friends
    myFriends: 'Mes Amis',
    friendsSubtitle: 'Ajoutez des amis pour jouer ensemble',
    friendsCount: 'Amis: {count}',
    myFriendCode: 'Mon code ami',
    shareCodeWithFriends: 'Partagez ce code avec vos amis',
    addFriendByCode: 'Ajouter un ami par code',
    enterFriendCode: 'Entrez un code ami',
    enterFriendCodeHint: 'Entrez le code à 8 caractères de votre ami',
    adding: 'Ajout...',
    add: 'Ajouter',
    friendsList: 'Liste des amis',
    addedOn: 'Ajouté le',
    remove: 'Retirer',
    noFriendsYet: 'Aucun ami pour le moment',
    addFriendsHint: 'Partagez votre code avec vos amis pour les ajouter',
    friendNotFound: 'Ami non trouvé',
    cannotAddSelf: 'Vous ne pouvez pas vous ajouter vous-même',
    errorAddingFriend: 'Erreur lors de l\'ajout',
    confirmRemoveFriend: 'Supprimer cet ami ?',
    
    // Google auth
    signInWithGoogle: 'Connexion Google',
    signOut: 'Déconnexion',
    signedIn: 'Connecté',
    menu: 'Menu',
    close: 'Fermer',
    changeMyName: 'Changer mon nom',
    changeMyNameTitle: 'Modifier votre nom',
    yourName: 'Votre nom',
    save: 'Enregistrer',
    googleSignInError: 'Erreur lors de la connexion Google.',
  },
  'ar-tn': {
    // Home
    appTitle: 'Rami Score – تونسي',
    appSubtitle: 'التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.',
    homeTagline: 'تابع نقاط لعبك مع أصحابك',
    newGame: 'لعبة جديدة',
    gameHistory: 'سجل الألعاب',
    joinGame: '🔗 انضم إلى لعبة مشتركة (كود)',
    
    // New Game
    newGameTitle: 'لعبة جديدة',
    newGameSubtitle: 'اختر اللاعبين وابدأ تتبع النقاط (0 أو أرقام موجبة فقط).',
    numberOfPlayers: 'عدد اللاعبين',
    ramiType: 'نوع الرامي',
    tunisianRami: 'رامي تونسي',
    playerName: 'اسم اللاعب',
    playerNameHint: 'يمكنك تركه فارغًا ؛ سيتم استخدام اسم افتراضي.',
    shareRealTime: '🔗 مشاركة في الوقت الفعلي (الأصدقاء يمكنهم رؤية النتائج بكود)',
    startGame: 'إبدا اللعب',
    offline: '⚪ غير متصل • محلي',
    online: '🟢 متصل • مشارك',
    
    // Join Game
    joinGameTitle: 'انضم إلى لعبة مشتركة',
    joinGameSubtitle: 'أدخل الكود المكون من 6 أرقام لمشاهدة النتائج في الوقت الفعلي',
    gameCode: 'كود اللعبة (6 أرقام)',
    gameCodeHint: 'اطلب الكود من صاحب اللعبة',
    cancel: 'إلغاء',
    join: 'انضم',
    connecting: 'جاري الاتصال...',
    codeError: 'الكود غير صحيح أو اللعبة غير موجودة',
    codeRequired: 'الرجاء إدخال كود مكون من 6 أرقام',
    
    // Scoreboard
    scoreboardTitle: 'صفحة السكور',
    scoreboardSubtitle: 'أقل مجموع هو الأحسن. أدخل 0 أو أرقام موجبة فقط. اللعبة تتوقف آليًا إذا أي لاعب وصل {max} نقطة.',
    player: 'اللاعب',
    totalScore: 'مجموع النقاط',
    rank: 'الترتيب',
    newRound: 'دورة جديدة',
    roundsCount: 'عدد الدورات: {count}',
    enterScore: 'أدخل 0 أو رقم موجب فقط.',
    addRound: 'إضافة دورة',
    roundAdded: 'تمت إضافة الدورة',
    discardGame: 'إلغاء اللعبة',
    endGame: 'وفّى اللعب',
    roundsList: 'قائمة الدورات (آخر وحدة فوق)',
    totalsAuto: 'المجموع يتحسب أوتوماتيكياً',
    round: 'الدورة',
    total: 'المجموع',
    shareCode: '🔗 كود: {code}',
    copyCode: 'نسخ الكود',
    codeCopied: 'تم نسخ الكود',
    inviteFriends: 'دعوة الأصدقاء',
    inviteFriendsSubtitle: 'شارك الكود مع أصحابك عشان ينضموا للعبة.',
    copyCodeFor: 'نسخ الكود لـ {name}',
    spectatorsCount: '{count} متفرّج(ين)',
    noFriendsToInvite: 'ما فيش أصحاب لدعوتهم. زد أصحابك من صفحة الأصدقاء.',
    
    // Summary
    summaryTitle: 'النتيجة النهائية',
    summarySubtitle: 'محفوظة محليًا • {date}',
    winner: 'الرابح: {name} (أقل مجموع نقاط)',
    viewHistory: 'عرض السجل',
    
    // History
    historyTitle: 'سجل الألعاب',
    historySubtitle: 'محفوظة محليًا على هذا الجهاز فقط.',
    gamesCount: 'الألعاب: {count}',
    noGames: 'لا توجد ألعاب محفوظة حتى الآن.',
    startNewGame: 'ابدأ لعبة جديدة',
    clearAll: 'مسح كل السجل',
    tip: 'نصيحة: أقل مجموع يفوز.',
    date: 'التاريخ',
    players: 'اللاعبين',
    type: 'النوع',
    actions: 'الإجراءات',
    view: 'عرض',
    delete: 'حذف',
    
    // Game Details
    gameDetailsTitle: 'تفاصيل اللعبة',
    backToHistory: 'العودة إلى السجل',
    deleteGame: 'حذف اللعبة',
    
    // Common
    home: 'الرئيسية',
    darkMode: 'الوضع الليلي',
    lightMode: 'النهار',
    language: 'اللغة',
    french: 'Français',
    tunisian: 'Tunisien',
    suggestLanguage: 'اختر اللغة',
    suggestLanguageSub: 'استخدم الفرنسية أو التونسي (العربية)؟',
    useThisLanguage: 'استخدام هذه اللغة',
    offlineFirst: 'Offline-first. Local storage + Cloud (Firebase).',
    disclaimer: 'التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.',
    
    // 404
    notFound: 'الصفحة غير موجودة',
    notFoundSubtitle: 'الصفحة التي تبحث عنها غير موجودة.',
    goHome: 'العودة إلى الرئيسية',
    errorOccurred: 'حدث خطأ',
    errorOccurredHint: 'حدّث الصفحة أو ارجع للرئيسية.',
    skipToContent: 'الانتقال إلى المحتوى',
    
    // Chat
    chat: 'دردشة',
    typeMessage: 'اكتب رسالة...',
    send: 'إرسال',
    noMessages: 'لا توجد رسائل',
    
    // Stats
    myStats: 'إحصائياتي',
    gamesPlayed: 'الألعاب الملعوبة',
    gamesWon: 'الانتصارات',
    totalRounds: 'إجمالي الجولات',
    averageScore: 'متوسط النقاط',
    bestScore: 'أفضل نتيجة',
    statsOverview: 'نظرة عامة على الإحصائيات',
    achievements: 'الإنجازات',
    firstGame: 'أول لعبة',
    tenGames: '10 ألعاب',
    firstWin: 'أول فوز',
    fiveWins: '5 انتصارات',
    profile: 'الملف الشخصي',
    signInRequired: 'تسجيل الدخول مطلوب',
    noStats: 'لا توجد إحصائيات متاحة',
    gameEnded: 'خلصت اللعبة',
    gameEndedAuto: 'اللعبة خلصت براها (وصلنا للحد)',
    addedRound: 'زاد روند',
    shareError: 'خطأ في إنشاء اللعبة المشتركة.',
    shareErrorCheck: 'تحقق من قواعد Realtime Database ومن تفعيل المصادقة.',
    permissionDeniedHint: '→ Firebase Console → Realtime Database (ليس Firestore) → Rules → الصق القواعد من ملف FIREBASE_REGLES_ETAPES.md → Publish.',
    waitingAuth: 'في انتظار المصادقة...',
    authRequired: 'المصادقة مطلوبة لمشاركة لعبة.',
    authRequiredHint: 'المصادقة ضرورية لمشاركة لعبة في الوقت الفعلي.',
    retryAuth: 'إعادة المحاولة',
    authReady: 'المصادقة جاهزة',
    lowestScore: 'أقل مجموع',
    
    // Friends
    myFriends: 'أصدقائي',
    friendsSubtitle: 'أضف أصدقاء للعب معاً',
    friendsCount: 'الأصدقاء: {count}',
    myFriendCode: 'كودي',
    shareCodeWithFriends: 'شارك هذا الكود مع أصدقائك',
    addFriendByCode: 'إضافة صديق بالكود',
    enterFriendCode: 'أدخل كود الصديق',
    enterFriendCodeHint: 'أدخل الكود المكون من 8 أحرف لصديقك',
    adding: 'جاري الإضافة...',
    add: 'إضافة',
    friendsList: 'قائمة الأصدقاء',
    addedOn: 'تمت الإضافة في',
    remove: 'إزالة',
    noFriendsYet: 'لا توجد أصدقاء بعد',
    addFriendsHint: 'شارك كودك مع أصدقائك لإضافتهم',
    friendNotFound: 'الصديق غير موجود',
    cannotAddSelf: 'لا يمكنك إضافة نفسك',
    errorAddingFriend: 'خطأ في الإضافة',
    confirmRemoveFriend: 'إزالة هذا الصديق؟',
    
    // Google auth
    signInWithGoogle: 'تسجيل الدخول بـ Google',
    signOut: 'تسجيل الخروج',
    signedIn: 'متصل',
    menu: 'القائمة',
    close: 'إغلاق',
    changeMyName: 'تغيير اسمي',
    changeMyNameTitle: 'تعديل اسمك',
    yourName: 'اسمك',
    save: 'حفظ',
    googleSignInError: 'خطأ في تسجيل الدخول بـ Google.',
  },
}

const STORAGE_KEY = 'rami_lang_v1'
const LANGUAGE_SUGGESTED_KEY = 'rami_lang_suggested_v1'

export function getStoredLanguage() {
  try {
    const lang = localStorage.getItem(STORAGE_KEY)
    return lang === 'fr' || lang === 'ar-tn' ? lang : 'fr'
  } catch {
    return 'fr'
  }
}

/** Détecte la langue du navigateur (fr ou ar-tn si arabe) */
export function detectBrowserLanguage() {
  try {
    const nav = typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : ''
    if (!nav) return null
    const code = nav.split('-')[0].toLowerCase()
    if (code === 'ar') return 'ar-tn'
    if (code === 'fr') return 'fr'
    return null
  } catch {
    return null
  }
}

/** True si l'utilisateur n'a jamais choisi de langue (premier lancement) */
export function shouldSuggestLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_SUGGESTED_KEY) !== '1'
  } catch {
    return false
  }
}

/** Marque la suggestion de langue comme vue (ne plus afficher le bandeau) */
export function setLanguageSuggested() {
  try {
    localStorage.setItem(LANGUAGE_SUGGESTED_KEY, '1')
  } catch {
    // ignore
  }
}

export function setStoredLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // ignore
  }
}

export function t(key, params = {}) {
  const lang = getStoredLanguage()
  let text = translations[lang]?.[key] || translations.fr[key] || key

  // Replace placeholders like {max}, {count}, {name}, {date}, {code}
  Object.entries(params).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
  })

  return text
}

// Hook for React components (import React separately)
export function useLanguage() {
  const [lang, setLang] = React.useState(getStoredLanguage)

  const changeLanguage = (newLang) => {
    setStoredLanguage(newLang)
    setLang(newLang)
    // Force re-render by reloading
    window.location.reload()
  }

  return { lang, changeLanguage }
}
