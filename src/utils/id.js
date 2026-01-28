export function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  // Fallback: not cryptographically strong, but ok for local ids.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

