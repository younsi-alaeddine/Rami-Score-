import { ref, set, onDisconnect, onValue, off } from 'firebase/database'
import { db } from '../config/firebase.js'
import { auth } from '../config/firebase.js'

/**
 * Active la présence en ligne : écrit dans presence/{uid} et met à jour onDisconnect.
 */
export function setPresenceOnline(uid) {
  if (!uid) return () => {}

  const presenceRef = ref(db, `presence/${uid}`)
  const data = { online: true, lastSeen: new Date().toISOString() }

  set(presenceRef, data).catch(() => {})

  const disconnectRef = onDisconnect(presenceRef)
  disconnectRef.set({ online: false, lastSeen: new Date().toISOString() }).catch(() => {})

  return () => {
    set(presenceRef, { online: false, lastSeen: new Date().toISOString() }).catch(() => {})
  }
}

/**
 * Souscrit au statut de présence d'un utilisateur.
 * @param {string} uid
 * @param {(data: { online: boolean, lastSeen?: string } | null) => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribeToPresence(uid, callback) {
  if (!uid) return () => {}

  const presenceRef = ref(db, `presence/${uid}`)
  onValue(presenceRef, (snapshot) => {
    const val = snapshot.val()
    callback(val ? { online: !!val.online, lastSeen: val.lastSeen } : null)
  })

  return () => off(presenceRef)
}
