const THEME_KEY = 'rami_theme_v1'

export function getStoredTheme() {
  const v = localStorage.getItem(THEME_KEY)
  return v === 'dark' || v === 'light' ? v : 'light'
}

export function setStoredTheme(next) {
  localStorage.setItem(THEME_KEY, next)
  applyTheme(next)
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function applyStoredTheme() {
  try {
    applyTheme(getStoredTheme())
  } catch {
    // ignore
  }
}

