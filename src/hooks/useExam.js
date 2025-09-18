/**
 * Custom hook for exam-related logic
 * Follows Single Responsibility Principle - only handles exam state and operations
 */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI, examsAPI } from '../services/apiService'

export const useExam = () => {
  const navigate = useNavigate()
  const [examData, setExamData] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load exam data
  const loadExamData = useCallback(async () => {
    try {
      const storedExamData = authAPI.getExamData()
      
      if (!storedExamData || !authAPI.isExamActive()) {
        navigate('/dashboard/exams')
        return
      }

      setExamData(storedExamData)
      
      // Calculate time remaining
      const now = new Date().getTime()
      const startTime = new Date(storedExamData.start_time).getTime()
      const elapsed = Math.floor((now - startTime) / 1000)
      const remaining = Math.max(0, storedExamData.exam_timer - elapsed)
      setTimeRemaining(remaining)

      // Load questions
      await loadQuestions(storedExamData.exam_id)
    } catch (err) {
      setError('Failed to load exam data')
      console.error('Error loading exam:', err)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  // Load questions for exam
  const loadQuestions = useCallback(async (examId) => {
    try {
      const response = await examsAPI.getQuestions(examId)
      setQuestions(response?.results || [])
    } catch (err) {
      setError('Failed to load questions')
      console.error('Error loading questions:', err)
    }
  }, [])

  // Handle answer selection
  const handleAnswerSelect = useCallback((questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
  }, [])

  // Submit answer
  const handleSubmitAnswer = useCallback(async () => {
    if (!examData || !questions[currentQuestionIndex]) return

    const currentQuestion = questions[currentQuestionIndex]
    const selectedAnswerId = selectedAnswers[currentQuestion.id]

    if (!selectedAnswerId) {
      throw new Error('Please select an answer before submitting')
    }

    try {
      setIsSubmitting(true)
      
      // Submit the answer
      await examsAPI.submitAnswer(
        examData.student_exam_id,
        currentQuestion.exam_question_id,
        selectedAnswerId
      )

      // If it's the last question, complete the exam
      if (currentQuestionIndex === questions.length - 1) {
        await examsAPI.completeExam(examData.student_exam_id)
        handleExamComplete()
      } else {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1)
      }
    } catch (err) {
      throw new Error(`Failed to submit answer: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }, [examData, questions, currentQuestionIndex, selectedAnswers])

  // Complete exam
  const handleExamComplete = useCallback(() => {
    authAPI.clearExamData()
    navigate('/dashboard/exams')
  }, [navigate])

  // Format time helper
  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Initialize exam data on mount
  useEffect(() => {
    loadExamData()
  }, [loadExamData])

  // Timer effect
  useEffect(() => {
    if (examData && examData.exam_timer) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleExamComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [examData, handleExamComplete])

  return {
    examData,
    questions,
    currentQuestionIndex,
    selectedAnswers,
    loading,
    error,
    timeRemaining,
    isSubmitting,
    handleAnswerSelect,
    handleSubmitAnswer,
    formatTime,
    retry: loadExamData
  }
}
