/**
 * Reusable loading spinner component
 * Follows Single Responsibility Principle - only handles loading display
 */
import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`loading-spinner-container ${className}`}>
      <div className={`loading-spinner loading-spinner--${size}`}></div>
      {message && <p className="loading-spinner-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
