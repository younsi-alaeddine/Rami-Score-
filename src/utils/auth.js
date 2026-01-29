import {
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { ref, set, get, update } from 'firebase/database'
import { auth, db } from '../config/firebase.js'

// Auth state listener
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback)
}

// Sign in anonymously (quick access)
export async function signInAnon() {
  try {
    const userCredential = await signInAnonymously(auth)
    await createUserProfile(userCredential.user.uid, { displayName: 'Joueur Anonyme' })
    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Sign in with email/password
export async function signInEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Sign up with email/password
export async function signUpEmail(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await createUserProfile(userCredential.user.uid, { displayName })
    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Sign out
export async function signOutUser() {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

// Create/update user profile
export async function createUserProfile(uid, data) {
  const userRef = ref(db, `users/${uid}`)
  const snapshot = await get(userRef)
  const existing = snapshot.val()

  if (!existing) {
    await set(userRef, {
      ...data,
      createdAt: new Date().toISOString(),
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        totalRounds: 0,
        averageScore: 0,
        bestScore: null,
      },
    })
  } else {
    await update(userRef, data)
  }
}

// Get user profile
export async function getUserProfile(uid) {
  const userRef = ref(db, `users/${uid}`)
  const snapshot = await get(userRef)
  return snapshot.val()
}

// Update user stats
export async function updateUserStats(uid, gameResult) {
  const userRef = ref(db, `users/${uid}/stats`)
  const snapshot = await get(userRef)
  const current = snapshot.val() || {
    gamesPlayed: 0,
    gamesWon: 0,
    totalRounds: 0,
    averageScore: 0,
    bestScore: null,
  }

  const totals = gameResult.finalTotals || {}
  const playerTotal = totals[uid] || 0
  const isWinner = Object.values(totals).every((t) => t >= playerTotal)

  const updates = {
    gamesPlayed: current.gamesPlayed + 1,
    gamesWon: current.gamesWon + (isWinner ? 1 : 0),
    totalRounds: current.totalRounds + (gameResult.rounds?.length || 0),
    averageScore: (current.averageScore * current.gamesPlayed + playerTotal) / (current.gamesPlayed + 1),
    bestScore: current.bestScore === null || playerTotal < current.bestScore ? playerTotal : current.bestScore,
  }

  await update(userRef, updates)
  return updates
}
