import React, { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import { getStoredTheme, setStoredTheme } from '../utils/theme.js'

export default function AppLayout() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    try {
      return getStoredTheme()
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      setStoredTheme(theme)
    } catch {
      // ignore
    }
  }, [theme])

  const showBack = useMemo(() => location.pathname !== '/', [location.pathname])

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <div className="topbar__left">
            {showBack ? (
              <Link className="topbar__home" to="/">
                الرئيسية
              </Link>
            ) : (
              <span className="topbar__home topbar__home--muted">الرئيسية</span>
            )}
          </div>

          <div className="topbar__center">
            <Link to="/" className="topbar__title">
              Rami Score – تونسي
            </Link>
          </div>

          <div className="topbar__right">
            <Button
              variant="ghost"
              size="sm"
              aria-label="تفعيل/إيقاف الوضع الليلي"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? 'نهار' : 'ليل'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="disclaimer" role="note">
          التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.
        </div>
        <Outlet />
      </main>

      <footer className="footer">
        <span>Offline-first. Local storage only.</span>
      </footer>
    </div>
  )
}

