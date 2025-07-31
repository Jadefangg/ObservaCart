import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card-product">
      {product.image && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img 
            className="product-image"
            src={product.image} 
            alt={product.name}
          />
          {product.stock === 0 && (
            <div style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'var(--danger-500)',
              color: 'white',
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: '600'
            }}>
              Out of Stock
            </div>
          )}
          {quantity > 0 && (
            <div style={{
              position: 'absolute',
              top: 'var(--space-4)',
              left: 'var(--space-4)',
              background: 'var(--success-500)',
              color: 'white',
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: '600'
            }}>
              {quantity} in cart
            </div>
          )}
        </div>
      )}
      
      <div style={{ padding: 'var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          {product.category && (
            <span className="badge-modern" style={{
              background: 'var(--primary-100)',
              color: 'var(--primary-700)',
              marginBottom: 'var(--space-3)',
              display: 'inline-block'
            }}>
              {product.category}
            </span>
          )}
          
          <h3 style={{ 
            fontSize: 'var(--text-xl)', 
            fontWeight: '700',
            marginBottom: 'var(--space-2)',
            color: 'var(--neutral-800)',
            lineHeight: '1.3'
          }}>
            {product.name}
          </h3>
          
          <p style={{ 
            color: 'var(--neutral-600)', 
            fontSize: 'var(--text-sm)',
            lineHeight: '1.5',
            marginBottom: 'var(--space-4)'
          }}>
            {product.description}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)'
        }}>
          <div style={{ 
            fontSize: 'var(--text-2xl)', 
            fontWeight: '800',
            color: 'var(--primary-600)'
          }}>
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </div>
          
          {product.stock !== undefined && (
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--neutral-500)',
              fontWeight: '500'
            }}>
              {product.stock} available
            </div>
          )}
        </div>
        
        <button 
          className={`btn-modern ${product.stock === 0 ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600'
          }}
        >
          {product.stock === 0 ? (
            <>
              <i className="bi bi-x-circle"></i>
              Out of Stock
            </>
          ) : (
            <>
              <i className="bi bi-cart-plus"></i>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
