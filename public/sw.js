/* Offline-first service worker (no backend, no money/gambling features).
   Strategy:
   - Cache app shell on install (best-effort).
   - Runtime cache other GET requests as they are fetched.
   - Navigation requests: network-first, fallback to cached index.
*/

const CACHE_NAME = 'rami-score-tn-v1'
const APP_SHELL = ['/', '/index.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      try {
        await cache.addAll(APP_SHELL)
      } catch {
        // Best-effort; runtime caching will still help after first load.
      }
      self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((k) => (k === CACHE_NAME ? Promise.resolve() : caches.delete(k))))
      self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  // Network-first for navigations to keep latest, fallback offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req)
          const cache = await caches.open(CACHE_NAME)
          cache.put('/index.html', fresh.clone())
          return fresh
        } catch {
          const cache = await caches.open(CACHE_NAME)
          const cached = await cache.match('/index.html')
          return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
        }
      })(),
    )
    return
  }

  // Cache-first for static assets, with runtime fill.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const cached = await cache.match(req)
      if (cached) return cached

      try {
        const fresh = await fetch(req)
        // Only cache successful basic responses.
        if (fresh && fresh.status === 200 && (fresh.type === 'basic' || fresh.type === 'default')) {
          cache.put(req, fresh.clone())
        }
        return fresh
      } catch {
        // If offline and not cached, fail gracefully.
        return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
      }
    })(),
  )
})

