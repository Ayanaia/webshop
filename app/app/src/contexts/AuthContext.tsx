import {
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from 'react'
import api from '../services/api'

interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  role: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  login: (token: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      api
        .get('/users/current')
        .then((response) => {
          setUser(response.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
          delete api.defaults.headers.common['Authorization']
        })
    }
  }, [])

  const login = async (token: string) => {
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await api.get('/users/current')
    setUser(response.data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
