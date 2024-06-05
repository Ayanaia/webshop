import api from '../../network/api'
import { Favorite } from './Favorite.types'

export const getFavorites = async (): Promise<Favorite[]> => {
  const response = await api.get('/favorites')
  return response.data
}

export const addFavorite = async (productId: string): Promise<Favorite> => {
  const response = await api.post('/favorites', { productId })
  return response.data
}

export const removeFavorite = async (id: string): Promise<void> => {
  await api.delete(`/favorites/${id}`)
}
