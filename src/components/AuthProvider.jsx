import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { onAuthChange, signInAnon } from '../utils/auth.js'
import { setPresenceOnline } from '../utils/presence.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const clearPresenceRef = useRef(null)

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 3

    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (clearPresenceRef.current) {
        try {
          clearPresenceRef.current()
        } catch (_) {}
        clearPresenceRef.current = null
      }

      if (firebaseUser) {
        setUser(firebaseUser)
        setLoading(false)
        setAuthError(null)
        try {
          clearPresenceRef.current = setPresenceOnline(firebaseUser.uid)
        } catch (_) {}
      } else {
        // Auto sign in anonymously if no user
        const attemptSignIn = async () => {
          try {
            setAuthError(null)
            const anonUser = await signInAnon()
            setUser(anonUser)
            setLoading(false)
            console.log('✅ Authentification anonyme réussie:', anonUser.uid)
          } catch (error) {
            console.error('❌ Erreur d\'authentification:', error)
            setAuthError(error)
            
            // Retry logic
            if (retryCount < maxRetries) {
              retryCount++
              console.log(`🔄 Tentative ${retryCount}/${maxRetries}...`)
              setTimeout(attemptSignIn, 1000 * retryCount) // Exponential backoff
            } else {
              console.error('❌ Échec après', maxRetries, 'tentatives')
              setUser(null)
              setLoading(false)
            }
          }
        }

        attemptSignIn()
      }
    })

    return () => unsubscribe()
  }, [])

  // Retry function for manual retry
  const retryAuth = async () => {
    setLoading(true)
    setAuthError(null)
    try {
      const anonUser = await signInAnon()
      setUser(anonUser)
      console.log('✅ Authentification réussie après retry:', anonUser.uid)
    } catch (error) {
      console.error('❌ Erreur lors du retry:', error)
      setAuthError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, authError, retryAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
