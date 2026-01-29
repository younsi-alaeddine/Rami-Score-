import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { t } from '../utils/i18n.js'

export default function HomePage() {
  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div>
            <h2 style={{ margin: 0 }}>{t('appTitle')}</h2>
            <p className="muted" style={{ margin: '6px 0 0' }}>
              {t('appSubtitle')}
            </p>
          </div>

          <div className="grid-2">
            <Button as={Link} to="/new" variant="primary">
              {t('newGame')}
            </Button>
            <Button as={Link} to="/history" variant="secondary">
              {t('gameHistory')}
            </Button>
          </div>

          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
            <div className="grid-2">
              <Button as={Link} to="/join" variant="ghost">
                {t('joinGame')}
              </Button>
              <Button as={Link} to="/stats" variant="ghost">
                📊 {t('myStats')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
