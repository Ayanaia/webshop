import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (
    token &&
    !config.url?.includes('/login') &&
    !config.url?.includes('/register')
  ) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
