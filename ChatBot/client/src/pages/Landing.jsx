import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>🛍️ Uplyft E-commerce</h1>
        <div className={styles.btnGroup}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <div className={styles.hero}>
        <h2>Welcome to the Smart Shopping Experience</h2>
        <p>
          Chat with our intelligent assistant to find your favorite products,
          compare prices, and discover deals — all in one place!
        </p>
        <button onClick={() => navigate("/chat")}>Explore Chatbot</button>
      </div>
    </div>
  );
};

export default Landing;
