import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import './styles/modern.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="*" element={
                <div className="container-modern text-center" style={{ padding: '5rem 0' }}>
                  <i className="bi bi-exclamation-triangle" style={{ fontSize: '4rem', color: 'var(--neutral-400)', marginBottom: '2rem', display: 'block' }}></i>
                  <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: '800', marginBottom: '1rem' }}>404 - Page Not Found</h1>
                  <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-lg)' }}>The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
