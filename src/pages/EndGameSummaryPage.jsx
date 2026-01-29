import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { getGameById } from '../storage/history.js'
import { formatDateTime } from '../utils/date.js'
import { t } from '../utils/i18n.js'

export default function EndGameSummaryPage() {
  const { gameId } = useParams()
  const game = getGameById(gameId)

  const ranked = useMemo(() => {
    if (!game) return []
    const totals = game.finalTotals || {}
    return game.players
      .map((p) => ({ ...p, total: Number(totals[p.id] ?? 0) }))
      .sort((a, b) => (a.total - b.total) || a.name.localeCompare(b.name))
  }, [game])

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
            <p style={{ margin: '4px 0 8px', fontWeight: 600 }}>
              {t('winner', { name: winner.name })}
            </p>
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
                  <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>{p.name}</td>
                    <td className="input--mono">{p.total}</td>
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

