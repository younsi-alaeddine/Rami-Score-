import React from 'react'
import { getStoredLanguage, setStoredLanguage, detectBrowserLanguage, shouldSuggestLanguage, setLanguageSuggested, t } from '../utils/i18n.js'

export default function LanguageBanner() {
  const [show, setShow] = React.useState(false)
  const detected = React.useRef(null)

  React.useEffect(() => {
    if (!shouldSuggestLanguage()) return
    const lang = detectBrowserLanguage()
    const stored = getStoredLanguage()
    if (lang && lang !== stored) {
      detected.current = lang
      setShow(true)
    } else {
      setLanguageSuggested()
    }
  }, [])

  function choose(lang) {
    setStoredLanguage(lang)
    setLanguageSuggested()
    setShow(false)
    window.location.reload()
  }

  if (!show || !detected.current) return null

  return (
    <div
      role="region"
      aria-label={t('suggestLanguage')}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9,
        padding: '10px 16px',
        background: 'linear-gradient(135deg, var(--primary-soft), rgba(0, 102, 204, 0.15))',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '14px',
        color: 'var(--text)',
      }}
    >
      <span style={{ fontWeight: 600 }}>{t('suggestLanguageSub')}</span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={() => choose('fr')}
          className="btn btn--primary btn--sm"
          style={{ padding: '6px 14px' }}
        >
          🇫🇷 {t('french')}
        </button>
        <button
          type="button"
          onClick={() => choose('ar-tn')}
          className="btn btn--secondary btn--sm"
          style={{ padding: '6px 14px' }}
        >
          🇹🇳 {t('tunisian')}
        </button>
      </div>
    </div>
  )
}
