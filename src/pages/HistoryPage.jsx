import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { clearHistory, deleteGame, listGames } from '../storage/history.js'
import { formatDateTime } from '../utils/date.js'

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
              <h2 style={{ margin: 0 }}>Game History</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                Saved locally on this device only.
              </p>
            </div>
            <span className="pill">Games: {totalCount}</span>
          </div>

          {!hasGames ? (
            <div className="stack">
              <p className="muted" style={{ margin: 0 }}>
                No saved games yet.
              </p>
              <Button as={Link} to="/new" variant="primary">
                Start a New Game
              </Button>
            </div>
          ) : (
            <div className="stack">
              <div className="row">
                <Button variant="danger" onClick={onClearAll}>
                  Clear All History
                </Button>
                <span className="muted" style={{ fontSize: 13 }}>
                  Tip: Lowest score wins.
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Players</th>
                      <th>Type</th>
                      <th style={{ width: 220 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map((g) => (
                      <tr key={g.id}>
                        <td>{formatDateTime(g.endedAt || g.createdAt)}</td>
                        <td>{(g.players || []).map((p) => p.name).join(', ')}</td>
                        <td>{g.type === 'tunisian' ? 'Tunisian Rami' : 'Rami'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Button as={Link} to={`/history/${g.id}`} variant="secondary" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDelete(g.id)}>
                              Delete
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

