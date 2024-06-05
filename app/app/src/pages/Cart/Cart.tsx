import { useEffect, useState } from 'react'
import {
  getCart,
  placeOrder,
  removeFromCart,
  updateCartQuantity,
} from '../../core/modules/cart/Cart.api'
import type { Cart, CartItem } from '../../core/modules/cart/Cart.types'
import styles from './Cart.module.css'
import productImage from '../../assets/product-image.png'

const Cart = () => {
  const [cart, setCartItems] = useState<Cart | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        setCartItems(cartData)
      } catch (error) {
        console.error('Failed to fetch cart items', error)
      }
    }

    fetchCart()
  }, [])

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart(productId)
      const cartData = await getCart()
      setCartItems(cartData)
    } catch (error) {
      console.error('Failed to remove from cart', error)
    }
  }

  const handleQuantityChange = async (productId: string, quantity: number) => {
    try {
      await updateCartQuantity(productId, quantity)
      setCartItems((prevCart) => {
        if (!prevCart) return prevCart
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.productId && item.productId._id === productId
              ? { ...item, quantity }
              : item,
          ),
        }
      })
    } catch (error) {
      console.error('Failed to update cart quantity', error)
    }
  }

  const handlePlaceOrder = async () => {
    try {
      await placeOrder()
      const cartData = await getCart()
      setCartItems(cartData)
      alert('Order placed successfully!')
    } catch (error) {
      console.error('Failed to place order', error)
    }
  }

  const calculateTotal = () => {
    if (!cart) return 0
    return cart.items.reduce(
      (sum, item) =>
        sum + (item.productId ? item.productId.price * item.quantity : 0),
      0,
    )
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <h1>My cart</h1>
          {cart && cart.items && cart.items.length === 0 ? (
            <p className={styles.noCart}>No items in cart</p>
          ) : (
            <ul>
              {cart?.items?.map((item: CartItem) =>
                item.productId ? (
                  <li key={item.productId._id} className={styles.cartItem}>
                    <img
                      src={item.productId.images[0] || productImage}
                      alt={item.productId.name}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <div>
                        <div className={styles.productName}>
                          {item.productId.name}
                        </div>
                        <div className={styles.productPrice}>
                          ${item.productId.price.toFixed(2)}
                        </div>
                      </div>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id || '',
                              item.quantity - 1,
                            )
                          }
                          disabled={item.quantity <= 1}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id || '',
                              item.quantity + 1,
                            )
                          }
                          disabled={
                            item.quantity >= (item.productId?.stock || 0)
                          }>
                          +
                        </button>
                        <button
                          className={styles.removeButton}
                          onClick={() =>
                            handleRemoveFromCart(item.productId._id || '')
                          }>
                          ×
                        </button>
                      </div>
                    </div>
                  </li>
                ) : null,
              )}
            </ul>
          )}
          <div className={styles.additionalOptions}>
            <p>Enter a promo code</p>
            <p>Add a note</p>
          </div>
        </div>
        <div className={styles.orderSummary}>
          <h2>Order summary</h2>
          <div className={styles.summaryRow}>
            <div>Subtotal</div>
            <div>${calculateTotal().toFixed(2)}</div>
          </div>
          <div className={styles.summaryRow}>
            <div>Delivery</div>
            <div>FREE</div>
          </div>
          <div className={styles.summaryRow}>
            <div>Delivery to</div>
            <div>Brussels, Belgium</div>
          </div>
          <div className={styles.summaryRow}>
            <div>Total</div>
            <div>${calculateTotal().toFixed(2)}</div>
          </div>
          <button onClick={handlePlaceOrder} className={styles.checkoutButton}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
