import api from '../../network/api'
import { Product } from './Product.types'

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products')
  return response.data
}

export const getProductDetail = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const createProduct = async (productData: any) => {
  const response = await api.post('/products', productData)
  return response.data
}

export const updateProduct = async (id: string, productData: any) => {
  const response = await api.patch(`/products/${id}`, productData)
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`)
  return response.data
}

export const getProductsBySeller = async (): Promise<Product[]> => {
  const response = await api.get(`/products/seller/current`)
  return response.data
}
