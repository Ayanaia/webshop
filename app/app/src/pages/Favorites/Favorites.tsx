import { useEffect, useState } from 'react'
import {
  getFavorites,
  removeFavorite,
} from '../../core/modules/favorites/Favorite.api'
import { Favorite } from '../../core/modules/favorites/Favorite.types'
import styles from './Favorites.module.css'
import productImage from '../../assets/product-image.png'

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorites()
        setFavorites(favoritesData)
      } catch (error) {
        console.error('Failed to fetch favorites', error)
      }
    }

    fetchFavorites()
  }, [])

  const handleRemoveFavorite = async (id: string) => {
    try {
      await removeFavorite(id)
      const favoritesData = await getFavorites()
      setFavorites(favoritesData)
    } catch (error) {
      console.error('Failed to remove favorite', error)
    }
  }

  return (
    <div>
      <h1>Favorites</h1>
      <div className={styles.favoritesContainer}>
        {favorites.length === 0 ? (
          <p>No favorites available</p>
        ) : (
          <ul className={styles.favoritesList}>
            {favorites.map((favorite) => (
              <li key={favorite._id} className={styles.favoriteItem}>
                <img
                  src={favorite.product.images[0] || productImage}
                  alt={favorite.product.name}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <div>
                    <div className={styles.productName}>
                      {favorite.product.name}
                    </div>

                    <div className={styles.productPrice}>
                      ${favorite.product.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveFavorite(favorite._id)}>
                    Remove from Favorites
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Favorites
