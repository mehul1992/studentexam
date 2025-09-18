import NavigationBar from '../common/NavigationBar'
import StatsBox from '../common/StatsBox'

const Dashboard = ({ student, onLogout }) => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Exams',
      value: '12',
      icon: '📝',
      color: 'blue',
      subtitle: 'Available to take'
    },
    {
      title: 'Completed',
      value: '8',
      icon: '✅',
      color: 'green',
      subtitle: 'Exams finished'
    },
    {
      title: 'In Progress',
      value: '2',
      icon: '⏳',
      color: 'yellow',
      subtitle: 'Currently taking'
    },
    {
      title: 'Average Score',
      value: '87%',
      icon: '📊',
      color: 'purple',
      subtitle: 'Last 5 exams'
    }
  ]

  return (
    <div className="dashboard-container">
      {/* Left Navigation */}
      <NavigationBar student={student} onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Welcome back, {student.first_name}! Here's your exam overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatsBox
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              subtitle={stat.subtitle}
            />
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="activity-section">
          <h3 className="activity-title">
            Recent Activity
          </h3>
          <div className="activity-content">
            <p>No recent exam activity. Start taking an exam to see your progress here!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
