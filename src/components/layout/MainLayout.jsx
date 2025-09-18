import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavigationBar from '../common/NavigationBar'
import HomePage from '../home/HomePage'

const MainLayout = ({ student, onLogout }) => {
  const location = useLocation()
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false)
  
  // Get current tab from URL path
  const getCurrentTab = () => {
    const path = location.pathname
    if (path.includes('/exams')) return 'exams'
    if (path.includes('/results')) return 'results'
    if (path.includes('/settings')) return 'settings'
    return 'overview'
  }

  const activeTab = getCurrentTab()

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed)
  }

  return (
    <div className="dashboard-container">
      {/* Left Navigation */}
      <NavigationBar 
        student={student} 
        onLogout={onLogout}
        activeTab={activeTab}
        isCollapsed={isNavbarCollapsed}
        onToggle={toggleNavbar}
      />
      
      {/* Main Content */}
      <div className={`dashboard-main ${isNavbarCollapsed ? 'navbar-collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/overview" element={<HomePage student={student} onLogout={onLogout} activeTab="overview" />} />
          <Route path="/exams" element={<HomePage student={student} onLogout={onLogout} activeTab="exams" />} />
          <Route path="/results" element={<HomePage student={student} onLogout={onLogout} activeTab="results" />} />
          <Route path="/settings" element={<HomePage student={student} onLogout={onLogout} activeTab="settings" />} />
        </Routes>
      </div>
    </div>
  )
}

export default MainLayout
