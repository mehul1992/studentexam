import { useState, useEffect } from 'react'
import { examsAPI, authAPI } from '../../api/auth'
import ExamDetailsModal from './ExamDetailsModal'

const ExamsList = ({ student, onLogout }) => {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, active, inactive
  const [selectedExam, setSelectedExam] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await examsAPI.getExams()
      // Handle API response structure: {results: [...]}
      setExams(response?.results || response || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch exams')
    } finally {
      setLoading(false)
    }
  }

  const handleStartExam = async (exam) => {
    try {
      const response = await examsAPI.startExam(exam.id)
      console.log('Exam started:', response)
      
      // Calculate end time
      const startTime = new Date(response.start_time)
      const endTime = new Date(startTime.getTime() + (exam.exam_timer * 1000))
      
      // Store exam data in localStorage
      const examData = {
        student_exam_id: response.student_exam_id,
        exam_id: response.exam_id,
        exam_name: response.exam_name,
        start_time: response.start_time,
        end_time: endTime.toISOString(),
        status: response.status,
        max_exam_score: response.max_exam_score,
        exam_timer: response.exam_timer
      }
      
      authAPI.setExamData(examData)
      
      // Navigate to exam page
      window.location.href = '/dashboard/exam'
    } catch (err) {
      alert(`Failed to start exam: ${err.message}`)
    }
  }

  const handleViewDetails = (exam) => {
    setSelectedExam(exam)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedExam(null)
  }

  const filteredExams = exams.filter(exam => {
    if (filter === 'active') return exam.is_active
    if (filter === 'inactive') return !exam.is_active
    return true
  })

  if (loading) {
    return (
      <div>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Available Exams</h1>
          <p className="dashboard-subtitle">Loading exams...</p>
        </div>
        <div className="exams-loading">
          <div className="loading-spinner"></div>
          <p>Fetching exams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Available Exams</h1>
          <p className="dashboard-subtitle">Error loading exams</p>
        </div>
        <div className="exams-error">
          <p>{error}</p>
          <button 
            className="exam-card-button exam-card-button-primary"
            onClick={fetchExams}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Available Exams</h1>
        <p className="dashboard-subtitle">
          Choose an exam to start your assessment
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="exams-filters">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Exams ({exams.length})
        </button>
        <button 
          className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Available ({exams.filter(e => e.is_active).length})
        </button>
      </div>

      {/* Exams Table */}
      {filteredExams.length === 0 ? (
        <div className="exams-empty">
          <div className="exams-empty-icon">📝</div>
          <h3>No exams found</h3>
          <p>
            {filter === 'active' 
              ? 'No available exams at the moment.' 
              : 'No exams match your current filter.'}
          </p>
        </div>
      ) : (
        <div className="exams-table-container">
          <table className="exams-table">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Duration</th>
                <th>Passing Score</th>
                <th>Max Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => (
                <tr key={exam.id}>
                  <td>
                    <div className="exam-name-cell">
                      <div className="exam-name">{exam.exam_name}</div>
                      <div className="exam-description">{exam.description}</div>
                    </div>
                  </td>
                  <td>
                    <span className="exam-category">{exam.category}</span>
                  </td>
                  <td>
                    <span className="exam-questions">{exam.number_of_questions}</span>
                  </td>
                  <td>
                    <span className="exam-duration">
                      {exam.exam_timer ? (
                        exam.exam_timer < 60 
                          ? `${exam.exam_timer}s` 
                          : exam.exam_timer < 3600
                          ? `${Math.floor(exam.exam_timer / 60)}m ${exam.exam_timer % 60}s`
                          : `${Math.floor(exam.exam_timer / 3600)}h ${Math.floor((exam.exam_timer % 3600) / 60)}m`
                      ) : 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="exam-passing-score">
                      {exam.passing_score > 100 ? `${exam.passing_score} pts` : `${exam.passing_score}%`}
                    </span>
                  </td>
                  <td>
                    <span className="exam-max-score">{exam.max_score}</span>
                  </td>
                  <td>
                    <span 
                      className={`exam-status ${exam.is_active ? 'active' : 'inactive'}`}
                    >
                      {exam.is_active ? 'Available' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="exam-actions">
                      <button 
                        className="exam-action-btn exam-action-btn-secondary"
                        onClick={() => handleViewDetails(exam)}
                      >
                        View Details
                      </button>
                      <button 
                        className="exam-action-btn exam-action-btn-primary"
                        onClick={() => handleStartExam(exam)}
                        disabled={!exam.is_active}
                      >
                        {exam.is_active ? 'Start Exam' : 'Unavailable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Exam Details Modal */}
      <ExamDetailsModal
        exam={selectedExam}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ExamsList
