import { ref, set, onValue, off, push, update } from 'firebase/database'
import { db } from '../config/firebase.js'

// Generate a 6-digit code
export function generateGameCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Create a new shared game in Firebase
export async function createSharedGame(game, code) {
  const gameRef = ref(db, `games/${code}`)
  await set(gameRef, {
    ...game,
    code,
    shared: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return code
}

// Join a shared game by code
export async function joinSharedGame(code) {
  return new Promise((resolve, reject) => {
    const gameRef = ref(db, `games/${code}`)
    onValue(
      gameRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          resolve(data)
        } else {
          reject(new Error('Game not found'))
        }
      },
      { onlyOnce: true },
    )
  })
}

// Subscribe to real-time updates for a game
export function subscribeToGame(code, callback) {
  const gameRef = ref(db, `games/${code}`)
  onValue(gameRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      callback(data)
    }
  })
  return () => off(gameRef)
}

// Update game in Firebase
export async function updateSharedGame(code, game) {
  const gameRef = ref(db, `games/${code}`)
  await update(gameRef, {
    ...game,
    updatedAt: new Date().toISOString(),
  })
}

// Check if a game code exists
export async function checkGameCode(code) {
  return new Promise((resolve) => {
    const gameRef = ref(db, `games/${code}`)
    onValue(
      gameRef,
      (snapshot) => {
        resolve(snapshot.exists())
      },
      { onlyOnce: true },
    )
  })
}
