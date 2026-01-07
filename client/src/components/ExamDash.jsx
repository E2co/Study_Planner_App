"use client"
import ExamCard from "./ExamCard"
import "../styles/ExamDash.css"

function ExamDash({ exams, onDeleteExam, onAddClick }) {
  const calculateDaysUntil = (examDate) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const exam = new Date(examDate)
    exam.setHours(0, 0, 0, 0)
    const diffTime = exam - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="exam-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">My Exams</h2>
        <button className="add-button" onClick={onAddClick}>
          <span className="add-icon">+</span>
        </button>
      </div>

      <div className="exams-container">
        <div className="exam-count">Upcoming ({exams.length})</div>

        <div className="exam-list">
          {sortedExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              daysUntil={calculateDaysUntil(exam.date)}
              onDelete={() => onDeleteExam(exam.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamDash