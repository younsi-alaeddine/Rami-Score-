import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { Field, TextInput } from '../components/Field.jsx'
import { makeId } from '../utils/id.js'
import { setCurrentGame } from '../storage/currentGame.js'

function normalizeName(name, idx) {
  const n = String(name || '').trim()
  return n.length ? n : `Player ${idx + 1}`
}

export default function NewGamePage() {
  const navigate = useNavigate()
  const [playerCount, setPlayerCount] = useState(4)
  const [names, setNames] = useState(() => Array.from({ length: 6 }, () => ''))
  const [type, setType] = useState('tunisian')

  const visibleNames = useMemo(() => names.slice(0, playerCount), [names, playerCount])

  function onStart() {
    const players = visibleNames.map((n, idx) => ({
      id: makeId(),
      name: normalizeName(n, idx),
    }))

    const game = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      type,
      players,
      rounds: [],
    }

    setCurrentGame(game)
    navigate('/game', { replace: true })
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>New Game</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                Choose players and start tracking scores (negative or zero only).
              </p>
            </div>
          </div>

          <div className="grid-2">
            <Field label="Number of players">
              <select
                className="input"
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
              >
                {[2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Rami type">
              <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="tunisian">Tunisian Rami</option>
              </select>
            </Field>
          </div>

          <div className="stack">
            {Array.from({ length: playerCount }).map((_, idx) => (
              <Field key={idx} label={`Player ${idx + 1} name`} hint="You can leave it empty; a default name will be used.">
                <TextInput
                  value={names[idx]}
                  onChange={(e) => {
                    const next = names.slice()
                    next[idx] = e.target.value
                    setNames(next)
                  }}
                  placeholder={`Player ${idx + 1}`}
                />
              </Field>
            ))}
          </div>

          <div className="row">
            <span className="pill">Offline • LocalStorage • Score only</span>
            <Button variant="primary" onClick={onStart}>
              Start Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

