import { ref, set, get, update, onValue, off } from 'firebase/database'
import { db } from '../config/firebase.js'
import { auth } from '../config/firebase.js'

// Add a friend by user ID or code
export async function addFriend(friendId, friendName) {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const friendRef = ref(db, `users/${user.uid}/friends/${friendId}`)
  await set(friendRef, {
    id: friendId,
    name: friendName,
    addedAt: new Date().toISOString(),
  })

  // Also add reverse friendship
  const reverseRef = ref(db, `users/${friendId}/friends/${user.uid}`)
  await set(reverseRef, {
    id: user.uid,
    name: user.displayName || 'Joueur',
    addedAt: new Date().toISOString(),
  })
}

// Get user's friends list
export async function getFriends() {
  const user = auth.currentUser
  if (!user) return []

  const friendsRef = ref(db, `users/${user.uid}/friends`)
  const snapshot = await get(friendsRef)
  if (!snapshot.exists()) return []

  const friends = []
  snapshot.forEach((child) => {
    friends.push(child.val())
  })
  return friends
}

// Subscribe to friends list
export function subscribeToFriends(callback) {
  const user = auth.currentUser
  if (!user) return () => {}

  const friendsRef = ref(db, `users/${user.uid}/friends`)
  onValue(friendsRef, (snapshot) => {
    const friends = []
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        friends.push(child.val())
      })
    }
    callback(friends)
  })

  return () => off(friendsRef)
}

// Remove a friend
export async function removeFriend(friendId) {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const friendRef = ref(db, `users/${user.uid}/friends/${friendId}`)
  await set(friendRef, null)

  // Remove reverse
  const reverseRef = ref(db, `users/${friendId}/friends/${user.uid}`)
  await set(reverseRef, null)
}

// Generate friend code (based on user ID)
export function generateFriendCode(uid) {
  // Simple hash of UID to create a short code
  return uid.slice(0, 8).toUpperCase()
}

// Find user by friend code
export async function findUserByCode(code) {
  const usersRef = ref(db, 'users')
  const snapshot = await get(usersRef)
  
  if (!snapshot.exists()) return null

  let found = null
  snapshot.forEach((child) => {
    const user = child.val()
    if (child.key && child.key.slice(0, 8).toUpperCase() === code.toUpperCase()) {
      found = { ...user, uid: child.key }
    }
  })
  return found
}
