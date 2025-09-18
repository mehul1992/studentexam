/**
 * Exam progress bar component
 * Follows Single Responsibility Principle - only handles progress display
 */
import React from 'react'
import './ExamProgress.css'

const ExamProgress = ({ currentQuestion, totalQuestions }) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100
  
  return (
    <div className="exam-progress">
      <div className="exam-progress-bar">
        <div 
          className="exam-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="exam-progress-text">
        {currentQuestion + 1} / {totalQuestions} questions completed
      </div>
    </div>
  )
}

export default ExamProgress
