import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="h-100 shadow-sm">
      {product.image && (
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5">{product.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {product.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-primary mb-0">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </h5>
          {product.category && (
            <Badge bg="secondary">{product.category}</Badge>
          )}
        </div>
        
        {product.stock !== undefined && (
          <div className="mb-2">
            <small className="text-muted">
              Stock: {product.stock} available
            </small>
          </div>
        )}
        
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            variant="primary" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-grow-1 me-2"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          
          {quantity > 0 && (
            <Badge bg="success" className="fs-6">
              In Cart: {quantity}
            </Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
