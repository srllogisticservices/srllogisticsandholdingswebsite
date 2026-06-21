const API_BASE = import.meta.env.VITE_API_URL || ''
const TOKEN_KEY = 'srl_admin_token'

function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const detail = err.detail
    let message = `Request failed: ${res.status}`
    if (typeof detail === 'string') message = detail
    else if (Array.isArray(detail) && detail[0]?.msg) message = detail[0].msg
    throw new Error(message)
  }
  return res.json()
}

async function adminRequest(path, options = {}) {
  const token = getAdminToken()
  return request(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

export const api = {
  getContent: () => request('/api/content'),
  getService: (slug) => request(`/api/services/${slug.replace(/^\//, '')}`),
  getContactOptions: () => request('/api/contact/options'),
  submitContact: (data) =>
    request('/api/contact', { method: 'POST', body: JSON.stringify(data) }),

  trackPageView: (data) =>
    request('/api/analytics/pageview', { method: 'POST', body: JSON.stringify(data) }),

  sendChatMessage: (data) =>
    request('/api/chat', { method: 'POST', body: JSON.stringify(data) }),

  getChatStatus: () => request('/api/chat/status'),

  getChatWelcome: () => request('/api/chat/welcome'),

  adminLogin: (username, password) =>
    request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  adminLogout: () => adminRequest('/api/admin/logout', { method: 'POST' }),
  adminMe: () => adminRequest('/api/admin/me'),
  adminListContent: () => adminRequest('/api/admin/content'),
  adminGetContent: (fileKey) => adminRequest(`/api/admin/content/${fileKey}`),
  adminSaveContent: (fileKey, data) =>
    adminRequest(`/api/admin/content/${fileKey}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    }),
  adminMessages: () => adminRequest('/api/admin/messages'),
  adminAnalytics: (days = 30) => adminRequest(`/api/admin/analytics?days=${days}`),
  adminChatLogs: () => adminRequest('/api/admin/chat/logs'),
}

export { getAdminToken }
