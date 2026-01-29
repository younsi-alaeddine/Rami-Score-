import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthProvider.jsx'
import { getFriends, addFriend, removeFriend, findUserByCode, generateFriendCode } from '../utils/friends.js'
import { subscribeToPresence } from '../utils/presence.js'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import { Field, TextInput } from '../components/Field.jsx'
import { t } from '../utils/i18n.js'

export default function FriendsPage() {
  const { user } = useAuth()
  const [friends, setFriends] = useState([])
  const [friendCode, setFriendCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [myCode, setMyCode] = useState('')

  useEffect(() => {
    if (!user) return

    setMyCode(generateFriendCode(user.uid))
    loadFriends()
  }, [user])

  async function loadFriends() {
    try {
      const list = await getFriends()
      setFriends(list)
    } catch (err) {
      console.error('Error loading friends:', err)
    }
  }

  async function handleAddFriend() {
    if (!friendCode.trim()) {
      setError(t('enterFriendCode') || 'Entrez un code ami')
      return
    }

    setLoading(true)
    setError('')

    try {
      const foundUser = await findUserByCode(friendCode.trim())
      if (!foundUser) {
        setError(t('friendNotFound') || 'Ami non trouvé')
        setLoading(false)
        return
      }

      if (foundUser.uid === user.uid) {
        setError(t('cannotAddSelf') || 'Vous ne pouvez pas vous ajouter vous-même')
        setLoading(false)
        return
      }

      await addFriend(foundUser.uid, foundUser.displayName || 'Joueur')
      setFriendCode('')
      await loadFriends()
    } catch (err) {
      setError(t('errorAddingFriend') || 'Erreur lors de l\'ajout')
      console.error('Error adding friend:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveFriend(friendId) {
    if (!confirm(t('confirmRemoveFriend') || 'Supprimer cet ami ?')) return

    try {
      await removeFriend(friendId)
      await loadFriends()
    } catch (err) {
      console.error('Error removing friend:', err)
    }
  }

  if (!user) {
    return (
      <Card>
        <div className="stack">
          <h2 style={{ margin: 0 }}>{t('myFriends') || 'Mes Amis'}</h2>
          <p className="muted">{t('signInRequired')}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div className="row">
            <div>
              <h2 style={{ margin: 0 }}>{t('myFriends') || 'Mes Amis'}</h2>
              <p className="muted" style={{ margin: '6px 0 0' }}>
                {t('friendsSubtitle') || 'Ajoutez des amis pour jouer ensemble'}
              </p>
            </div>
            <span className="pill">{t('friendsCount', { count: friends.length }) || `Amis: ${friends.length}`}</span>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--primary-soft), rgba(255, 255, 255, 0.5))',
              border: '2px dashed var(--primary)',
            }}
          >
            <div style={{ marginBottom: '12px', fontWeight: 600, color: 'var(--primary)' }}>
              {t('myFriendCode') || 'Mon code ami'}:
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                letterSpacing: '4px',
                color: 'var(--primary)',
                fontFamily: 'ui-monospace, monospace',
                textAlign: 'center',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '2px solid var(--primary)',
              }}
            >
              {myCode}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '8px 0 0', textAlign: 'center' }}>
              {t('shareCodeWithFriends') || 'Partagez ce code avec vos amis'}
            </p>
          </div>

          <div className="stack">
            <Field
              label={t('addFriendByCode') || 'Ajouter un ami par code'}
              error={error}
              hint={t('enterFriendCodeHint') || 'Entrez le code à 8 caractères de votre ami'}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <TextInput
                  value={friendCode}
                  onChange={(e) => {
                    setFriendCode(e.target.value.toUpperCase().slice(0, 8))
                    setError('')
                  }}
                  placeholder="ABCD1234"
                  style={{ flex: 1, textAlign: 'center', letterSpacing: '2px', fontFamily: 'ui-monospace, monospace' }}
                />
                <Button variant="primary" onClick={handleAddFriend} disabled={loading || friendCode.length !== 8}>
                  {loading ? t('adding') || 'Ajout...' : t('add') || 'Ajouter'}
                </Button>
              </div>
            </Field>
          </div>
        </div>
      </Card>

      {friends.length > 0 ? (
        <Card>
          <div className="stack">
            <h3 style={{ margin: 0 }}>{t('friendsList') || 'Liste des amis'}</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, var(--primary), var(--tunisia-red))`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '16px',
                      }}
                    >
                      {(friend.name || 'A')[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 600 }}>{friend.name || 'Ami'}</span>
                        {presence[friend.id]?.online ? (
                          <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 600 }} title={t('online')}>
                            🟢
                          </span>
                        ) : (
                          <span style={{ fontSize: '10px', color: 'var(--muted)' }} title={t('offline')}>⚪</span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        {t('addedOn') || 'Ajouté le'} {new Date(friend.addedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveFriend(friend.id)}>
                    {t('remove') || 'Retirer'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
            <p className="muted">{t('noFriendsYet') || 'Aucun ami pour le moment'}</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {t('addFriendsHint') || 'Partagez votre code avec vos amis pour les ajouter'}
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
