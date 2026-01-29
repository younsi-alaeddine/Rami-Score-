import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { t } from '../utils/i18n.js'

export default function NotFoundPage() {
  return (
    <Card>
      <div className="stack">
        <h2 style={{ margin: 0 }}>{t('notFound')}</h2>
        <p className="muted" style={{ margin: 0 }}>
          {t('notFoundSubtitle')}
        </p>
        <Button as={Link} to="/" variant="primary">
          {t('goHome')}
        </Button>
      </div>
    </Card>
  )
}
