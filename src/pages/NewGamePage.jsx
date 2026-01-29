import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { Field, TextInput } from '../components/Field.jsx'
import { useAuth } from '../components/AuthProvider.jsx'
import { makeId } from '../utils/id.js'
import { setCurrentGame } from '../storage/currentGame.js'
import { createSharedGame, generateGameCode } from '../utils/firebaseGame.js'
import { t } from '../utils/i18n.js'

function normalizeName(name, idx) {
  const n = String(name || '').trim()
  return n.length ? n : `Player ${idx + 1}`
}

export default function NewGamePage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [playerCount, setPlayerCount] = useState(4)
  const [names, setNames] = useState(() => Array.from({ length: 6 }, () => ''))
  const [type, setType] = useState('tunisian')
  const [shareMode, setShareMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const visibleNames = useMemo(() => names.slice(0, playerCount), [names, playerCount])

  async function onStart() {
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

    if (shareMode) {
      // Wait for auth if still loading
      if (authLoading) {
        alert(t('waitingAuth') || 'Attente de l\'authentification...')
        return
      }

      // Check if user is authenticated
      if (!user) {
        alert(t('authRequired') || 'Authentification requise pour partager une partie. Veuillez rafraîchir la page.')
        return
      }

      setLoading(true)
      try {
        const code = generateGameCode()
        console.log('Creating shared game with code:', code, 'User:', user.uid)
        await createSharedGame(game, code)
        game.code = code
        game.shared = true
        setCurrentGame(game)
        navigate(`/game?code=${code}`, { replace: true })
      } catch (err) {
        console.error('Error creating shared game:', err)
        const errorMsg = err.message || err.code || 'Erreur inconnue'
        alert(`${t('shareError') || 'Erreur lors de la création de la partie partagée.'}\n\nDétails: ${errorMsg}\n\nVérifiez:\n1. Les règles Firebase Realtime Database\n2. Que l'authentification anonyme est activée`)
        setLoading(false)
        return
      }
    } else {
      setCurrentGame(game)
      navigate('/game', { replace: true })
    }
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>{t('newGameTitle')}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {t('newGameSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid-2">
            <Field label={t('numberOfPlayers')}>
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

            <Field label={t('ramiType')}>
              <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="tunisian">{t('tunisianRami')}</option>
              </select>
            </Field>
          </div>

          <div className="stack">
            {Array.from({ length: playerCount }).map((_, idx) => (
              <Field key={idx} label={`${t('playerName')} ${idx + 1}`} hint={t('playerNameHint')}>
                <TextInput
                  value={names[idx]}
                  onChange={(e) => {
                    const next = names.slice()
                    next[idx] = e.target.value
                    setNames(next)
                  }}
                  placeholder={`${t('playerName')} ${idx + 1}`}
                />
              </Field>
            ))}
          </div>

          <div className="stack">
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={shareMode}
                onChange={(e) => setShareMode(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px' }}>
                {t('shareRealTime')}
              </span>
            </label>
          </div>

          <div className="row">
            <span className="pill">
              {shareMode ? t('online') : t('offline')}
            </span>
            <Button variant="primary" onClick={onStart} disabled={loading}>
              {loading ? t('connecting') : t('startGame')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

