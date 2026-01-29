// Translation system for French and Tunisian Arabic

const translations = {
  fr: {
    // Home
    appTitle: 'Rami Score – تونسي',
    appSubtitle: 'Cette application calcule uniquement les scores. Aucun jeu d\'argent ni argent impliqué.',
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
    discardGame: 'Annuler la Partie',
    endGame: 'Terminer la Partie',
    roundsList: 'Liste des Rondes (dernière en haut)',
    totalsAuto: 'Totaux calculés automatiquement',
    round: 'Ronade',
    total: 'Total',
    shareCode: '🔗 Code: {code}',
    
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
    offlineFirst: 'Hors ligne d\'abord. Stockage local + Cloud (Firebase).',
    disclaimer: 'Cette application calcule uniquement les scores. Aucun jeu d\'argent ni argent impliqué.',
    
    // 404
    notFound: 'Page non trouvée',
    notFoundSubtitle: 'La page que vous recherchez n\'existe pas.',
    goHome: 'Retour à l\'accueil',
    
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
    profile: 'Profil',
    signInRequired: 'Connexion requise',
    noStats: 'Aucune statistique disponible',
    gameEnded: 'La partie a été terminée',
    gameEndedAuto: 'La partie s\'est terminée automatiquement',
    addedRound: 'a ajouté un round',
    shareError: 'Erreur lors de la création de la partie partagée.',
    waitingAuth: 'Attente de l\'authentification...',
    authRequired: 'Authentification requise pour partager une partie.',
  },
  'ar-tn': {
    // Home
    appTitle: 'Rami Score – تونسي',
    appSubtitle: 'التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.',
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
    discardGame: 'إلغاء اللعبة',
    endGame: 'وفّى اللعب',
    roundsList: 'قائمة الدورات (آخر وحدة فوق)',
    totalsAuto: 'المجموع يتحسب أوتوماتيكياً',
    round: 'الدورة',
    total: 'المجموع',
    shareCode: '🔗 كود: {code}',
    
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
    offlineFirst: 'Offline-first. Local storage + Cloud (Firebase).',
    disclaimer: 'التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.',
    
    // 404
    notFound: 'الصفحة غير موجودة',
    notFoundSubtitle: 'الصفحة التي تبحث عنها غير موجودة.',
    goHome: 'العودة إلى الرئيسية',
    
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
    profile: 'الملف الشخصي',
    signInRequired: 'تسجيل الدخول مطلوب',
    noStats: 'لا توجد إحصائيات متاحة',
    gameEnded: 'انتهت اللعبة',
    gameEndedAuto: 'انتهت اللعبة تلقائياً',
    addedRound: 'أضاف جولة',
    shareError: 'خطأ في إنشاء اللعبة المشتركة.',
    waitingAuth: 'في انتظار المصادقة...',
    authRequired: 'المصادقة مطلوبة لمشاركة لعبة.',
  },
}

const STORAGE_KEY = 'rami_lang_v1'

export function getStoredLanguage() {
  try {
    const lang = localStorage.getItem(STORAGE_KEY)
    return lang === 'fr' || lang === 'ar-tn' ? lang : 'fr'
  } catch {
    return 'fr'
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
