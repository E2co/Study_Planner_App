import "../styles/Homepage.css"

export default function Homepage({ onNavigate }) {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1 className="hero-title">LockIn <span className="icon">📚</span></h1>
        <p className="hero-subtitle">
          Master your study schedule with intelligent planning.
        </p>
        
        <div className="hero-buttons">
          <button 
            className="btn-primary" 
            onClick={() => onNavigate("register")}
          >
            Get Started
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => onNavigate("login")}
          >
            I have an account
          </button>
        </div>
      </div>
    </div>
  )
}
