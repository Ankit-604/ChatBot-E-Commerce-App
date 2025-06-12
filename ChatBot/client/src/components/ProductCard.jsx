import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img
        src={product.image_url}
        alt={product.name}
        className={styles.image}
      />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>
        <strong>₹{product.price}</strong>
      </p>
      <small>{product.description}</small>
    </div>
  );
};

export default ProductCard;
