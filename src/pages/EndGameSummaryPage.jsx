import React, { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Confetti from '../components/Confetti.jsx'
import { getGameById } from '../storage/history.js'
import { formatDateTime } from '../utils/date.js'
import { t } from '../utils/i18n.js'

export default function EndGameSummaryPage() {
  const { gameId } = useParams()
  const game = getGameById(gameId)
  const [showConfetti, setShowConfetti] = useState(false)

  const ranked = useMemo(() => {
    if (!game) return []
    const totals = game.finalTotals || {}
    return game.players
      .map((p) => ({ ...p, total: Number(totals[p.id] ?? 0) }))
      .sort((a, b) => (a.total - b.total) || a.name.localeCompare(b.name))
  }, [game])

  useEffect(() => {
    if (ranked.length > 0) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [ranked.length])

  if (!game) {
    return (
      <Card>
        <div className="stack">
          <h2 style={{ margin: 0 }}>Game not found</h2>
          <p className="muted" style={{ margin: 0 }}>
            This game might have been deleted from history.
          </p>
          <Button as={Link} to="/history" variant="primary">
            Go to History
          </Button>
        </div>
      </Card>
    )
  }

  const winner = ranked[0]

  return (
    <div className="stack">
      <Confetti active={showConfetti} />
      
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>{t('summaryTitle')}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {t('summarySubtitle', { date: formatDateTime(game.endedAt || game.createdAt) })}
              </p>
            </div>
            <span className="pill">{game.type === 'tunisian' ? t('tunisianRami') : 'Rami'}</span>
          </div>

          {winner ? (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                margin: '12px 0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--success)', marginBottom: '4px' }}>
                {t('winner', { name: winner.name })}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
                {t('lowestScore') || 'Score le plus bas'} : <span className="input--mono">{winner.total}</span>
              </div>
            </div>
          ) : null}

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>{t('rank')}</th>
                  <th>{t('player')}</th>
                  <th>{t('totalScore')}</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p, idx) => (
                  <tr key={p.id} className={idx === 0 ? 'winner' : ''}>
                    <td>
                      {idx === 0 ? (
                        <span className="badge">🥇 {idx + 1}</span>
                      ) : idx === 1 ? (
                        <span style={{ color: 'var(--muted)' }}>🥈 {idx + 1}</span>
                      ) : idx === 2 ? (
                        <span style={{ color: 'var(--muted)' }}>🥉 {idx + 1}</span>
                      ) : (
                        idx + 1
                      )}
                    </td>
                    <td style={{ fontWeight: idx === 0 ? 700 : 400 }}>{p.name}</td>
                    <td className="input--mono" style={{ fontWeight: idx === 0 ? 700 : 400 }}>{p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row">
            <Button as={Link} to="/new" variant="secondary">
              {t('newGame')}
            </Button>
            <Button as={Link} to="/history" variant="primary">
              {t('viewHistory')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

