import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }}>
      <div className="loading-modern" style={{ 
        width: '40px', 
        height: '40px',
        borderWidth: '3px'
      }}></div>
      <div style={{ 
        color: 'var(--text-accent-light)',
        fontSize: 'var(--text-base)',
        fontWeight: '500'
      }}>
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;
