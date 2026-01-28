import { STORAGE_KEYS } from './keys.js'
import { readJson, writeJson } from './storage.js'

export function getCurrentGame() {
  return readJson(STORAGE_KEYS.currentGame, null)
}

export function setCurrentGame(game) {
  writeJson(STORAGE_KEYS.currentGame, game)
}

export function clearCurrentGame() {
  try {
    localStorage.removeItem(STORAGE_KEYS.currentGame)
  } catch {
    // ignore
  }
}

