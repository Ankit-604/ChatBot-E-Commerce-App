import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import styles from './AllProducts.module.css';

const AllProducts = () => {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        const groupedByCategory = res.data.reduce((acc, product) => {
          const cat = product.category || 'Others';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(product);
          return acc;
        }, {});
        setGrouped(groupedByCategory);
      } catch (err) {
        alert('Failed to load products.');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.page}>
      <h2>🛒 All Products by Category</h2>
      {Object.keys(grouped).map((category) => (
        <div key={category} className={styles.section}>
          <h3>{category}</h3>
          <div className={styles.grid}>
            {grouped[category].map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
