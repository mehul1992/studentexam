/**
 * Reusable button component
 * Follows Open/Closed Principle - extensible through props
 */
import React from 'react'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick, 
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'btn'
  const variantClass = `btn--${variant}`
  const sizeClass = `btn--${size}`
  const disabledClass = disabled || loading ? 'btn--disabled' : ''
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      <span className={loading ? 'btn-content--loading' : 'btn-content'}>
        {children}
      </span>
    </button>
  )
}

export default Button
