/**
 * Exam header component
 * Follows Single Responsibility Principle - only handles exam header display
 */
import React from 'react'
import './ExamHeader.css'

const ExamHeader = ({ examName, currentQuestion, totalQuestions, timeRemaining, isTimeLow }) => {
  return (
    <div className="exam-header">
      <div className="exam-title">
        <h1 className="exam-name">{examName}</h1>
        <p className="exam-progress-text">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </div>
      <div className="exam-timer">
        <div className={`timer ${isTimeLow ? 'timer--warning' : ''}`}>
          {timeRemaining}
        </div>
      </div>
    </div>
  )
}

export default ExamHeader
