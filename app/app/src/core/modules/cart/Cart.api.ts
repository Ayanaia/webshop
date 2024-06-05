import api from '../../network/api'
import { Order } from '../orders/Orders.types'
import { Cart } from './Cart.types'

export const getCart = async (): Promise<Cart> => {
  const response = await api.get('/cart')
  return response.data
}

export const addToCart = async (
  productId: string,
  quantity: number,
): Promise<Cart> => {
  const response = await api.post('/cart', { productId, quantity })
  return response.data
}

export const removeFromCart = async (productId: string): Promise<Cart> => {
  const response = await api.delete(`/cart/${productId}`)
  return response.data
}

export const updateCartQuantity = async (
  productId: string,
  quantity: number,
): Promise<Cart> => {
  const response = await api.put('/cart/update-quantity', {
    productId,
    quantity,
  })
  return response.data
}

export const placeOrder = async (): Promise<Order> => {
  const response = await api.post('/orders/place-order')
  return response.data
}
