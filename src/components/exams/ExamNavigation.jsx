/**
 * Exam navigation component
 * Follows Single Responsibility Principle - only handles exam navigation
 */
import React from 'react'
import Button from '../common/Button'
import './ExamNavigation.css'

const ExamNavigation = ({ 
  onSubmit, 
  isSubmitting, 
  hasSelectedAnswer,
  isLastQuestion 
}) => {
  const buttonText = isLastQuestion ? 'Submit & Finish' : 'Submit Answer'

  return (
    <div className="exam-navigation">
      <div className="exam-navigation-center">
        <Button
          onClick={onSubmit}
          disabled={!hasSelectedAnswer || isSubmitting}
          loading={isSubmitting}
          variant="primary"
          size="large"
          className="exam-submit-btn"
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </Button>
      </div>
    </div>
  )
}

export default ExamNavigation
