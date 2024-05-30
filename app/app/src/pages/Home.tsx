import  { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

return (
    <div>
        <h1>Products</h1>
        {products.length === 0 ? (
            <p>No products available</p>
        ) : (
            <ul>
                {products.map((product: { _id: string, name: string }) => (
                    <li key={product._id}>{product.name}</li>
                ))}
            </ul>
        )}
    </div>
);
};

export default Home;
