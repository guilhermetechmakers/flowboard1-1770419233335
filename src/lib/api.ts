const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export interface ApiError {
  message: string
  code?: string
  status?: number
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  const token = localStorage.getItem('access_token')
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(url, { ...options, headers })
  if (!res.ok) {
    const err: ApiError = {
      message: res.statusText,
      status: res.status,
    }
    try {
      const body = await res.json()
      if (body.message) err.message = body.message
      if (body.code) err.code = body.code
    } catch {
      // ignore
    }
    throw err
  }
  const contentType = res.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return res.json() as Promise<T>
  }
  return res.text() as Promise<T>
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}

// Auth
export interface LoginBody {
  email: string
  password: string
  remember?: boolean
}
export interface RegisterBody {
  email: string
  password: string
  name: string
  org?: string
}
export interface AuthResponse {
  access_token: string
  refresh_token?: string
  user: { id: string; email: string; name?: string }
}

export function authApi() {
  return {
    login: (body: LoginBody) => api.post<AuthResponse>('/auth/login', body),
    register: (body: RegisterBody) => api.post<AuthResponse>('/auth/register', body),
    refresh: () => api.post<AuthResponse>('/auth/refresh'),
    resetRequest: (email: string) => api.post('/auth/reset', { email }),
    resetConfirm: (token: string, password: string) =>
      api.post('/auth/reset/confirm', { token, password }),
    verify: (token: string) => api.post('/auth/verify', { token }),
    verifyResend: () => api.post('/auth/verify/resend'),
  }
}

// Projects & boards (stub types for UI)
export interface Project {
  id: string
  name: string
  thumbnail?: string
  lastActivity?: string
  collaborators?: { id: string; name: string; avatar?: string }[]
}
export interface Board {
  id: string
  projectId: string
  name: string
  nodes?: unknown[]
  edges?: unknown[]
}

export function projectsApi() {
  return {
    list: () => api.get<Project[]>('/projects'),
    get: (id: string) => api.get<Project>(`/projects/${id}`),
    create: (body: { name: string }) => api.post<Project>('/projects', body),
  }
}

export function boardsApi() {
  return {
    list: (projectId: string) => api.get<Board[]>(`/projects/${projectId}/boards`),
    get: (projectId: string, boardId: string) =>
      api.get<Board>(`/projects/${projectId}/boards/${boardId}`),
    create: (projectId: string, body: { name: string }) =>
      api.post<Board>(`/projects/${projectId}/boards`, body),
  }
}
