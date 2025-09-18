// API base URL - update this to match your backend
const API_BASE_URL = 'http://127.0.0.1:8000'

// Helper function to make authenticated API calls
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token')
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(errorData.detail || 'Request failed')
  }

  return response.json()
}

// Authentication API calls
export const authAPI = {
  // Login student
  login: async (email, password) => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token')
    const studentData = localStorage.getItem('student_data')
    
    if (!token || !studentData) {
      return false
    }
    
    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      if (payload.exp && payload.exp < currentTime) {
        console.log('Token has expired')
        // Clear expired tokens
        authAPI.clearAuthData()
        return false
      }
      
      return true
    } catch (error) {
      console.error('Error validating token:', error)
      // Clear invalid tokens
      authAPI.clearAuthData()
      return false
    }
  },

  // Get stored student data
  getStudent: () => {
    const studentData = localStorage.getItem('student_data')
    return studentData ? JSON.parse(studentData) : null
  },

  // Store authentication data
  setAuthData: (accessToken, refreshToken, student) => {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('student_data', JSON.stringify(student))
  },

  // Clear authentication data
  clearAuthData: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('student_data')
  },

  // Exam state management
  setExamData: (examData) => {
    localStorage.setItem('active_exam', JSON.stringify(examData))
  },

  getExamData: () => {
    const examData = localStorage.getItem('active_exam')
    return examData ? JSON.parse(examData) : null
  },

  clearExamData: () => {
    localStorage.removeItem('active_exam')
  },

  isExamActive: () => {
    const examData = authAPI.getExamData()
    if (!examData) return false
    
    const now = new Date().getTime()
    const endTime = new Date(examData.end_time).getTime()
    
    return examData.status === 'in_progress' && now < endTime
  }
}

// Exams API calls
export const examsAPI = {
  // Get all exams
  getExams: async () => {
    return apiCall('/api/exams')
  },

  // Get questions for a specific exam
  getQuestions: async (examId) => {
    return apiCall(`/api/questions?exam_id=${examId}`)
  },

  // Start an exam
  startExam: async (examId) => {
    return apiCall('/api/start-exam', {
      method: 'POST',
      body: JSON.stringify({ exam_id: examId }),
    })
  },

  // Submit an answer
  submitAnswer: async (studentExamId, examQuestionId, answerId) => {
    return apiCall('/api/submit-answer', {
      method: 'POST',
      body: JSON.stringify({
        student_exam_id: studentExamId,
        exam_question_id: examQuestionId,
        answer_id: answerId,
      }),
    })
  },

  // Complete an exam
  completeExam: async (studentExamId) => {
    return apiCall('/api/complete-exam', {
      method: 'POST',
      body: JSON.stringify({
        student_exam_id: studentExamId,
      }),
    })
  },

  // Get questions for a specific exam
  getQuestions: async (examId) => {
    return apiCall(`/api/questions?exam_id=${examId}`)
  },
}
