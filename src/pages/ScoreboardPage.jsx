import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { Field, NumberInput } from '../components/Field.jsx'
import { getCurrentGame, setCurrentGame, clearCurrentGame } from '../storage/currentGame.js'
import { saveGameToHistory } from '../storage/history.js'
import { makeId } from '../utils/id.js'
import { ensureNegativeOrZero, rankPlayers, MAX_TOTAL_SCORE } from '../utils/game.js'

function clampInputString(s) {
  // Allow empty (user typing). Otherwise keep numeric-ish string.
  if (s === '' || s === '-' || s === '0' || s === '-0') return s
  const n = Number(s)
  if (!Number.isFinite(n)) return ''
  return String(n)
}

export default function ScoreboardPage() {
  const navigate = useNavigate()
  const [game, setGame] = useState(() => getCurrentGame())
  const [roundValues, setRoundValues] = useState(() => ({}))
  const [error, setError] = useState('')

  useEffect(() => {
    const g = getCurrentGame()
    setGame(g)
  }, [])

  const { ranked, totals } = useMemo(() => {
    if (!game) return { ranked: [], totals: {} }
    return rankPlayers(game)
  }, [game])

  useEffect(() => {
    if (!game) navigate('/new', { replace: true })
  }, [game, navigate])

  if (!game) return null

  function onAddRound() {
    setError('')

    const scores = {}
    for (const p of game.players) {
      const raw = roundValues[p.id]
      const value = raw === '' || raw === undefined ? 0 : Number(raw)
      const check = ensureNegativeOrZero(value)
      if (!check.ok) {
        setError('Round scores must be zero or positive. Negative values are not allowed.')
        return
      }
      scores[p.id] = check.value
    }

    const nextGame = {
      ...game,
      rounds: [
        ...(game.rounds || []),
        {
          id: makeId(),
          at: new Date().toISOString(),
          scores,
        },
      ],
    }

    const { totals: nextTotals } = rankPlayers(nextGame)
    const reachedLimit = Object.values(nextTotals).some((t) => Number(t) >= MAX_TOTAL_SCORE)

    if (reachedLimit) {
      const finalized = {
        ...nextGame,
        endedAt: new Date().toISOString(),
        finalTotals: nextTotals,
      }
      saveGameToHistory(finalized)
      clearCurrentGame()
      navigate(`/summary/${finalized.id}`, { replace: true })
      return
    }

    setCurrentGame(nextGame)
    setGame(nextGame)
    setRoundValues({})
  }

  function onEndGame() {
    const finalTotals = rankPlayers(game).totals
    const finalized = {
      ...game,
      endedAt: new Date().toISOString(),
      finalTotals,
    }
    saveGameToHistory(finalized)
    clearCurrentGame()
    navigate(`/summary/${finalized.id}`, { replace: true })
  }

  function onResetGame() {
    clearCurrentGame()
    navigate('/new', { replace: true })
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>صفحة السكور</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                أقل مجموع هو الأحسن. أدخل 0 أو أرقام موجبة فقط. اللعبة تتوقف آليًا إذا أي لاعب وصل{' '}
                {MAX_TOTAL_SCORE} نقطة.
              </p>
            </div>
            <span className="pill">{game.type === 'tunisian' ? 'Tunisian Rami' : 'Rami'}</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                    <th>اللاعب</th>
                    <th>مجموع النقاط</th>
                    <th>الترتيب</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p, idx) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="input--mono">{p.total}</td>
                    <td>{idx + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card>
        <div className="stack">
          <div className="row">
            <h3 style={{ margin: 0 }}>دورة جديدة</h3>
            <span className="pill">عدد الدورات: {(game.rounds || []).length}</span>
          </div>

          {error ? <div className="field__error">{error}</div> : null}

          <div className="grid-2">
            {game.players.map((p) => (
              <Field key={p.id} label={p.name} hint="أدخل 0 أو رقم موجب فقط.">
                <NumberInput
                  value={roundValues[p.id] ?? ''}
                  min={undefined}
                  step={1}
                  onChange={(e) => {
                    const next = { ...roundValues, [p.id]: clampInputString(e.target.value) }
                    setRoundValues(next)
                  }}
                  onBlur={(e) => {
                    const raw = e.target.value
                    if (raw === '' || raw === '-') return
                    const n = Number(raw)
                    if (!Number.isFinite(n)) return
                    // If user typed positive, keep it but show error on submit.
                    const next = { ...roundValues, [p.id]: String(n) }
                    setRoundValues(next)
                  }}
                  placeholder="0"
                />
              </Field>
            ))}
          </div>

          <div className="row">
            <Button variant="secondary" onClick={onAddRound}>
              إضافة دورة
            </Button>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="ghost" onClick={onResetGame}>
                إلغاء اللعبة
              </Button>
              <Button variant="primary" onClick={onEndGame} disabled={(game.rounds || []).length === 0}>
                وفّى اللعب
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {(game.rounds || []).length > 0 ? (
        <Card>
          <div className="stack">
            <div className="row">
              <h3 style={{ margin: 0 }}>قائمة الدورات (آخر وحدة فوق)</h3>
              <span className="muted">المجموع يتحسب أوتوماتيكياً</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>الدورة</th>
                    {game.players.map((p) => (
                      <th key={p.id}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...(game.rounds || [])].slice().reverse().map((r, idx) => (
                    <tr key={r.id}>
                      <td>#{(game.rounds || []).length - idx}</td>
                      {game.players.map((p) => (
                        <td key={p.id} className="input--mono">
                          {Number(r.scores?.[p.id] ?? 0)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    {game.players.map((p) => (
                      <td key={p.id} className="input--mono">
                        <strong>{totals[p.id] ?? 0}</strong>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  )
}

