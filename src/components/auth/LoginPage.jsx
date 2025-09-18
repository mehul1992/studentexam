import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../api/auth'
import LoginForm from './LoginForm'

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    try {
      setIsSubmitting(true)
      
      const response = await authAPI.login(email, password)

      // Store tokens and student data
      authAPI.setAuthData(response.access, response.refresh, response.student)
      
      // Call the parent's login success handler
      onLoginSuccess(response.student)
      
      // Navigate to dashboard
      navigate('/dashboard/overview')
      
    } catch (e) {
      setError(e.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <LoginForm 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
    />
  )
}

export default LoginPage
