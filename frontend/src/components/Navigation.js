import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav-modern">
      <div className="container-modern">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <i className="bi bi-cart3" style={{ marginRight: 'var(--space-2)' }}></i>
            ObservaCart
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="btn-secondary d-lg-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              padding: 'var(--space-2)',
              border: 'none',
              background: 'transparent'
            }}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`} style={{ fontSize: 'var(--text-xl)' }}></i>
          </button>

          {/* Desktop Navigation */}
          <div className={`nav-links ${isMenuOpen ? 'd-block' : 'd-none'} d-lg-flex`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link 
                to="/orders" 
                className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            
            {/* Cart Link with Badge */}
            <Link 
              to="/cart" 
              className="nav-link"
              style={{ position: 'relative' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="bi bi-cart3" style={{ fontSize: 'var(--text-lg)' }}></i>
              {getTotalItems() > 0 && (
                <span 
                  className="badge-modern badge-danger"
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700'
                  }}
                >
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                <span 
                  className="nav-link" 
                  style={{ 
                    color: 'var(--neutral-700)', 
                    cursor: 'default',
                    fontWeight: '600' 
                  }}
                >
                  {user?.name || user?.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    padding: 'var(--space-2) var(--space-4)'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn-secondary"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    padding: 'var(--space-2) var(--space-4)',
                    textDecoration: 'none'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    padding: 'var(--space-2) var(--space-4)',
                    textDecoration: 'none'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
