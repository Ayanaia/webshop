import api from '../../network/api'
import { User } from './User.types'

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/users/current')
  return response.data
}

export const updateUser = async (
  id: string,
  userData: Partial<User>,
): Promise<User> => {
  const response = await api.patch(`/users/${id}`, userData)
  return response.data
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users')
  return response.data
}
