import React, { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { deleteGame, getGameById } from '../storage/history.js'
import { formatDateTime } from '../utils/date.js'
import { t } from '../utils/i18n.js'

export default function GameDetailsPage() {
  const { gameId } = useParams()
  const navigate = useNavigate()
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
          <Button as={Link} to="/history" variant="primary">
            Back to History
          </Button>
        </div>
      </Card>
    )
  }

  function onDelete() {
    deleteGame(game.id)
    navigate('/history', { replace: true })
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>{t('gameDetailsTitle')}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {formatDateTime(game.endedAt || game.createdAt)}
              </p>
            </div>
            <span className="pill">{game.type === 'tunisian' ? t('tunisianRami') : 'Rami'}</span>
          </div>

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

          {(game.rounds || []).length ? (
            <div className="stack">
              <h3 style={{ margin: 0 }}>{t('roundsList')}</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t('round')}</th>
                      {game.players.map((p) => (
                        <th key={p.id}>{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(game.rounds || []).map((r, idx) => (
                      <tr key={r.id}>
                        <td>#{idx + 1}</td>
                        {game.players.map((p) => (
                          <td key={p.id} className="input--mono">
                            {Number(r.scores?.[p.id] ?? 0)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="row">
            <Button as={Link} to="/history" variant="secondary">
              {t('backToHistory')}
            </Button>
            <Button variant="ghost" onClick={onDelete}>
              {t('deleteGame')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

