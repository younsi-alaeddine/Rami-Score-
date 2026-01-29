import React, { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import { getStoredTheme, setStoredTheme } from '../utils/theme.js'
import { getStoredLanguage, setStoredLanguage, t } from '../utils/i18n.js'

export default function AppLayout() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    try {
      return getStoredTheme()
    } catch {
      return 'light'
    }
  })
  const [lang, setLang] = useState(() => getStoredLanguage())

  useEffect(() => {
    try {
      setStoredTheme(theme)
    } catch {
      // ignore
    }
  }, [theme])

  useEffect(() => {
    // Set RTL for Arabic
    if (lang === 'ar-tn') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', 'ar')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'fr')
    }
  }, [lang])

  const showBack = useMemo(() => location.pathname !== '/', [location.pathname])

  function changeLanguage(newLang) {
    setStoredLanguage(newLang)
    setLang(newLang)
    window.location.reload()
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <div className="topbar__left">
            {showBack ? (
              <Link className="topbar__home" to="/">
                {t('home')}
              </Link>
            ) : (
              <span className="topbar__home topbar__home--muted">{t('home')}</span>
            )}
          </div>

          <div className="topbar__center">
            <Link to="/" className="topbar__title">
              {t('appTitle')}
            </Link>
          </div>

          <div className="topbar__right" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 0 3px var(--primary-soft)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            >
              <option value="fr">🇫🇷 {t('french')}</option>
              <option value="ar-tn">🇹🇳 {t('tunisian')}</option>
            </select>
            <Button
              variant="ghost"
              size="sm"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? t('lightMode') : t('darkMode')}
            </Button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="disclaimer" role="note">
          {t('disclaimer')}
        </div>
        <Outlet />
      </main>

      <footer className="footer">
        <span>{t('offlineFirst')}</span>
      </footer>
    </div>
  )
}

