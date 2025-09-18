const ExamCard = ({ exam, onStartExam, onViewDetails }) => {
  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const getStatusColor = (isActive) => {
    return isActive ? '#10b981' : '#6b7280'
  }

  const getStatusText = (isActive) => {
    return isActive ? 'Available' : 'Inactive'
  }

  return (
    <div className="exam-card">
      <div className="exam-card-header">
        <div className="exam-card-title-section">
          <h3 className="exam-card-title">{exam.exam_name}</h3>
          <div className="exam-card-category">{exam.category}</div>
        </div>
        <div className="exam-card-status">
          <span 
            className="exam-card-status-badge"
            style={{ backgroundColor: getStatusColor(exam.is_active) }}
          >
            {getStatusText(exam.is_active)}
          </span>
        </div>
      </div>

      <div className="exam-card-content">
        <p className="exam-card-description">{exam.description}</p>
        
        <div className="exam-card-stats">
          <div className="exam-card-stat">
            <span className="exam-card-stat-label">Questions:</span>
            <span className="exam-card-stat-value">{exam.number_of_questions}</span>
          </div>
          <div className="exam-card-stat">
            <span className="exam-card-stat-label">Duration:</span>
            <span className="exam-card-stat-value">{formatDuration(exam.exam_timer)}</span>
          </div>
          <div className="exam-card-stat">
            <span className="exam-card-stat-label">Passing Score:</span>
            <span className="exam-card-stat-value">{exam.passing_score}%</span>
          </div>
          <div className="exam-card-stat">
            <span className="exam-card-stat-label">Max Score:</span>
            <span className="exam-card-stat-value">{exam.max_score}</span>
          </div>
        </div>
      </div>

      <div className="exam-card-actions">
        <button 
          className="exam-card-button exam-card-button-secondary"
          onClick={() => onViewDetails(exam)}
        >
          View Details
        </button>
        <button 
          className="exam-card-button exam-card-button-primary"
          onClick={() => onStartExam(exam)}
          disabled={!exam.is_active}
        >
          {exam.is_active ? 'Start Exam' : 'Unavailable'}
        </button>
      </div>
    </div>
  )
}

export default ExamCard
