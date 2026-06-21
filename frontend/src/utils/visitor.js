const VISITOR_KEY = 'srl_visitor_id'

export function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return `v-${Date.now()}`
  }
}

export function getChatSessionId() {
  try {
    let id = sessionStorage.getItem('srl_chat_session')
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `c-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      sessionStorage.setItem('srl_chat_session', id)
    }
    return id
  } catch {
    return `c-${Date.now()}`
  }
}

export function setChatSessionId(id) {
  try {
    sessionStorage.setItem('srl_chat_session', id)
  } catch {
    /* ignore */
  }
}
