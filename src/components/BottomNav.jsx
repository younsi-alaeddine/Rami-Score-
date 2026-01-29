import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { t } from '../utils/i18n.js'

const navItems = [
  { path: '/', label: t('home'), icon: '🏠' },
  { path: '/new', label: t('newGame'), icon: '🎮' },
  { path: '/join', label: t('joinGame'), icon: '🔗' },
  { path: '/history', label: t('gameHistory'), icon: '📋' },
  { path: '/stats', label: t('myStats'), icon: '📊' },
  { path: '/friends', label: t('myFriends') || 'Amis', icon: '👥' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="bottom-nav"
      role="navigation"
      aria-label="Navigation principale"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--glass-border)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/')
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '6px 8px',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--primary)' : 'var(--muted)',
              fontWeight: isActive ? 700 : 500,
              fontSize: '10px',
              textDecoration: 'none',
              minWidth: '56px',
              transition: 'color 0.2s, background 0.2s',
            }}
            className={isActive ? 'bottom-nav__link--active' : ''}
          >
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.icon}</span>
            <span style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
