"use client"

import "../styles/Header.css"

function Header({ currentView, onNavigate, onAddExam, onLogout }) {
  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("lockin_current_user")
    // Navigate to login
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1 className="logo-text">LockIn</h1>
          </div>
        </div>

        <div className="header-right">
          <nav className="nav">
            <button
              className={`nav-button ${currentView === "dashboard" ? "active" : ""}`}
              onClick={() => onNavigate("dashboard")}
            >
              📅 Exams
            </button>
            <button
              className={`nav-button ${currentView === "schedule" ? "active" : ""}`}
              onClick={() => onNavigate("schedule")}
            >
              📖 Schedule
            </button>
          </nav>
          
          {onAddExam && (
            <button className="add-exam-button" onClick={onAddExam}>
              + Add Exam
            </button>
          )}
          
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header