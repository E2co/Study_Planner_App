"use client"

import { useState, useEffect } from "react"
import "../styles/StudySchedule.css"

function StudySchedule({ exams }) {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    generateSchedule()
  }, [exams])

  const generateSchedule = () => {
    const sessions = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    exams.forEach((exam) => {
      const examDate = new Date(exam.date)
      examDate.setHours(0, 0, 0, 0)
      const daysUntil = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24))

      if (daysUntil > 0) {
        const studyHours = exam.studyHours || 15
        const sessionsNeeded = Math.ceil(studyHours / 2)
        const daysForStudy = Math.max(daysUntil - 1, 1)
        const sessionInterval = Math.floor(daysForStudy / sessionsNeeded)

        for (let i = 0; i < sessionsNeeded; i++) {
          const sessionDate = new Date(today)
          sessionDate.setDate(today.getDate() + i * Math.max(sessionInterval, 1))

          if (sessionDate < examDate) {
            sessions.push({
              id: `${exam.id}-${i}`,
              subject: exam.subject,
              topic: exam.topic,
              date: sessionDate.toISOString().split("T")[0],
              duration: Math.min(2, studyHours - i * 2),
              color: exam.color,
              icon: exam.icon,
              completed: false,
            })
          }
        }
      }
    })

    sessions.sort((a, b) => new Date(a.date) - new Date(b.date))
    setSchedule(sessions)
  }

  const toggleComplete = (id) => {
    setSchedule(
      schedule.map((session) => (session.id === id ? { ...session, completed: !session.completed } : session)),
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
  }

  return (
    <div className="study-schedule">
      <div className="schedule-header">
        <h2 className="schedule-title">Study Schedule</h2>
        <p className="schedule-subtitle">{schedule.length} sessions planned</p>
      </div>

      <div className="schedule-list">
        {schedule.map((session) => (
          <div key={session.id} className={`schedule-item ${session.completed ? "completed" : ""}`}>
            <div className="schedule-indicator" style={{ backgroundColor: session.color }} />

            <div className="schedule-content">
              <div className="schedule-icon" style={{ backgroundColor: session.color }}>
                {session.icon}
              </div>

              <div className="schedule-details">
                <h3 className="schedule-subject">{session.subject}</h3>
                <p className="schedule-meta">
                  {formatDate(session.date)} • {session.duration}h session
                </p>
              </div>
            </div>

            <button className="complete-button" onClick={() => toggleComplete(session.id)}>
              {session.completed ? "✓" : "○"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudySchedule