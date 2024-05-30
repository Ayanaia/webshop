// import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import Favorites from './pages/Favorites.tsx'
import Cart from './pages/Cart.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ProductProvider } from './contexts/ProductContext.tsx'

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes
