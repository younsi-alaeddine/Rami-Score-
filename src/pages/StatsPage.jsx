import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthProvider.jsx'
import { getUserProfile } from '../utils/auth.js'
import Card from '../components/Card.jsx'
import StatBar from '../components/StatBar.jsx'
import CountUp from '../components/CountUp.jsx'
import Skeleton from '../components/Skeleton.jsx'
import { t } from '../utils/i18n.js'

export default function StatsPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    async function loadStats() {
      try {
        const profile = await getUserProfile(user.uid)
        setStats(profile?.stats || null)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [user])

  if (!user) {
    return (
      <Card>
        <div className="stack">
          <h2 style={{ margin: 0 }}>{t('myStats')}</h2>
          <p className="muted">{t('signInRequired') || 'Connexion requise pour voir les statistiques'}</p>
        </div>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <div className="stack">
          <h2 style={{ margin: 0 }}>{t('myStats')}</h2>
          <p className="muted">Chargement...</p>
        </div>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <div className="stack">
          <h2 style={{ margin: 0 }}>{t('myStats')}</h2>
          <p className="muted">{t('noStats') || 'Aucune statistique disponible'}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <h2 style={{ margin: 0 }}>{t('myStats')}</h2>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            {user.displayName || user.email || 'Joueur'}
          </p>
        </div>
      </Card>

      <div className="grid-2">
        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
              <CountUp value={stats.gamesPlayed || 0} />
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('gamesPlayed')}</div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>
              <CountUp value={stats.gamesWon || 0} />
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('gamesWon')}</div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
              <CountUp value={stats.totalRounds || 0} />
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('totalRounds')}</div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
              <CountUp value={stats.averageScore ? Math.round(stats.averageScore) : 0} />
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('averageScore')}</div>
          </div>
        </Card>

        {stats.bestScore !== null && (
          <Card>
            <div className="stack">
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>
                <CountUp value={stats.bestScore} />
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('bestScore')}</div>
            </div>
          </Card>
        )}
      </div>

      <Card>
        <div className="stack">
          <h3 style={{ margin: 0 }}>{t('statsOverview') || 'Aperçu'}</h3>
          <StatBar
            label={t('gamesPlayed')}
            value={stats.gamesPlayed || 0}
            max={Math.max(stats.gamesPlayed || 0, 10)}
            color="var(--primary)"
          />
          <StatBar
            label={t('gamesWon')}
            value={stats.gamesWon || 0}
            max={Math.max(stats.gamesPlayed || 1, 1)}
            color="var(--success)"
          />
          <StatBar
            label={t('totalRounds')}
            value={stats.totalRounds || 0}
            max={Math.max(stats.totalRounds || 0, 20)}
            color="var(--primary)"
          />
        </div>
      </Card>

      {(stats.gamesPlayed >= 1 || stats.gamesWon >= 1) && (
        <Card>
          <div className="stack">
            <h3 style={{ margin: 0 }}>{t('achievements') || 'Succès'}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {stats.gamesPlayed >= 1 && (
                <span className="badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                  🎮 {t('firstGame') || 'Première partie'}
                </span>
              )}
              {stats.gamesPlayed >= 10 && (
                <span className="badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                  🔥 {t('tenGames') || '10 parties'}
                </span>
              )}
              {stats.gamesWon >= 1 && (
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                  🏆 {t('firstWin') || 'Première victoire'}
                </span>
              )}
              {stats.gamesWon >= 5 && (
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                  👑 {t('fiveWins') || '5 victoires'}
                </span>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
