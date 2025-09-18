/**
 * Custom hook for authentication logic
 * Follows Single Responsibility Principle - only handles auth state and operations
 */
import { useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/authService'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [student, setStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const isAuth = authAPI.isAuthenticated()
      
      if (isAuth) {
        const studentData = authAPI.getStudent()
        if (studentData) {
          setIsAuthenticated(true)
          setStudent(studentData)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      authAPI.clearAuthData()
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      
      authAPI.setAuthData(
        response.access,
        response.refresh,
        response.student
      )
      
      setIsAuthenticated(true)
      setStudent(response.student)
      
      return { success: true, student: response.student }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [])

  // Logout function
  const logout = useCallback(() => {
    authAPI.clearAuthData()
    setIsAuthenticated(false)
    setStudent(null)
  }, [])

  // Check if exam is active
  const isExamActive = useCallback(() => {
    return authAPI.isExamActive()
  }, [])

  // Initialize auth check on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    isAuthenticated,
    student,
    isLoading,
    login,
    logout,
    isExamActive,
    checkAuth
  }
}
