import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { Field, TextInput } from '../components/Field.jsx'
import { joinSharedGame } from '../utils/firebaseGame.js'
import { setCurrentGame } from '../storage/currentGame.js'
import { t } from '../utils/i18n.js'

export default function JoinGamePage() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onJoin() {
    if (!code.trim() || code.length !== 6) {
      setError(t('codeRequired'))
      return
    }

    setLoading(true)
    setError('')

    try {
      const game = await joinSharedGame(code.trim())
      setCurrentGame(game)
      navigate('/game', { replace: true })
    } catch (err) {
      setError(t('codeError'))
      setLoading(false)
    }
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>{t('joinGameTitle')}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {t('joinGameSubtitle')}
              </p>
            </div>
          </div>

          <Field
            label={t('gameCode')}
            error={error}
            hint={t('gameCodeHint')}
          >
            <TextInput
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                setCode(val)
                setError('')
              }}
              placeholder="123456"
              maxLength={6}
              style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 600 }}
            />
          </Field>

          <div className="row">
            <Button variant="secondary" onClick={() => navigate('/')}>
              {t('cancel')}
            </Button>
            <Button variant="primary" onClick={onJoin} disabled={loading || code.length !== 6}>
              {loading ? t('connecting') : t('join')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
