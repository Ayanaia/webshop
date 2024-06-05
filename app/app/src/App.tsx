import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Favorites from './pages/Favorites/Favorites'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './contexts/AuthContext'
import { ProductProvider } from './contexts/ProductContext'
import Products from './pages/Products/Products'
import Messages from './pages/Message/Messages'
import Profile from './pages/Profile/Profile'
import ProductDetail from './pages/Products/ProductDetail'
import Orders from './pages/Orders/Orders'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'
import PrivateRoute from './components/PrivateRoutes'
import EditProduct from './pages/SellerDashboard/EditProduct'
import AddProduct from './pages/SellerDashboard/AddProduct'
import EditProfile from './pages/Profile/ProfileEdit'
import AboutUs from './pages/AboutUs/AboutUs'

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Header />
          <div className="pageContainer">
            <div className="pageContent">
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contact" element={<Messages />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute role="seller">
                      <SellerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products/new"
                  element={
                    <PrivateRoute role="seller">
                      <AddProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products/edit/:id"
                  element={
                    <PrivateRoute role="seller">
                      <EditProduct />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
          <Footer />
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
