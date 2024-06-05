import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getProductDetail,
  updateProduct,
} from '../../core/modules/products/product.api'
import styles from './EditProduct.module.css'

const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductDetail(id!)
        setProductData((prevData) => ({
          ...prevData,
          price: String(product.price),
          stock: String(product.stock),
          name: product.name,
          description: product.description,
          category: product.category,
        }))
      } catch (error) {
        console.error('Failed to fetch product', error)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProductData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProduct(id!, productData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to update product', error)
    }
  }

  return (
    <div className={styles.editProduct}>
      <h1>Edit Product</h1>
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
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProduct
