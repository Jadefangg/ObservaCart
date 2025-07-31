import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Alert 
      variant="danger" 
      dismissible={!!onClose} 
      onClose={onClose}
      className="mb-3"
    >
      <Alert.Heading>
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error
      </Alert.Heading>
      {typeof error === 'string' ? error : error.message || 'An unexpected error occurred'}
    </Alert>
  );
};

export default ErrorMessage;
