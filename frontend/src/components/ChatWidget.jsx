import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { api } from '../api/client'
import { getChatSessionId, getVisitorId, setChatSessionId } from '../utils/visitor'

const FALLBACK_WELCOME =
  'Welcome to SRL Logistics & Holdings Pages.\n\nPlease tell me what you need or would like to search for on this website.'

const FALLBACK_QUESTIONS = [
  'What logistics services does SRL offer?',
  'How do I request a quote on this website?',
  'Do you provide cloud hosting and managed IT support?',
  'What software or database solutions can you build?',
  'How can I contact your team in Honiara?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loadingWelcome, setLoadingWelcome] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(false)
  const [messages, setMessages] = useState([])
  const [suggestedQuestions, setSuggestedQuestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [sessionId, setSessionId] = useState(() => getChatSessionId())
  const listRef = useRef(null)
  const welcomeLoaded = useRef(false)

  useEffect(() => {
    api
      .getChatStatus()
      .then((status) => setAiEnabled(Boolean(status.aiEnabled)))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!open || welcomeLoaded.current) return

    setLoadingWelcome(true)
    api
      .getChatWelcome()
      .then((welcome) => {
        setAiEnabled(Boolean(welcome.aiEnabled))
        setSuggestedQuestions(welcome.suggestedQuestions?.length ? welcome.suggestedQuestions : FALLBACK_QUESTIONS)
        setMessages([{ role: 'assistant', text: welcome.welcomeMessage || FALLBACK_WELCOME }])
        welcomeLoaded.current = true
      })
      .catch(() => {
        setSuggestedQuestions(FALLBACK_QUESTIONS)
        setMessages([{ role: 'assistant', text: FALLBACK_WELCOME }])
        welcomeLoaded.current = true
      })
      .finally(() => setLoadingWelcome(false))
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open, suggestedQuestions, loadingWelcome])

  async function sendMessage(e, presetText) {
    e?.preventDefault()
    const text = (presetText ?? input).trim()
    if (!text || sending) return

    setInput('')
    setShowSuggestions(false)
    setMessages((prev) => [...prev, { role: 'user', text }])
    setSending(true)

    try {
      const res = await api.sendChatMessage({
        message: text,
        sessionId,
        visitorId: getVisitorId(),
      })
      if (res.sessionId) {
        setSessionId(res.sessionId)
        setChatSessionId(res.sessionId)
      }
      setMessages((prev) => [...prev, { role: 'assistant', text: res.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Sorry, I could not connect right now. Please call +677 7885155, email info@srllogisticsandholdings.com, or visit our Contact page.',
        },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed z-50 inset-x-3 sm:inset-x-auto align-fab align-fab-mobile w-auto sm:w-[min(100vw-3rem,380px)] max-h-[min(70vh,520px)] flex flex-col bg-white rounded-2xl border border-brand-200 shadow-2xl overflow-hidden safe-area-pb"
          role="dialog"
          aria-label="SRL Auto Chat Assistant"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-brand-950 text-white">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-lg bg-brand-400/20">
                <Bot className="w-5 h-5 text-brand-400" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate flex items-center gap-1.5">
                  Auto Chat with SRL
                  {aiEnabled && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium bg-brand-400/20 text-brand-300 px-1.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-brand-200 truncate">
                  {aiEnabled
                    ? 'AI answers about services and pages on this site'
                    : 'Ask what you need or search on this website'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 shrink-0"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-50/40 min-h-[220px]">
            {loadingWelcome && !messages.length && (
              <p className="text-xs text-slate-500 animate-pulse">Loading assistant...</p>
            )}

            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-md'
                      : 'bg-white border border-brand-100 text-slate-700 rounded-bl-md shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {showSuggestions && suggestedQuestions.length > 0 && !sending && (
              <div className="pt-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  {aiEnabled ? 'Suggested questions' : 'Try asking'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(undefined, question)}
                      className="text-left text-xs leading-snug px-3 py-2 rounded-xl border border-brand-200 bg-white text-brand-900 hover:bg-brand-50 hover:border-brand-300 transition-colors shadow-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sending && (
              <p className="text-xs text-slate-500 animate-pulse">
                {aiEnabled ? 'AI is generating an answer...' : 'SRL assistant is typing...'}
              </p>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-brand-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  aiEnabled
                    ? 'Tell me what you need or search on this website...'
                    : 'Ask about services, quotes, or pages...'
                }
                className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                disabled={sending || loadingWelcome}
              />
              <button
                type="submit"
                disabled={sending || loadingWelcome || !input.trim()}
                className="p-2.5 rounded-xl bg-brand-400 text-brand-950 hover:bg-brand-300 disabled:opacity-50 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              {aiEnabled ? 'AI-powered Q&A' : 'Smart assistant'} · For urgent help{' '}
              <Link to="/contact" className="text-brand-600 hover:underline" onClick={() => setOpen(false)}>
                contact us
              </Link>
            </p>
          </form>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed z-50 align-fab align-fab-mobile inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all bg-brand-400 text-brand-950 hover:bg-brand-300 hover:scale-105 safe-area-pb"
          aria-label="Open Auto Chat with SRL"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:inline">Auto Chat with SRL</span>
        </button>
      )}
    </>
  )
}
