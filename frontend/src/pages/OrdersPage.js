import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const OrdersPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getUserOrders();
      setOrders(response.data || response || []);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return `$${parseFloat(price || 0).toFixed(2)}`;
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6} className="text-center">
            <i className="bi bi-lock display-1 text-muted mb-4"></i>
            <h2 className="mb-3">Access Restricted</h2>
            <p className="text-muted mb-4">
              Please log in to view your order history.
            </p>
            <LinkContainer to="/login">
              <Button variant="primary" size="lg">
                Sign In
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading your orders..." />;
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold mb-3">My Orders</h1>
          <p className="lead text-muted">
            Track your order history and current status
          </p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={loadOrders} disabled={loading}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <Alert.Heading>Error Loading Orders</Alert.Heading>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {orders.length === 0 && !loading ? (
        <Row>
          <Col className="text-center py-5">
            <i className="bi bi-bag-x display-1 text-muted mb-4"></i>
            <h3 className="text-muted mb-3">No Orders Found</h3>
            <p className="text-muted mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <LinkContainer to="/products">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    Order History ({orders.length} order{orders.length !== 1 ? 's' : ''})
                  </h5>
                  <small className="text-muted">
                    Showing orders for {user?.name || user?.email}
                  </small>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <code className="text-primary">
                              #{order.id || 'N/A'}
                            </code>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(order.created_at || order.date)}
                            </small>
                          </td>
                          <td>
                            <div>
                              {order.items && order.items.length > 0 ? (
                                <>
                                  <div className="fw-semibold">
                                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                  </div>
                                  <small className="text-muted">
                                    {order.items.slice(0, 2).map((item, index) => (
                                      <span key={index}>
                                        {item.product_name || item.name || 'Product'}
                                        {index < Math.min(order.items.length, 2) - 1 && ', '}
                                      </span>
                                    ))}
                                    {order.items.length > 2 && ` +${order.items.length - 2} more`}
                                  </small>
                                </>
                              ) : (
                                <span className="text-muted">No items</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="fw-semibold">
                              {formatPrice(order.total || order.total_amount)}
                            </span>
                          </td>
                          <td>
                            <Badge bg={getStatusBadgeVariant(order.status)} className="text-capitalize">
                              {order.status || 'pending'}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  // Future: Navigate to order details page
                                  alert(`Order details for #${order.id} - Feature coming soon!`);
                                }}
                              >
                                <i className="bi bi-eye me-1"></i>
                                View
                              </Button>
                              {(order.status === 'pending' || order.status === 'processing') && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => {
                                    // Future: Cancel order functionality
                                    if (window.confirm('Are you sure you want to cancel this order?')) {
                                      alert('Cancel order feature coming soon!');
                                    }
                                  }}
                                >
                                  <i className="bi bi-x-circle me-1"></i>
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="text-center py-4">
              <h5 className="mb-3">Need Help?</h5>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button variant="outline-secondary" size="sm">
                  <i className="bi bi-question-circle me-2"></i>
                  Order Support
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <i className="bi bi-arrow-return-left me-2"></i>
                  Return Policy
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <i className="bi bi-truck me-2"></i>
                  Track Shipping
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersPage;
