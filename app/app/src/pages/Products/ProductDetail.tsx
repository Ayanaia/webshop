import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../../core/modules/favorites/Favorite.api'
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../../core/modules/cart/Cart.api'
import { Favorite } from '../../core/modules/favorites/Favorite.types'
import { Cart } from '../../core/modules/cart/Cart.types'
import { Product } from '../../core/modules/products/Product.types'
import MessageForm from '../../components/MessageForm/MessageForm'
import { getProductDetail } from '../../core/modules/products/product.api'
import { useAuth } from '../../contexts/AuthContext'
import styles from './ProductDetail.module.css'
import productImage from '../../assets/product-image.png'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [cart, setCartItems] = useState<Cart | null>(null)
  const [showMessageForm, setShowMessageForm] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductDetail(id!)
        setProduct(productData)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch product', error)
        setLoading(false)
      }
    }

    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorites()
        setFavorites(favoritesData)
      } catch (error) {
        console.error('Failed to fetch favorites', error)
      }
    }

    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        setCartItems(cartData)
      } catch (error) {
        console.error('Failed to fetch cart items', error)
      }
    }

    fetchProduct()
    fetchFavorites()
    fetchCart()
  }, [id])

  if (!id) {
    return <div>Product not found</div>
  }

  const isFavorite = favorites.some((favorite) => favorite.product._id === id)
  const isInCart =
    cart?.items.some((item) => item.productId && item.productId._id === id) ??
    false

  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (isFavorite) {
      const favorite = favorites.find((favorite) => favorite.product._id === id)
      if (favorite) {
        await removeFavorite(favorite._id)
      }
    } else {
      await addFavorite(id)
    }
    const favoritesData = await getFavorites()
    setFavorites(favoritesData)
  }

  const handleCartToggle = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (isInCart) {
      await removeFromCart(id)
    } else {
      await addToCart(id, 1)
    }
    const cartData = await getCart()
    setCartItems(cartData)
  }

  const handleContactSeller = () => {
    if (!user) {
      navigate('/login')
      return
    }

    setShowMessageForm(true)
  }

  const handleMessageSent = () => {
    navigate(`/contact`)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.productImageContainer}>
        <img
          src={product.images[0] || productImage}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfoContainer}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <p className={styles.productQuantity}>Quantity</p>
        <input
          type="number"
          min="1"
          defaultValue="1"
          className={styles.quantityInput}
        />
        <div className={styles.actionButtons}>
          <button className={styles.addToCartButton} onClick={handleCartToggle}>
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteToggle}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        <div className={styles.productInfo}>
          <h3>PRODUCT INFO</h3>
          <p>{product.description}</p>
        </div>
        <button
          className={styles.messageSellerButton}
          onClick={handleContactSeller}>
          Message Seller
        </button>
        {showMessageForm && (
          <MessageForm
            sellerId={product.sellerId._id}
            productId={product._id}
            onMessageSent={handleMessageSent}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDetail
