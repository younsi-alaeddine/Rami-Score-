import React from 'react'

export default function Skeleton({ width = '100%', height = '1rem', style = {} }) {
  return (
    <div
      role="presentation"
      style={{
        width,
        height,
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton 1.2s ease-in-out infinite',
        ...style,
      }}
    />
  )
}
