import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setError('Please log in to complete your purchase');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: getTotalPrice()
      };

      const response = await orderService.createOrder(orderData);
      // Assuming response contains order details or success message
      if (response) {
        setSuccess('Order placed successfully! Redirecting to orders page...');
        clearCart();
        
        // Redirects to orders page after 2 seconds
        setTimeout(() => {
          window.location.href = '/orders';
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };
  //Clear the cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setSuccess('Cart cleared successfully');
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6} className="text-center">
            <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
            <h2 className="mb-3">Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <LinkContainer to="/products">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold mb-3">Shopping Cart</h1>
          <p className="lead text-muted">
            Review your items and proceed to checkout
          </p>
        </Col>
      </Row>

      {/* Alerts */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {success && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Cart Items ({getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''})
                </h5>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={handleClearCart}
                  disabled={loading}
                >
                  Clear Cart
                </Button>
              </div>
            </Card.Header>
            <ListGroup variant="flush">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal ({getTotalItems()} items):</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span className="text-success">Free</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Tax:</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>${(getTotalPrice() * 1.08).toFixed(2)}</strong>
              </div>

              {!isAuthenticated && (
                <Alert variant="warning" className="small mb-3">
                  Please <LinkContainer to="/login"><Alert.Link>log in</Alert.Link></LinkContainer> to proceed with checkout
                </Alert>
              )}

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={loading || !isAuthenticated}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Kindly wait, processing your order...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
                
                <LinkContainer to="/products">
                  <Button variant="outline-secondary">
                    Continue Shopping
                  </Button>
                </LinkContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
