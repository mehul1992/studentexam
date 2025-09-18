/**
 * Authentication context for global auth state management
 * Follows Single Responsibility Principle - only handles auth state
 * Follows Dependency Inversion Principle - provides abstraction for auth state
 */
import React, { createContext, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'

const AuthContext = createContext(null)

/**
 * AuthProvider component
 * Provides authentication context to child components
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuth()
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use auth context
 * @returns {object} Auth context value
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  
  return context
}

export default AuthContext
