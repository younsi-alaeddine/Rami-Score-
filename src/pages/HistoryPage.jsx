import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { clearHistory, deleteGame, listGames } from '../storage/history.js'
import { formatDateTime } from '../utils/date.js'
import { t } from '../utils/i18n.js'

export default function HistoryPage() {
  const [games, setGames] = useState(() => listGames())

  useEffect(() => {
    setGames(listGames())
  }, [])

  const hasGames = games.length > 0
  const totalCount = useMemo(() => games.length, [games.length])

  function onDelete(gameId) {
    setGames(deleteGame(gameId))
  }

  function onClearAll() {
    clearHistory()
    setGames([])
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>{t('historyTitle')}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {t('historySubtitle')}
              </p>
            </div>
            <span className="pill">{t('gamesCount', { count: totalCount })}</span>
          </div>

          {!hasGames ? (
            <div className="stack">
              <p className="muted" style={{ margin: 0 }}>
                {t('noGames')}
              </p>
              <Button as={Link} to="/new" variant="primary">
                {t('startNewGame')}
              </Button>
            </div>
          ) : (
            <div className="stack">
              <div className="row">
                <Button variant="danger" onClick={onClearAll}>
                  {t('clearAll')}
                </Button>
                <span className="muted" style={{ fontSize: 13 }}>
                  {t('tip')}
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('players')}</th>
                      <th>{t('type')}</th>
                      <th style={{ width: 220 }}>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map((g) => (
                      <tr key={g.id}>
                        <td>{formatDateTime(g.endedAt || g.createdAt)}</td>
                        <td>{(g.players || []).map((p) => p.name).join(', ')}</td>
                        <td>{g.type === 'tunisian' ? t('tunisianRami') : 'Rami'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Button as={Link} to={`/history/${g.id}`} variant="secondary" size="sm">
                              {t('view')}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDelete(g.id)}>
                              {t('delete')}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

