import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../core/modules/products/product.api'
import { useAuth } from '../../contexts/AuthContext'
import styles from './AddProduct.module.css'

const AddProduct = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProductData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createProduct({ ...productData, sellerId: user!._id })
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to create product', error)
    }
  }

  return (
    <div className={styles.addProduct}>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <input
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Stock</label>
          <input
            name="stock"
            type="number"
            value={productData.stock}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
