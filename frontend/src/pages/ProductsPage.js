import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Alert } from 'react-bootstrap';
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
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold mb-3">Our Products</h1>
          <p className="lead text-muted">
            Discover our wide range of quality products
          </p>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col lg={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search products by name, description, or category..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
              <i className="bi bi-x-lg"></i>
            </Button>
          </InputGroup>
        </Col>
        <Col lg={4} className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleRefresh}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </Button>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <Alert.Heading>Error Loading Products</Alert.Heading>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 && !loading ? (
        <Row>
          <Col className="text-center py-5">
            <i className="bi bi-search display-1 text-muted mb-3"></i>
            <h3 className="text-muted">
              {searchTerm ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-muted">
              {searchTerm 
                ? `Try adjusting your search term "${searchTerm}"` 
                : 'Check back later for new products'
              }
            </p>
            {searchTerm && (
              <Button variant="primary" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            )}
          </Col>
        </Row>
      ) : (
        <>
          {/* Results Info */}
          <Row className="mb-3">
            <Col>
              <small className="text-muted">
                {searchTerm && (
                  <>Showing {filteredProducts.length} result(s) for "{searchTerm}" • </>
                )}
                {filteredProducts.length} product(s) total
              </small>
            </Col>
          </Row>

          {/* Products Grid */}
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} lg={4} md={6} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductsPage;
