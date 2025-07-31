import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const RegisterPage = () => {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(null);

  // Get the intended destination from navigation state
  const from = location.state?.from?.pathname || '/login';

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
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Remove confirmPassword from data sent to API
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      
      setSuccess('Account created successfully! Please sign in with your new credentials.');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login', { state: { from: location.state?.from } });
      }, 2000);
      
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Registration failed:', err);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={6} md={7}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="bi bi-person-plus display-4 text-primary mb-3"></i>
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted">Join ObservaCart and start shopping today</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success">
                  <i className="bi bi-check-circle me-2"></i>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        isInvalid={!!formErrors.name}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

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

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
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
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          isInvalid={!!formErrors.confirmPassword}
                          disabled={loading}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="position-absolute top-50 translate-middle-y"
                          style={{ right: '10px', border: 'none', background: 'none' }}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          type="button"
                        >
                          <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mb-3">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Password must contain at least 6 characters with uppercase, lowercase, and numbers.
                  </small>
                </div>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating Account...
                      </>
                    ) : success ? (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Account Created!
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </Form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="text-muted mb-0">
                  Already have an account?{' '}
                  <LinkContainer to="/login" state={{ from: location.state?.from }}>
                    <Button variant="link" className="p-0 text-decoration-none">
                      Sign in here
                    </Button>
                  </LinkContainer>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
