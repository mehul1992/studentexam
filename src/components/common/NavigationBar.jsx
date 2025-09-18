import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../../api/auth'

const NavigationBar = ({ student, onLogout, activeTab, isCollapsed, onToggle }) => {
  const navigate = useNavigate()
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊', path: '/dashboard/overview' },
    { id: 'exams', label: 'Exams', icon: '📝', path: '/dashboard/exams' },
    { id: 'results', label: 'Results', icon: '📈', path: '/dashboard/results' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
  ]

  const bottomItems = [
    { id: 'help', label: 'Help', icon: '❓' },
    { id: 'contact', label: 'Contact Us', icon: '📧' },
  ]

  return (
    <div className={`navbar ${isCollapsed ? 'navbar-collapsed' : ''}`}>
      {/* Toggle Button */}
      <button 
        className="navbar-toggle"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Logo */}
      <div className="navbar-logo">
        <div className="navbar-logo-icon">
          E
        </div>
        {!isCollapsed && <h3 className="navbar-logo-text">EUDI Platform</h3>}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="navbar-user-info">
          <div className="navbar-user-header">
            <div className="navbar-user-avatar">
              {student?.first_name?.[0]}{student?.last_name?.[0]}
            </div>
            <div>
              <div className="navbar-user-name">
                {student?.first_name} {student?.last_name}
              </div>
              <div className="navbar-user-role">
                Student
              </div>
            </div>
          </div>
          <div className="navbar-user-email">
            {student?.email_address}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="navbar-main">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`navbar-item ${activeTab === item.id ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="navbar-item-icon">{item.icon}</span>
            {!isCollapsed && <span className="navbar-item-text">{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="navbar-bottom">
        {bottomItems.map((item) => (
          <div
            key={item.id}
            className="navbar-item"
            title={isCollapsed ? item.label : ''}
          >
            <span className="navbar-item-icon">{item.icon}</span>
            {!isCollapsed && <span className="navbar-item-text">{item.label}</span>}
          </div>
        ))}
        
        <div
          onClick={() => {
            onLogout()
            navigate('/login')
          }}
          className="navbar-item navbar-logout"
          title={isCollapsed ? 'Logout' : ''}
        >
          <span className="navbar-item-icon">🚪</span>
          {!isCollapsed && <span className="navbar-item-text">Logout</span>}
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
