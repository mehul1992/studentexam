/**
 * Question card component
 * Follows Single Responsibility Principle - only handles question display
 */
import React from 'react'
import './QuestionCard.css'

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }) => {
  const hasAnswers = question?.answers && question.answers.length > 0

  return (
    <div className="question-card">
      <h2 className="question-title">
        {question?.question_name || 'Question not available'}
      </h2>
      
      {hasAnswers ? (
        <div className="question-answers">
          {question.answers.map((answer) => (
            <label 
              key={answer.id} 
              className={`answer-option ${
                selectedAnswer === answer.id ? 'answer-option--selected' : ''
              }`}
            >
              <input
                type="radio"
                name={`question_${question.id}`}
                value={answer.id}
                checked={selectedAnswer === answer.id}
                onChange={() => onAnswerSelect(question.id, answer.id)}
                className="answer-input"
              />
              <span className="answer-text">{answer.answer}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="question-no-answers">
          <p>No answers available for this question.</p>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
