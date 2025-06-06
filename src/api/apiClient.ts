import axios from 'axios'
  baseURL: 'https://localhost:7096/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})
export const initializeClient = (): void => {
  const existingToken = localStorage.getItem('token')
  if (existingToken) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`
  }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
  }
  return config
})
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      delete apiClient.defaults.headers.common['Authorization']
      window.location.href = '/login'
    return Promise.reject(error)
  },
)
