import { useEffect } from 'react'

const ExamDetailsModal = ({ exam, isOpen, onClose }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !exam) return null

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    if (seconds < 60) return `${seconds} seconds`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  }

  const formatPassingScore = (score) => {
    return score
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">{exam.exam_name}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Exam Info Grid */}
          <div className="exam-info-grid">
            <div className="exam-info-item">
              <span className="exam-info-label">Category</span>
              <span className="exam-info-value">{exam.category}</span>
            </div>
            <div className="exam-info-item">
              <span className="exam-info-label">Questions</span>
              <span className="exam-info-value">{exam.number_of_questions}</span>
            </div>
            <div className="exam-info-item">
              <span className="exam-info-label">Duration</span>
              <span className="exam-info-value">{formatDuration(exam.exam_timer)}</span>
            </div>
            <div className="exam-info-item">
              <span className="exam-info-label">Passing Score</span>
              <span className="exam-info-value">{formatPassingScore(exam.passing_score)}</span>
            </div>
            <div className="exam-info-item">
              <span className="exam-info-label">Max Score</span>
              <span className="exam-info-value">{exam.max_score}</span>
            </div>
            <div className="exam-info-item">
              <span className="exam-info-label">Status</span>
              <span className={`exam-info-value exam-status ${exam.is_active ? 'active' : 'inactive'}`}>
                {exam.is_active ? 'Available' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="exam-description-section">
            <h3 className="exam-description-title">Description</h3>
            <div className="exam-description-content">
              {exam.description ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: exam.description.replace(/\n/g, '<br>') 
                  }} 
                />
              ) : (
                <p className="exam-no-description">No description available for this exam.</p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="exam-additional-info">
            <div className="exam-info-item">
              <span className="exam-info-label">Created</span>
              <span className="exam-info-value">
                {exam.created_at ? new Date(exam.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="exam-info-item">
              <span className="exam-info-label">Last Updated</span>
              <span className="exam-info-value">
                {exam.updated_at ? new Date(exam.updated_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="modal-button modal-button-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            className="modal-button modal-button-primary"
            onClick={() => {
              onClose()
              // You can add start exam logic here
              console.log('Start exam:', exam.exam_name)
            }}
            disabled={!exam.is_active}
          >
            {exam.is_active ? 'Start Exam' : 'Exam Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExamDetailsModal
