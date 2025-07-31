import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="bi bi-cart3 me-2"></i>
            ObservaCart
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            {isAuthenticated && (
              <LinkContainer to="/orders">
                <Nav.Link>My Orders</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          
          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link className="position-relative">
                <i className="bi bi-cart3"></i>
                {getTotalItems() > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            
            {isAuthenticated ? (
              <>
                <Nav.Link disabled className="text-light">
                  Welcome, {user?.name || user?.email}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-warning">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
