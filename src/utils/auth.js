import {
  signInAnonymously,
  signInWithPopup,
  linkWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
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
    console.log('🔐 Tentative d\'authentification anonyme...')
    const userCredential = await signInAnonymously(auth)
    console.log('✅ Authentification anonyme réussie:', userCredential.user.uid)
    
    // Create profile asynchronously (don't block on this)
    createUserProfile(userCredential.user.uid, { displayName: 'Joueur Anonyme' }).catch((err) => {
      console.warn('⚠️ Erreur lors de la création du profil (non bloquant):', err)
    })
    
    return userCredential.user
  } catch (error) {
    console.error('❌ Erreur d\'authentification anonyme:', error.code, error.message)
    
    // Provide more helpful error messages
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('L\'authentification anonyme n\'est pas activée dans Firebase Console.')
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Problème de connexion réseau. Vérifiez votre connexion internet.')
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Trop de tentatives. Veuillez réessayer plus tard.')
    }
    
    throw error
  }
}

// Sign in with Google (or link anonymous account to Google to keep stats)
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider()
    const currentUser = auth.currentUser

    let userCredential
    if (currentUser?.isAnonymous) {
      // Link anonymous account to Google so stats are preserved
      userCredential = await linkWithPopup(currentUser, provider)
    } else {
      userCredential = await signInWithPopup(auth, provider)
    }

    const user = userCredential.user
    await createUserProfile(user.uid, {
      displayName: user.displayName || 'Joueur',
      email: user.email || null,
      photoURL: user.photoURL || null,
    }).catch(() => {})
    return user
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      return null
    }
    if (error.code === 'auth/credential-already-in-use') {
      // Anonymous account can't be linked (e.g. Google already used elsewhere) – sign in with Google only
      return signInWithGoogleNewSession()
    }
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('La connexion Google n\'est pas activée dans Firebase Console.')
    }
    if (error.code === 'auth/popup-blocked') {
      throw new Error('La fenêtre de connexion a été bloquée. Autorisez les popups pour ce site.')
    }
    throw error
  }
}

async function signInWithGoogleNewSession() {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  const user = userCredential.user
  await createUserProfile(user.uid, {
    displayName: user.displayName || 'Joueur',
    email: user.email || null,
    photoURL: user.photoURL || null,
  }).catch(() => {})
  return user
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

// Update display name (for anonymous users; also syncs to Realtime DB)
export async function updateDisplayName(displayName) {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const name = (displayName || '').trim() || 'Joueur Anonyme'
  await updateProfile(user, { displayName: name })
  await createUserProfile(user.uid, { displayName: name }).catch(() => {})
  return { ...user, displayName: name }
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
