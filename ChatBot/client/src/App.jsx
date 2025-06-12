import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from "./pages/Chatbot";
import { getToken } from "./auth";
import { useState } from "react";
import AllProducts from "./pages/AllProducts";
import Landing from "./pages/Landing";

function App() {
  const [token, setToken] = useState(getToken());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            !token ? (
              <Login onLogin={() => setToken(getToken())} />
            ) : (
              <Navigate to="/chat" />
            )
          }
        />

        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/chat" />}
        />
        <Route
          path="/chat"
          element={
            token ? (
              <Chatbot onLogout={() => setToken(null)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/products" element={<AllProducts />} />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
