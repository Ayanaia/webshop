// import React from "react";
import { useParams } from 'react-router-dom'
import { useProducts } from '../contexts/ProductContext'

function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { products } = useProducts()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  )
}

export default ProductDetail
