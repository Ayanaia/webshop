import { useEffect, useState } from 'react'
import { getOrdersForUser } from '../../core/modules/orders/Orders.api'
import styles from './Orders.module.css'
import { useAuth } from '../../contexts/AuthContext'
import { Order } from '../../core/modules/orders/Orders.types'

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersForUser()
        setOrders(ordersData)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch orders', error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const calculateTotal = (order: Order) => {
    return order.products.reduce(
      (sum, item) => sum + (item.productId as any)?.price * item.quantity,
      0,
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.ordersContainer}>
      <h1>{user?.role === 'seller' ? 'Placed Orders' : 'Your Orders'}</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={styles.order}>
            <h3>Order ID: {order._id}</h3>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            {user?.role === 'seller' && (
              <p>
                Customer: {order.userId.name} ({order.userId.email})
              </p>
            )}
            <ul>
              {order.products.map((item) => (
                <li key={item.productId?._id ?? item.productId}>
                  {(item.productId as any)?.name ?? 'Product not found'} -{' '}
                  {item.quantity} pcs
                </li>
              ))}
            </ul>
            <p>Total: ${calculateTotal(order).toFixed(2)}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
