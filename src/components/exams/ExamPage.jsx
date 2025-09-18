/**
 * Refactored Exam Page component
 * Follows SOLID, DRY, and KISS principles
 * - Single Responsibility: Only handles exam page layout and coordination
 * - Open/Closed: Extensible through props and composition
 * - Dependency Inversion: Depends on abstractions (hooks, services)
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useExam } from '../../hooks/useExam'
import { formatTime, isTimeRunningLow } from '../../utils/timeUtils'

// Components
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import ExamHeader from './ExamHeader'
import ExamProgress from './ExamProgress'
import QuestionCard from './QuestionCard'
import ExamNavigation from './ExamNavigation'

// Styles
import './ExamPage.css'

const ExamPage = () => {
  const navigate = useNavigate()
  const {
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
    formatTime: formatTimeFromHook,
    retry
  } = useExam()

  // Loading state
  if (loading) {
    return (
      <div className="exam-page">
        <LoadingSpinner 
          size="large" 
          message="Loading exam..." 
          className="exam-loading"
        />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="exam-page">
        <ErrorMessage
          title="Error Loading Exam"
          message={error}
          onRetry={retry}
          onBack={() => navigate('/dashboard/exams')}
          className="exam-error"
        />
      </div>
    )
  }

  // No exam data
  if (!examData || questions.length === 0) {
    return (
      <div className="exam-page">
        <ErrorMessage
          title="No Exam Data"
          message="Unable to load exam information."
          onBack={() => navigate('/dashboard/exams')}
          className="exam-error"
        />
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  // No current question
  if (!currentQuestion) {
    return (
      <div className="exam-page">
        <ErrorMessage
          title="Question Not Found"
          message="Unable to load the current question."
          onBack={() => navigate('/dashboard/exams')}
          className="exam-error"
        />
      </div>
    )
  }

  // Format time and check if running low
  const formattedTime = formatTime(timeRemaining)
  const timeLow = isTimeRunningLow(timeRemaining)
  const selectedAnswer = selectedAnswers[currentQuestion.id]
  const hasSelectedAnswer = Boolean(selectedAnswer)
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  // Handle submit with error handling
  const handleSubmit = async () => {
    try {
      await handleSubmitAnswer()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="exam-page">
      <div className="exam-container">
        {/* Exam Header */}
        <ExamHeader
          examName={examData.exam_name}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          timeRemaining={formattedTime}
          isTimeLow={timeLow}
        />

        {/* Progress Bar */}
        <ExamProgress
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
        />

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation */}
        <ExamNavigation
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          hasSelectedAnswer={hasSelectedAnswer}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  )
}

export default ExamPage