import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
//AuthContext has been used for managing authentication state and actions
const LoginPage = () => {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Get the intended destination from navigation state
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };
  //Form Submission!
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await login(formData);
      // Redirect to intended destination or home page
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Login failed:', err);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={5} md={6}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="bi bi-person-circle display-4 text-primary mb-3"></i>
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to your ObservaCart account</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    isInvalid={!!formErrors.email}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      isInvalid={!!formErrors.password}
                      disabled={loading}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="position-absolute top-50 translate-middle-y"
                      style={{ right: '10px', border: 'none', background: 'none' }}
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </Button>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
              </Form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="text-muted mb-0">
                  Don't have an account?{' '}
                  <LinkContainer to="/register" state={{ from: location.state?.from }}>
                    <Button variant="link" className="p-0 text-decoration-none">
                      Create one here
                    </Button>
                  </LinkContainer>
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-3 border-info">
            <Card.Body className="text-center">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                <strong>Demo Credentials:</strong><br />
                Email: demo@observacart.com<br />
                Password: demo123
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
