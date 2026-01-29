import React, { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import { useAuth } from './AuthProvider.jsx'
import LanguageBanner from './LanguageBanner.jsx'
import BottomNav from './BottomNav.jsx'
import ToastContainer from './Toast.jsx'
import { getStoredTheme, setStoredTheme } from '../utils/theme.js'
import { getStoredLanguage, setStoredLanguage, t } from '../utils/i18n.js'
import { signInWithGoogle, signOutUser, updateDisplayName } from '../utils/auth.js'

export default function AppLayout() {
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [nameSaving, setNameSaving] = useState(false)
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

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      console.error('Google sign-in error:', err)
      alert(err.message || t('googleSignInError'))
    } finally {
      setGoogleLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOutUser()
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  const isGoogleUser = user && !user.isAnonymous
  const showGoogleButton = !authLoading && (!user || user.isAnonymous)
  const showUserBlock = !authLoading && user

  function openNameModal() {
    setNameInput(user?.displayName || 'Joueur Anonyme' || '')
    setShowNameModal(true)
  }

  async function handleSaveName() {
    const name = (nameInput || '').trim()
    if (!name) return
    setNameSaving(true)
    try {
      await updateDisplayName(name)
      setShowNameModal(false)
    } catch (err) {
      console.error('Error updating name:', err)
    } finally {
      setNameSaving(false)
    }
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

          <div className="topbar__right">
            {showGoogleButton && (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="btn-google topbar__btn"
                aria-label={t('signInWithGoogle')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  color: 'var(--text)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: googleLoading ? 'wait' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V5.658H.957C.347 6.883 0 8.21 0 9.5c0 1.29.348 2.617.957 3.842l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 5.158L3.964 7.49C4.672 5.364 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                <span className="btn-google__text">{googleLoading ? t('connecting') : t('signInWithGoogle')}</span>
              </button>
            )}
            {showUserBlock && (
              <div className="topbar__user">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="topbar__avatar" />
                ) : (
                  <span className="topbar__avatar topbar__avatar--init" title={user.displayName || ''}>
                    {(user.displayName || 'J')[0].toUpperCase()}
                  </span>
                )}
                <span className="topbar__name" title={user.displayName || ''}>
                  {user.displayName || t('signedIn')}
                </span>
                {user.isAnonymous && (
                  <Button variant="ghost" size="sm" className="topbar__btn-name" onClick={openNameModal} aria-label={t('changeMyName')}>
                    <span className="topbar__btn-name-text">{t('changeMyName')}</span>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut} aria-label={t('signOut')}>
                  {t('signOut')}
                </Button>
              </div>
            )}
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="topbar__select"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 10px',
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
              className="topbar__theme-btn"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </header>

      <a href="#main" className="skip-link">
        {t('skipToContent') || 'Aller au contenu'}
      </a>
      <main id="main" className="container" role="main">
        <div className="disclaimer" role="note">
          {t('disclaimer')}
        </div>
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <span>{t('offlineFirst')}</span>
      </footer>
      <BottomNav />
      <ToastContainer />

      {showNameModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="name-modal-title"
          onClick={() => setShowNameModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 16,
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: 24,
              maxWidth: 360,
              width: '100%',
              background: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 id="name-modal-title" style={{ margin: '0 0 16px', fontSize: 18 }}>
              {t('changeMyNameTitle')}
            </h3>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={t('yourName')}
              autoFocus
              maxLength={50}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: 16,
                borderRadius: 'var(--radius)',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg)',
                color: 'var(--text)',
                marginBottom: 16,
              }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setShowNameModal(false)}>
                {t('cancel')}
              </Button>
              <Button variant="primary" onClick={handleSaveName} disabled={nameSaving || !nameInput.trim()}>
                {nameSaving ? '...' : t('save')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

