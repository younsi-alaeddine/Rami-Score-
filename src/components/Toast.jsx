import React, { useEffect, useState } from 'react'

let toastListeners = []

export function showToast(message, options = {}) {
  const { duration = 3000 } = options
  toastListeners.forEach((fn) => fn({ message, duration }))
}

export function useToast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const listener = (payload) => setToast(payload)
    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), toast.duration)
    return () => clearTimeout(id)
  }, [toast])

  return toast
}

export default function ToastContainer() {
  const toast = useToast()

  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        padding: '12px 20px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--card)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-soft)',
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--text)',
        maxWidth: '90vw',
        animation: 'toastIn 0.25s ease-out',
      }}
    >
      {toast.message}
    </div>
  )
}
