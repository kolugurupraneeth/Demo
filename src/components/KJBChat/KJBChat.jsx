import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './KJBChat.module.css'

const WELCOME = {
  role: 'assistant',
  content: "Hello! I'm **KJB AI**, your guide to KJB Solutions. Ask me about our **services**, **career opportunities**, or **how to work with us**.",
  id: 'welcome',
}

const SparkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2L14.09 8.26L20.5 9.27L16.25 13.14L17.18 19.5L12 16.77L6.82 19.5L7.75 13.14L3.5 9.27L9.91 8.26L12 2Z"/>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

function formatText(text) {
  if (!text) return null
  const lines = text.split('\n').filter(Boolean)
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <span key={li}>
        {li > 0 && <br />}
        {parts.map((part, i) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={i}>{part.slice(2, -2)}</strong>
            : part
        )}
      </span>
    )
  })
}

export default function KJBChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingId, setTypingId] = useState(null)
  const [hasOpened, setHasOpened] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const handleOpen = () => {
    setOpen(true)
    setHasOpened(true)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 380)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Typewriter reveal for the latest AI message
  useEffect(() => {
    if (!typingId) return
    const msg = messages.find(m => m.id === typingId)
    if (!msg) return
    if ((msg.typed ?? '') === msg.content) {
      setTypingId(null)
      return
    }
    const timer = setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === typingId
          ? { ...m, typed: m.content.slice(0, (m.typed?.length ?? 0) + 4) }
          : m
      ))
    }, 10)
    return () => clearTimeout(timer)
  }, [typingId, messages])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error('request failed')
      const { content } = await res.json()
      const id = `ai-${Date.now()}`
      setTypingId(id)
      setMessages(prev => [...prev, { role: 'assistant', content, id, typed: '' }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or reach KJB Solutions directly at **571-277-3586** or **kbjsolutions@kjbsolution.com**.",
      }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Floating trigger button */}
      <div
        className={`${styles.trigger} ${open ? styles.triggerHide : ''} ${hasOpened ? styles.triggerCompact : ''}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open KJB AI chat"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
      >
        <div className={styles.pulseRing} aria-hidden="true" />
        <div className={styles.pulseRing2} aria-hidden="true" />
        <div className={styles.triggerCore}>
          <SparkIcon className={styles.triggerSparkIcon} />
          <span className={styles.triggerLabel}>KJB AI</span>
        </div>
      </div>

      {/* Chat panel */}
      <div
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-label="KJB AI Chat Assistant"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBrand}>
            <div className={styles.headerAvatar} aria-hidden="true">
              <SparkIcon className={styles.headerAvatarIcon} />
              <div className={styles.headerAvatarGlow} />
            </div>
            <div>
              <div className={styles.headerTitle}>KJB AI</div>
              <div className={styles.headerSub}>
                <span className={styles.onlineDot} />
                Online
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages} role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => (
            <div
              key={msg.id ?? i}
              className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgRowUser : styles.msgRowBot}`}
              style={{ '--i': i }}
            >
              {msg.role === 'assistant' && (
                <div className={styles.botAvatar} aria-hidden="true">
                  <SparkIcon className={styles.botAvatarIcon} />
                </div>
              )}
              <div className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                {msg.typed !== undefined
                  ? <>
                      {formatText(msg.typed)}
                      {msg.typed !== msg.content && <span className={styles.cursor} aria-hidden="true" />}
                    </>
                  : formatText(msg.content)
                }
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.msgRow} ${styles.msgRowBot}`}>
              <div className={styles.botAvatar} aria-hidden="true">
                <SparkIcon className={styles.botAvatarIcon} />
              </div>
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typingBubble}`} aria-label="KJB AI is typing">
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className={styles.inputWrap}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about KJB Solutions…"
            disabled={loading}
            maxLength={500}
            aria-label="Chat message input"
          />
          <button
            className={styles.sendBtn}
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  )
}
