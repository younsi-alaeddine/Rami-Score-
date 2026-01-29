import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { t } from '../utils/i18n.js'

export default function HomePage() {
  return (
    <div className="stack home-page">
      <section className="home-hero" aria-label={t('home')}>
        <h1 className="home-hero__title">{t('appTitle')}</h1>
        <p className="home-hero__sub">{t('homeTagline')}</p>
      </section>

      <Card className="home-main-card">
        <div className="stack">
          <div className="grid-2" style={{ gap: 12 }}>
            <Button as={Link} to="/new" variant="primary" style={{ minHeight: 52, fontSize: 16, fontWeight: 700 }}>
              🎮 {t('newGame')}
            </Button>
            <Button as={Link} to="/history" variant="secondary" style={{ minHeight: 52, fontSize: 15 }}>
              📋 {t('gameHistory')}
            </Button>
          </div>

          <div className="home-actions">
            <Link to="/join" className="action-tile">
              <span className="action-tile__icon" aria-hidden>🔗</span>
              <span>{t('joinGame')}</span>
            </Link>
            <Link to="/stats" className="action-tile">
              <span className="action-tile__icon" aria-hidden>📊</span>
              <span>{t('myStats')}</span>
            </Link>
            <Link to="/friends" className="action-tile">
              <span className="action-tile__icon" aria-hidden>👥</span>
              <span>{t('myFriends')}</span>
            </Link>
          </div>
        </div>
      </Card>

      <Link
        to="/new"
        className="fab"
        aria-label={t('newGame')}
        style={{
          position: 'fixed',
          bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))',
          right: 16,
          zIndex: 15,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--tunisia-red))',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          boxShadow: '0 4px 20px rgba(0, 102, 204, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        🎮
      </Link>
    </div>
  )
}
