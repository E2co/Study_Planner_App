"use client"

import "../styles/ExamCard.css"

function ExamCard({ exam, daysUntil, onDelete }) {
  const formatDate = (dateString, timeString) => {
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${timeString}`
  }

  return (
    <div className="exam-card" style={{ backgroundColor: exam.color }}>
      <div className="exam-card-content">
        <div className="exam-icon">{exam.icon}</div>

        <div className="exam-details">
          <h3 className="exam-subject">{exam.subject}</h3>
          <p className="exam-topic">{exam.topic}</p>
          <p className="exam-datetime">{formatDate(exam.date, exam.time)}</p>
        </div>

        <div className="exam-countdown">
          <div className="countdown-number">{daysUntil}</div>
          <div className="countdown-label">days to go</div>
        </div>
      </div>

      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  )
}

export default ExamCard
