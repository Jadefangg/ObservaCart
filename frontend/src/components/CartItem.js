import React from 'react';
import { Card, ListGroup, Button, Row, Col, Image } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <ListGroup.Item>
      <Row className="align-items-center">
        <Col md={2}>
          {item.image ? (
            <Image 
              src={item.image} 
              alt={item.name}
              rounded 
              fluid
              style={{ maxHeight: '80px', objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="bg-light d-flex align-items-center justify-content-center rounded"
              style={{ height: '80px', width: '80px' }}
            >
              <i className="bi bi-image text-muted"></i>
            </div>
          )}
        </Col>
        
        <Col md={4}>
          <h6 className="mb-1">{item.name}</h6>
          <small className="text-muted">${item.price}</small>
        </Col>
        
        <Col md={3}>
          <div className="d-flex align-items-center">
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <i className="bi bi-dash"></i>
            </Button>
            
            <span className="mx-3 fw-bold">{item.quantity}</span>
            
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <i className="bi bi-plus"></i>
            </Button>
          </div>
        </Col>
        
        <Col md={2}>
          <div className="text-end">
            <h6 className="mb-1">${itemTotal}</h6>
          </div>
        </Col>
        
        <Col md={1}>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={handleRemove}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
