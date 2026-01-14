"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import ExamDashboard from "./components/ExamDash"
import AddExamForm from "./components/AddExamForm"
import StudySchedule from "./components/StudySchedule"
import Login from "./components/Login"
import Register from "./components/Register"
import Homepage from "./components/Homepage"

function App() {
  // 1. Initialize view to 'home'
  const [currentView, setCurrentView] = useState("home")
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(false)
  
  // 2. State to hold the authenticated user & token
  const [user, setUser] = useState(null)

  // Check for existing token on load (Keep user logged in on refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem('lockin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentView('dashboard'); // Auto-redirect to dashboard if logged in
    }
  }, []);

  // Fetch exams ONLY if user is logged in
  useEffect(() => {
    if (user && user.token) {
      fetchExams()
    }
  }, [user]) // Re-run if user changes

  // Helper to get Headers with Token
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}` //
  });

  const handleLoginSuccess = (view, userData) => {
    setUser(userData);
    localStorage.setItem('lockin_user', JSON.stringify(userData));
    setCurrentView(view);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lockin_user');
    setCurrentView("home");
  };

  const fetchExams = async () => {
    try {
      setLoading(true)
      // Now sending the token in the header!
      const response = await fetch('http://localhost:8080/api/exams', {
        headers: getAuthHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        setExams(data)
      }
    } catch (err) {
      console.error("Failed to fetch exams:", err)
    } finally {
      setLoading(false)
    }
  }

  const addExam = async (examData) => {
    try {
      const response = await fetch('http://localhost:8080/api/exams', {
        method: 'POST',
        headers: getAuthHeaders(), // Secure call
        body: JSON.stringify(examData)
      })
      
      if (response.ok) {
        await fetchExams()
        setCurrentView("dashboard")
      }
    } catch (err) {
      console.error("Error adding exam:", err)
    }
  }

  const deleteExam = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exams/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders() // Secure call
      })
      if (response.ok) {
        setExams(exams.filter((exam) => exam._id !== id))
      }
    } catch (err) {
      console.error("Error deleting exam:", err)
    }
  }

  // --- RENDER LOGIC ---

  // 1. If no user, show Auth Flows
  if (!user) {
    if (currentView === "register") return <Register onNavigate={handleLoginSuccess} />
    if (currentView === "login") return <Login onNavigate={handleLoginSuccess} />
    return <Homepage onNavigate={setCurrentView} />
  }

  // 2. If user exists, show App
  return (
    <div className="app">
      {/* Pass logout handler to Header if you want to add a Logout button there */}
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView}
        onAddExam={() => setCurrentView("add")}
        onLogout={handleLogout} 
      />

      {loading && <div className="loading-overlay">Updating...</div>}

      {currentView === "dashboard" && (
        <ExamDashboard 
          exams={exams} 
          onDeleteExam={deleteExam} 
          onAddClick={() => setCurrentView("add")}
        />
      )}

      {currentView === "add" && (
        <AddExamForm 
          onSubmit={addExam} 
          onCancel={() => setCurrentView("dashboard")} 
        />
      )}

      {currentView === "schedule" && (
        <StudySchedule user={user} /> // Pass user to schedule for its own fetches
      )}
    </div>
  )
}

export default App