"use client"

import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import ExamDashboard from "./components/ExamDash"
import AddExamForm from "./components/AddExamForm"
import StudySchedule from "./components/StudySchedule"

function App() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [exams, setExams] = useState([])

  const addExam = (examData) => {
    const newExam = {
      ...examData,
      id: Date.now(),
    }
    setExams([...exams, newExam])
    setCurrentView("dashboard")
  }

  const deleteExam = (id) => {
    setExams(exams.filter((exam) => exam.id !== id))
  }

  return (
    <div className="app">
      <Header currentView={currentView} onNavigate={setCurrentView} />

      {currentView === "dashboard" && (
        <ExamDashboard exams={exams} onDeleteExam={deleteExam} onAddClick={() => setCurrentView("add")} />
      )}

      {currentView === "add" && <AddExamForm onSubmit={addExam} onCancel={() => setCurrentView("dashboard")} />}

      {currentView === "schedule" && <StudySchedule exams={exams} />}
    </div>
  )
}

export default App