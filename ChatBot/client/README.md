# 🛒 Chatbot E-Commerce Application

An intelligent chatbot-driven e-commerce platform where users can search, explore, and discover products using natural language queries. Built using React (frontend) and Flask (backend), the app simulates a real-world shopping experience with authentication and mock product inventory.

---

## ✨ Features

- 🔐 User authentication (JWT-based login/register)
- 💬 Chatbot interface for product search
- 📦 View 100+ mock products across categories
- 🖼️ Dynamic product cards with images
- 🎨 Modern UI using a purple + teal color scheme
- 📱 Fully responsive across desktop, tablet, and mobile

---

## 🧰 Tech Stack

| Layer    | Tools/Frameworks                            |
| -------- | ------------------------------------------- |
| Frontend | React, React Router, CSS Modules            |
| Backend  | Flask, SQLAlchemy, Flask-JWT-Extended, CORS |
| Database | SQLite (with Faker-generated mock data)     |
| UI Theme | Purple + Teal (Modular CSS)                 |
| Hosting  | Render (Backend), Vercel/Netlify (Frontend) |

---

## 📁 Project Structure

ChatBot-Ecommerce/
├── client/ # React frontend
│ ├── pages/ # Login, Register, Chatbot, Landing
│ ├── components/ # ProductCard, UI components
│ ├── api.js # Axios instance
│ ├── auth.js # Token helpers
│ └── ...
├── server/ # Flask backend
│ ├── app.py # App entry point
│ ├── models.py # User, Product models
│ ├── routes/ # auth.py, chat.py
│ ├── db/seed.py # Seeds 100+ mock products
│ └── extensions.py # DB, JWT, and CORS setup

---

## ⚙️ Setup Instructions

### 🔧 Backend (Flask)

```bash
- cd server
- python -m venv venv
- venv\Scripts\activate     # Use `source venv/bin/activate` on Mac/Linux
- pip install -r requirements.txt
- python db/seed.py         # Seeds 100+ mock products into SQLite
- python app.py             # Runs the backend on http://localhost:5000
```
