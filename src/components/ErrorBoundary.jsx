import React from 'react'
import { Link } from 'react-router-dom'
import { t } from '../utils/i18n.js'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="stack" style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
          <div
            className="card"
            style={{
              padding: 24,
              textAlign: 'center',
              border: '2px solid var(--danger)',
              background: 'var(--glass-bg)',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>{t('errorOccurred') || 'Une erreur est survenue'}</h2>
            <p className="muted" style={{ margin: '0 0 16px', fontSize: 14 }}>
              {t('errorOccurredHint') || 'Rechargez la page ou retournez à l\'accueil.'}
            </p>
            <Link to="/" className="btn btn--primary" style={{ display: 'inline-block', padding: '10px 20px' }}>
              {t('goHome') || 'Retour à l\'accueil'}
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
