/**
 * Noms par défaut tunisiens pour les joueurs (FR et AR).
 * Utilisés quand l'utilisateur ne saisit pas de nom.
 */
const DEFAULT_NAMES_FR = [
  'Youssef',
  'Amira',
  'Mohamed',
  'Fatma',
  'Ahmed',
  'Salma',
]

const DEFAULT_NAMES_AR = [
  'يوسف',
  'أميرة',
  'محمد',
  'فاطمة',
  'أحمد',
  'سلمى',
]

export function getDefaultPlayerName(index, lang = 'fr') {
  const list = lang === 'ar-tn' ? DEFAULT_NAMES_AR : DEFAULT_NAMES_FR
  return list[index % list.length] || (lang === 'ar-tn' ? `لاعب ${index + 1}` : `Joueur ${index + 1}`)
}

export function getDefaultPlayerPlaceholder(index, lang = 'fr') {
  return getDefaultPlayerName(index, lang)
}
