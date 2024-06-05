import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import axios from 'axios'

interface ProductContextType {
  products: any[]
  fetchProducts: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<any[]>([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Failed to fetch products', error)
      setProducts([]) // Set an empty array in case of error
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
