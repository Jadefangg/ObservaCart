import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <Row>
        <Col className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <div className="text-muted">{message}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSpinner;
