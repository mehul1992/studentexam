/**
 * Reusable error message component
 * Follows Single Responsibility Principle - only handles error display
 */
import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = ({ 
  title = 'Error', 
  message, 
  onRetry, 
  onBack,
  className = '' 
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">{title}</h2>
      {message && <p className="error-text">{message}</p>}
      
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="error-btn error-btn--primary">
            Try Again
          </button>
        )}
        {onBack && (
          <button onClick={onBack} className="error-btn error-btn--secondary">
            Go Back
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
