import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Welcome to ObservaCart
              </h1>
              <p className="lead mb-4">
                Your premier e-commerce destination with advanced observability. 
                Shop with confidence knowing every interaction is monitored and optimized.
              </p>
              {isAuthenticated ? (
                <div>
                  <h5 className="mb-3">Welcome back, {user?.name || user?.email}!</h5>
                  <LinkContainer to="/products">
                    <Button variant="light" size="lg">
                      Continue Shopping
                    </Button>
                  </LinkContainer>
                </div>
              ) : (
                <div>
                  <LinkContainer to="/products">
                    <Button variant="light" size="lg" className="me-3">
                      Shop Now
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Button variant="outline-light" size="lg">
                      Create Account
                    </Button>
                  </LinkContainer>
                </div>
              )}
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <i className="bi bi-cart3 display-1"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold mb-4">Why Choose ObservaCart?</h2>
            <p className="lead text-muted">
              Experience next-generation e-commerce with full observability
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <i className="bi bi-lightning-charge text-primary display-4 mb-3"></i>
                <Card.Title>Fast & Reliable</Card.Title>
                <Card.Text>
                  Lightning-fast performance with real-time monitoring to ensure 
                  the best shopping experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <i className="bi bi-shield-check text-success display-4 mb-3"></i>
                <Card.Title>Secure & Monitored</Card.Title>
                <Card.Text>
                  Advanced security with comprehensive observability. Every transaction 
                  is tracked and protected.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <i className="bi bi-graph-up text-info display-4 mb-3"></i>
                <Card.Title>Analytics-Driven</Card.Title>
                <Card.Text>
                  Powered by real-time analytics and observability tools including 
                  Grafana, Prometheus, and Jaeger.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="fw-bold mb-4">Ready to Start Shopping?</h3>
              <p className="lead mb-4">
                Discover our wide range of products with the best prices and quality.
              </p>
              <LinkContainer to="/products">
                <Button variant="primary" size="lg">
                  Browse Products
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
