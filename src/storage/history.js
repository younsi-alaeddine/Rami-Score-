import { STORAGE_KEYS } from './keys.js'
import { readJson, writeJson } from './storage.js'

export function listGames() {
  const items = readJson(STORAGE_KEYS.history, [])
  return Array.isArray(items) ? items : []
}

export function getGameById(gameId) {
  return listGames().find((g) => g && g.id === gameId) || null
}

export function saveGameToHistory(game) {
  const prev = listGames()
  const next = [game, ...prev.filter((g) => g && g.id !== game.id)]
  writeJson(STORAGE_KEYS.history, next)
  return next
}

export function deleteGame(gameId) {
  const prev = listGames()
  const next = prev.filter((g) => g && g.id !== gameId)
  writeJson(STORAGE_KEYS.history, next)
  return next
}

export function clearHistory() {
  writeJson(STORAGE_KEYS.history, [])
}

