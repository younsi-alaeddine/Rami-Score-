import React, { useEffect, useState, useRef } from 'react'
import { sendMessage, subscribeToChat } from '../utils/chat.js'
import { useAuth } from './AuthProvider.jsx'
import { t } from '../utils/i18n.js'

export default function ChatBox({ gameCode, userName }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!gameCode) return

    const unsubscribe = subscribeToChat(gameCode, (msgs) => {
      setMessages(msgs)
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })

    return () => unsubscribe()
  }, [gameCode])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || !gameCode) return

    await sendMessage(gameCode, input.trim(), userName || user?.displayName)
    setInput('')
  }

  if (!gameCode) return null

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'var(--card)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '300px',
      }}
    >
      <div
        style={{
          padding: '10px 12px',
          borderBottom: '1px solid var(--border)',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--muted)',
        }}
      >
        💬 {t('chat') || 'Chat'}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          maxHeight: '200px',
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: 'var(--muted)', fontSize: '12px', textAlign: 'center', padding: '12px' }}>
            {t('noMessages') || 'Aucun message'}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: '6px 8px',
                borderRadius: '8px',
                background: msg.isSystem
                  ? 'var(--primary-soft)'
                  : msg.userId === user?.uid
                  ? 'var(--primary-soft)'
                  : 'var(--surface)',
                fontSize: '12px',
                alignSelf: msg.userId === user?.uid ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>
                {msg.userName}
              </div>
              <div>{msg.text}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ padding: '8px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('typeMessage') || 'Tapez un message...'}
          style={{
            flex: 1,
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '6px 10px',
            fontSize: '13px',
            background: 'var(--surface)',
            color: 'var(--text)',
          }}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--primary)',
            color: '#fff',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {t('send') || 'Envoyer'}
        </button>
      </form>
    </div>
  )
}
