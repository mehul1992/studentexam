/**
 * Refactored App component
 * Follows SOLID, DRY, and KISS principles
 * - Single Responsibility: Only handles routing and global state
 * - Open/Closed: Extensible through route configuration
 * - Dependency Inversion: Uses context for state management
 */
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Context
import { AuthProvider, useAuthContext } from './context/AuthContext'

// Components
import LoadingSpinner from './components/common/LoadingSpinner'
import MainLayout from './components/layout/MainLayout'
import HomePage from './components/home/HomePage'
import LoginPage from './components/auth/LoginPage'
import ExamPage from './components/exams/ExamPage'

// Styles
import './App.css'
import './styles/dashboard.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, student, isLoading } = useAuthContext()
  
  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" message="Loading..." />
      </div>
    )
  }
  
  if (!isAuthenticated || !student) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={<LoginPage />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard/exam" 
              element={
                <ProtectedRoute>
                  <ExamPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Route */}
            <Route 
              path="/" 
              element={<DefaultRoute />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

// Default Route Component
const DefaultRoute = () => {
  const { isAuthenticated, student, isLoading, isExamActive } = useAuthContext()
  
  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" message="Loading..." />
      </div>
    )
  }
  
  if (!isAuthenticated || !student) {
    return <Navigate to="/login" replace />
  }
  
  // Redirect based on exam status
  if (isExamActive()) {
    return <Navigate to="/dashboard/exam" replace />
  }
  
  return <Navigate to="/dashboard/overview" replace />
}

export default App