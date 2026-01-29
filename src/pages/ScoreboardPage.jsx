import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { Field, NumberInput } from '../components/Field.jsx'
import ChatBox from '../components/ChatBox.jsx'
import { useAuth } from '../components/AuthProvider.jsx'
import { getCurrentGame, setCurrentGame, clearCurrentGame } from '../storage/currentGame.js'
import { saveGameToHistory } from '../storage/history.js'
import { makeId } from '../utils/id.js'
import { ensureNegativeOrZero, rankPlayers, MAX_TOTAL_SCORE } from '../utils/game.js'
import { subscribeToGame, updateSharedGame } from '../utils/firebaseGame.js'
import { updateUserStats } from '../utils/auth.js'
import { sendSystemMessage } from '../utils/chat.js'
import { t } from '../utils/i18n.js'

function clampInputString(s) {
  // Allow empty (user typing). Otherwise keep numeric-ish string.
  if (s === '' || s === '-' || s === '0' || s === '-0') return s
  const n = Number(s)
  if (!Number.isFinite(n)) return ''
  return String(n)
}

export default function ScoreboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const codeFromUrl = searchParams.get('code')
  const [game, setGame] = useState(() => getCurrentGame())
  const [roundValues, setRoundValues] = useState(() => ({}))
  const [error, setError] = useState('')
  const [isShared, setIsShared] = useState(false)
  const [shareCode, setShareCode] = useState(null)

  useEffect(() => {
    const g = getCurrentGame()
    const code = codeFromUrl || g?.code
    if (g) {
      setGame(g)
      setIsShared(!!g.shared || !!code)
      setShareCode(code)
      // Update game with code if from URL
      if (codeFromUrl && !g.code) {
        const updatedGame = { ...g, code: codeFromUrl, shared: true }
        setCurrentGame(updatedGame)
        setGame(updatedGame)
      }
    }
  }, [codeFromUrl])

  // Subscribe to real-time updates if shared game
  useEffect(() => {
    if (!isShared || !shareCode) return

    const unsubscribe = subscribeToGame(shareCode, (updatedGame) => {
      if (updatedGame) {
        setGame(updatedGame)
        setCurrentGame(updatedGame)
      }
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [isShared, shareCode])

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
        setError(t('enterScore'))
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
      
      // Update user stats
      if (user?.uid) {
        updateUserStats(user.uid, finalized).catch(() => {})
      }
      
      // Send system message
      if (isShared && shareCode) {
        sendSystemMessage(shareCode, t('gameEndedAuto') || 'La partie s\'est terminée automatiquement (limite atteinte)').catch(() => {})
      }
      
      clearCurrentGame()
      navigate(`/summary/${finalized.id}`, { replace: true })
      return
    }

    setCurrentGame(nextGame)
    setGame(nextGame)
    setRoundValues({})

    // Update Firebase if shared
    if (isShared && shareCode) {
      updateSharedGame(shareCode, nextGame).catch((err) => {
        console.error('Error updating shared game:', err)
      })
      // Send system message
      if (user) {
        const playerName = user?.displayName || user?.email || 'Un joueur'
        sendSystemMessage(shareCode, `${playerName} ${t('addedRound') || 'a ajouté un round'}`).catch((err) => {
          console.error('Error sending system message:', err)
        })
      }
    }
  }

  async function onEndGame() {
    const finalTotals = rankPlayers(game).totals
    const finalized = {
      ...game,
      endedAt: new Date().toISOString(),
      finalTotals,
    }
    saveGameToHistory(finalized)
    
    // Update user stats
    if (user?.uid) {
      updateUserStats(user.uid, finalized).catch(() => {})
    }
    
    // Send system message
    if (isShared && shareCode) {
      sendSystemMessage(shareCode, t('gameEnded') || 'La partie a été terminée').catch(() => {})
    }
    
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
              <h2 style={{ margin: 0 }}>{t('scoreboardTitle')}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {t('scoreboardSubtitle', { max: MAX_TOTAL_SCORE })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="pill">{game.type === 'tunisian' ? t('tunisianRami') : 'Rami'}</span>
              {isShared && shareCode && (
                <span
                  className="pill"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 700,
                  }}
                >
                  {t('shareCode', { code: shareCode })}
                </span>
              )}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                    <th>{t('player')}</th>
                    <th>{t('totalScore')}</th>
                    <th>{t('rank')}</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p, idx) => (
                  <tr key={p.id} className={idx === 0 ? 'winner' : ''} style={{ position: 'relative' }}>
                    <td>
                      {idx === 0 && (
                        <span
                          style={{
                            position: 'absolute',
                            left: '-8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '20px',
                          }}
                        >
                          👑
                        </span>
                      )}
                      <span style={{ marginLeft: idx === 0 ? '20px' : '0' }}>{p.name}</span>
                    </td>
                    <td className="input--mono" style={{ fontWeight: idx === 0 ? 700 : 400, color: idx === 0 ? 'var(--success)' : 'inherit' }}>
                      {p.total}
                    </td>
                    <td>
                      {idx === 0 ? (
                        <span className="badge">🥇 {idx + 1}</span>
                      ) : (
                        idx + 1
                      )}
                    </td>
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
            <h3 style={{ margin: 0 }}>{t('newRound')}</h3>
            <span className="pill">{t('roundsCount', { count: (game.rounds || []).length })}</span>
          </div>

          {error ? <div className="field__error">{error}</div> : null}

          <div className="grid-2">
            {game.players.map((p) => (
              <Field key={p.id} label={p.name} hint={t('enterScore')}>
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
              {t('addRound')}
            </Button>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="ghost" onClick={onResetGame}>
                {t('discardGame')}
              </Button>
              <Button variant="primary" onClick={onEndGame} disabled={(game.rounds || []).length === 0}>
                {t('endGame')}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {(game.rounds || []).length > 0 ? (
        <Card>
          <div className="stack">
            <div className="row">
              <h3 style={{ margin: 0 }}>{t('roundsList')}</h3>
              <span className="muted">{t('totalsAuto')}</span>
            </div>
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
                      <strong>{t('total')}</strong>
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

      {isShared && shareCode && (
        <Card>
          <ChatBox gameCode={shareCode} userName={user?.displayName} />
        </Card>
      )}
    </div>
  )
}

