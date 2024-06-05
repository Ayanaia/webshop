export interface Seller {
  _id: string
  name: string
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  sellerId: Seller
}
