import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ProductCard from "../components/ProductCard";
import styles from "./Chatbot.module.css";
import { removeToken } from "../auth";

const Chatbot = ({ onLogout }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await API.post("/chat", { message: input });
      const botMsg = {
        sender: "bot",
        text: res.data.results.length
          ? `Found ${res.data.results.length} product(s)`
          : "No matching products found.",
      };
      setMessages((prev) => [...prev, botMsg]);
      setProducts(res.data.results);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error fetching results" },
      ]);
    }

    setInput("");
  };

  const handleLogout = () => {
    removeToken();
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h2>🛍️ E-commerce Chatbot</h2>
      </div>

      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? styles.userMsg : styles.botMsg}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputGroup}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a product..."
        />
        <button onClick={handleSend}>Send</button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.viewAllBtn}
          onClick={() => navigate("/products")}
        >
          🔍 View All Products
        </button>
      </div>

      <div className={styles.productGrid}>
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>

      <div className={styles.logoutWrapper}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Chatbot;
