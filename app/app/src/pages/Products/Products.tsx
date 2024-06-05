import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getProducts } from '../../core/modules/products/product.api'
import style from './Products.module.css'
import { Product } from '../../core/modules/products/Product.types'
import productImage from '../../assets/product-image.png'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState<string>('cheapest')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [productsPerPage] = useState<number>(12)
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error('Failed to fetch products', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.sellerId.name.toLowerCase().includes(searchQuery)
      )
    })

    setFilteredProducts(filtered)
  }, [location.search, products])

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortOption) {
        case 'cheapest':
          return a.price - b.price
        case 'highest':
          return b.price - a.price
        default:
          return 0
      }
    })
    setFilteredProducts(sortedProducts)
  }, [sortOption, products])

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className={style.filterContainer}>
        <h1>All Products</h1>
        <select
          className={style.sortDropdown}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}>
          <option value="cheapest">Lowest Price</option>
          <option value="highest">Highest Price</option>
        </select>
      </div>
      <p className={style.productCount}>{filteredProducts.length} products</p>
      {currentProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul className={style.products}>
          {currentProducts.map((product) => (
            <li key={product._id} className={style.productItem}>
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.images[0] || productImage}
                  alt={product.name}
                  className={style.productImage}
                />
                <h3>{product.name}</h3>
                <p>{product.sellerId.name}</p>
                <p className={style.price}>${product.price.toFixed(2)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className={style.pagination}>
        {[
          ...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys(),
        ].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={style.pageLink}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Products
