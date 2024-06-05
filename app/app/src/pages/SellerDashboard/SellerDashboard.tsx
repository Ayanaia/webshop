import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getProductsBySeller,
  deleteProduct,
} from '../../core/modules/products/product.api'
import { Product } from '../../core/modules/products/Product.types'
import { useAuth } from '../../contexts/AuthContext'
import style from './SellerDashboard.module.css'

const SellerDashboard = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const navigate = useNavigate()

  const defaultImage =
    'https://static.wixstatic.com/media/ea71bb_fe4605fcf8b74a439ad933c7253d7779~mv2_d_2629_3487_s_4_2.jpg/v1/fill/w_1000,h_1326,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ea71bb_fe4605fcf8b74a439ad933c7253d7779~mv2_d_2629_3487_s_4_2.jpg'

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  const fetchProducts = async () => {
    try {
      const products = await getProductsBySeller()
      setProducts(products)
    } catch (error) {
      console.error('Failed to fetch products', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)
      fetchProducts()
    } catch (error) {
      console.error('Failed to delete product', error)
    }
  }

  return (
    <div>
      <div className={style.filterContainer}>
        <h1>Your Products</h1>
        <button
          onClick={() => navigate('/products/new')}
          className={style.btnAddNew}>
          Add New Product
        </button>
      </div>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul className={style.products}>
          {products.map((product) => (
            <li key={product._id} className={style.productItem}>
              <img
                src={product.images[0] || defaultImage}
                alt={product.name}
                className={style.productImage}
              />
              <div className={style.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className={style.price}>${product.price.toFixed(2)}</p>
                <div className={style.productActions}>
                  <button
                    onClick={() => navigate(`/products/edit/${product._id}`)}
                    className={style.btnEdit}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className={style.btnDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SellerDashboard
