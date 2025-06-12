import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import styles from "./Login.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/register", { email, password });
      setMessage("✅ Registered successfully. You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("⚠️ Email already exists.");
      } else {
        setMessage("❌ Registration failed.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit">Register</button>
        <p className={styles.linkText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
