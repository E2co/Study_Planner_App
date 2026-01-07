"use client"

import "../styles/Header.css"

function Header({ currentView, onNavigate }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1 className="logo-text">LockIn</h1>
          </div>
        </div>

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
      </div>
    </header>
  )
}

export default Header