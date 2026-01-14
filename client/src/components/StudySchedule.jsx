"use client"

import { useState, useEffect } from "react"
import "../styles/StudySchedule.css"

function StudySchedule({ user }) { // Receive user object containing the token
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Helper to get headers easily
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}` //
  });

  // 1. Fetch the existing schedule on load
  useEffect(() => {
    if (user && user.token) {
        fetchSchedule()
    }
  }, [user])

  const fetchSchedule = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/schedule', {
        headers: getAuthHeaders() // Added Auth Header
      })

      if (!response.ok) throw new Error('Failed to fetch schedule')
      
      const data = await response.json()
      setSchedule(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 2. Trigger the "Smart Algorithm" on the backend
  const regenerateSchedule = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/schedule/generate', {
        method: 'POST',
        headers: getAuthHeaders() // Added Auth Header
      })

      if (!response.ok) throw new Error('Failed to generate plan')
      
      const data = await response.json()
      setSchedule(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 3. Update completion status in the database
  const toggleComplete = async (id) => {
    // Optimistic UI update
    const originalSchedule = [...schedule]
    setSchedule(schedule.map(s => 
      s._id === id ? { ...s, completed: !s.completed } : s
    ))

    try {
      const response = await fetch(`http://localhost:8080/api/schedule/${id}/toggle`, {
        method: 'PUT',
        headers: getAuthHeaders() // Added Auth Header
      })
      
      if (!response.ok) throw new Error('Failed to update session')
    } catch (err) {
      // Revert if API fails
      setSchedule(originalSchedule)
      setError("Could not save progress. check connection.")
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
  }

  if (loading && schedule.length === 0) return <div className="schedule-loading">Loading your plan...</div>
  if (error) return <div className="schedule-error">Error: {error}</div>

  return (
    <div className="study-schedule">
      <div className="schedule-header">
        <div>
          <h2 className="schedule-title">Study Schedule</h2>
          <p className="schedule-subtitle">{schedule.length} sessions planned</p>
        </div>
        <button className="regenerate-button" onClick={regenerateSchedule} disabled={loading}>
          {loading ? "Planning..." : "🔃 Recalculate Plan"}
        </button>
      </div>

      <div className="schedule-list">
        {schedule.length === 0 ? (
            <div className="empty-state">
                <p>No study sessions found.</p>
                <button onClick={regenerateSchedule}>Generate a Plan</button>
            </div>
        ) : (
            schedule.map((session) => (
            <div key={session._id} className={`schedule-item ${session.completed ? "completed" : ""}`}>
                <div className="schedule-indicator" style={{ backgroundColor: session.color || '#ccc' }} />

                <div className="schedule-content">
                <div className="schedule-icon" style={{ backgroundColor: session.color || '#ccc' }}>
                    {session.icon || '📚'}
                </div>

                <div className="schedule-details">
                    <h3 className="schedule-subject">{session.subject}</h3>
                    <p className="schedule-meta">
                    {formatDate(session.date)} • {session.duration}h session
                    </p>
                </div>
                </div>

                <button className="complete-button" onClick={() => toggleComplete(session._id)}>
                {session.completed ? "✓" : "○"}
                </button>
            </div>
            ))
        )}
      </div>
    </div>
  )
}

export default StudySchedule