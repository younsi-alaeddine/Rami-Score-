import { ref, push, onValue, off, set } from 'firebase/database'
import { db } from '../config/firebase.js'
import { auth } from '../config/firebase.js'

// Send a message to a game chat
export async function sendMessage(gameCode, message, userName) {
  const user = auth.currentUser
  const messagesRef = ref(db, `games/${gameCode}/chat`)
  
  await push(messagesRef, {
    text: message,
    userName: userName || (user?.isAnonymous ? 'Joueur Anonyme' : user?.displayName || 'Joueur'),
    userId: user?.uid || 'anonymous',
    timestamp: new Date().toISOString(),
  })
}

// Subscribe to chat messages
export function subscribeToChat(gameCode, callback) {
  const messagesRef = ref(db, `games/${gameCode}/chat`)
  
  onValue(messagesRef, (snapshot) => {
    const messages = []
    snapshot.forEach((child) => {
      messages.push({
        id: child.key,
        ...child.val(),
      })
    })
    callback(messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)))
  })

  return () => off(messagesRef)
}

// Send system message (auto)
export async function sendSystemMessage(gameCode, message) {
  const messagesRef = ref(db, `games/${gameCode}/chat`)
  await push(messagesRef, {
    text: message,
    userName: 'Système',
    userId: 'system',
    timestamp: new Date().toISOString(),
    isSystem: true,
  })
}
