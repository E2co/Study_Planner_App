"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import ExamDashboard from "./components/ExamDash"
import AddExamForm from "./components/AddExamForm"
import StudySchedule from "./components/StudySchedule"

function App() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch exams from Backend on mount
  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/exams')
      const data = await response.json()
      setExams(data)
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData)
      })
      
      if (response.ok) {
        await fetchExams() // Refresh list
        setCurrentView("dashboard")
      }
    } catch (err) {
      console.error("Error adding exam:", err)
    }
  }

  const deleteExam = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exams/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setExams(exams.filter((exam) => exam._id !== id))
      }
    } catch (err) {
      console.error("Error deleting exam:", err)
    }
  }

  return (
    <div className="app">
      <Header currentView={currentView} onNavigate={setCurrentView} />

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
        <StudySchedule /> 
      )}
    </div>
  )
}

export default App