import api from '../../network/api'
import { Order } from './Orders.types'

export const getOrdersForUser = async (): Promise<Order[]> => {
  const response = await api.get('/orders')
  return response.data
}
