import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthProvider.jsx'
import { getUserProfile } from '../utils/auth.js'
import Card from '../components/Card.jsx'
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
              {stats.gamesPlayed || 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('gamesPlayed')}</div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>
              {stats.gamesWon || 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('gamesWon')}</div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
              {stats.totalRounds || 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('totalRounds')}</div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>
              {stats.averageScore ? Math.round(stats.averageScore) : 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('averageScore')}</div>
          </div>
        </Card>

        {stats.bestScore !== null && (
          <Card>
            <div className="stack">
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>
                {stats.bestScore}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{t('bestScore')}</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
