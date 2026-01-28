export function registerServiceWorker() {
  try {
    if (!('serviceWorker' in navigator)) return
    // Register silently (no console logs to keep UI clean).
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    })
  } catch {
    // ignore
  }
}

