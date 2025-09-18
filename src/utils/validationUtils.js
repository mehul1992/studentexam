/**
 * Validation utility functions
 * Follows Single Responsibility Principle - only handles validation logic
 * Follows DRY principle - reusable validation functions
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' }
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate required fields
 * @param {object} data - Data object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {object} Validation result with isValid and message
 */
export const validateRequiredFields = (data, requiredFields) => {
  if (!data || typeof data !== 'object') {
    return { isValid: false, message: 'Data is required' }
  }
  
  const missingFields = requiredFields.filter(field => {
    const value = data[field]
    return value === undefined || value === null || (typeof value === 'string' && !value.trim())
  })
  
  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Sanitize string input
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input.trim()
}

/**
 * Validate UUID format
 * @param {string} uuid - UUID string to validate
 * @returns {boolean} True if UUID is valid
 */
export const isValidUUID = (uuid) => {
  if (!uuid || typeof uuid !== 'string') {
    return false
  }
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}
