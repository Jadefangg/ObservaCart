import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAllProducts();
      setProducts(response.data || response);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = () => {
    loadProducts();
  };

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  return (
    <div style={{ padding: 'var(--space-8) 0', minHeight: '100vh' }}>
      <div className="container-modern">
        {/* Header Section */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ 
            fontSize: 'var(--text-5xl)', 
            fontWeight: '800',
            marginBottom: 'var(--space-4)',
            color: 'var(--text-accent)'
          }}>
            Our Products
          </h1>
          <p style={{ 
            fontSize: 'var(--text-xl)', 
            color: 'var(--text-accent-light)',
            maxWidth: '600px'
          }}>
            Discover our wide range of quality products with advanced observability tracking
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-4)', 
          marginBottom: 'var(--space-8)',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <input
              type="text"
              className="form-input-modern"
              placeholder="Search products by name, description, or category..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {searchTerm && (
              <button 
                className="btn-secondary"
                onClick={() => setSearchTerm('')}
                style={{ padding: 'var(--space-3)' }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
            <button 
              className="btn-primary"
              onClick={handleRefresh}
            >
              <i className="bi bi-arrow-clockwise"></i>
              Refresh
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'var(--danger-50)',
            border: '1px solid var(--danger-200)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            color: 'var(--danger-600)'
          }}>
            <h4 style={{ fontWeight: '600', marginBottom: 'var(--space-2)' }}>
              Error Loading Products
            </h4>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 && !loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--space-20) 0',
            color: 'var(--text-accent-light)'
          }}>
            <i className="bi bi-search" style={{ 
              fontSize: '4rem', 
              marginBottom: 'var(--space-6)',
              display: 'block',
              opacity: '0.5'
            }}></i>
            <h3 style={{ 
              fontSize: 'var(--text-2xl)', 
              fontWeight: '600',
              marginBottom: 'var(--space-4)'
            }}>
              {searchTerm ? 'No products found' : 'No products available'}
            </h3>
            <p style={{ 
              fontSize: 'var(--text-lg)',
              marginBottom: searchTerm ? 'var(--space-6)' : '0'
            }}>
              {searchTerm 
                ? `Try adjusting your search term "${searchTerm}"` 
                : 'Check back later for new products'
              }
            </p>
            {searchTerm && (
              <button 
                className="btn-primary"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Info */}
            {filteredProducts.length > 0 && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <p style={{ 
                  color: 'var(--text-accent-light)', 
                  fontSize: 'var(--text-sm)',
                  margin: 0
                }}>
                  {searchTerm && (
                    <>Showing {filteredProducts.length} result(s) for "{searchTerm}" • </>
                  )}
                  {filteredProducts.length} product(s) total
                </p>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid-modern grid-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
