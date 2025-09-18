import Dashboard from './Dashboard'
import ExamsList from '../exams/ExamsList'

const HomePage = ({ student, onLogout, activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard student={student} onLogout={onLogout} />
      case 'exams':
        return <ExamsList student={student} onLogout={onLogout} />
      case 'results':
        return (
          <div>
            <div className="dashboard-header">
              <h1 className="dashboard-title">Results</h1>
              <p className="dashboard-subtitle">View your exam results and performance</p>
            </div>
            <div className="activity-section">
              <h3 className="activity-title">Exam Results</h3>
              <div className="activity-content">
                <p>No exam results available yet. Complete some exams to see your results here!</p>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div>
            <div className="dashboard-header">
              <h1 className="dashboard-title">Settings</h1>
              <p className="dashboard-subtitle">Manage your account settings and preferences</p>
            </div>
            <div className="activity-section">
              <h3 className="activity-title">Account Settings</h3>
              <div className="activity-content">
                <p>Settings panel coming soon!</p>
              </div>
            </div>
          </div>
        )
      default:
        return <Dashboard student={student} onLogout={onLogout} />
    }
  }

  return renderContent()
}

export default HomePage
