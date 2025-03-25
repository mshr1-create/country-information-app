import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div className="error-message">
      {error}
    </div>
  );
}

export default ErrorMessage;
