export const MAX_TOTAL_SCORE = 1000

export function computeTotals(game) {
  const totals = {}
  for (const p of game.players) totals[p.id] = 0

  for (const r of game.rounds || []) {
    for (const p of game.players) {
      const v = Number(r.scores?.[p.id] ?? 0)
      totals[p.id] += Number.isFinite(v) ? v : 0
    }
  }

  return totals
}

export function rankPlayers(game) {
  const totals = computeTotals(game)
  const ranked = game.players
    .map((p) => ({ ...p, total: totals[p.id] ?? 0 }))
    .sort((a, b) => (a.total - b.total) || a.name.localeCompare(b.name))

  return { ranked, totals }
}

export function ensureNegativeOrZero(n) {
  const v = Number(n)
  if (!Number.isFinite(v)) return { ok: false, value: 0 }
  // Updated: scores are now zero or POSITIVE (classic Rami),
  // negatives are not allowed.
  if (v < 0) return { ok: false, value: v }
  return { ok: true, value: v }
}

