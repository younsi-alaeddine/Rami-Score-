import React from 'react'

/**
 * Barre de progression horizontale pour les stats (0–100% ou valeur/max).
 */
export default function StatBar({ label, value, max = 100, color = 'var(--primary)', showValue = true }) {
  const pct = max > 0 ? Math.min(100, (Number(value) / Number(max)) * 100) : 0

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' }}>
        <span style={{ color: 'var(--muted)' }}>{label}</span>
        {showValue && (
          <span style={{ fontWeight: 600, color: 'var(--text)' }}>{value}</span>
        )}
      </div>
      <div
        style={{
          height: '8px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--surface)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: 'var(--radius-pill)',
            transition: 'width 0.5s ease-out',
          }}
        />
      </div>
    </div>
  )
}
