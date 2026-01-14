"use client"

import { useState } from "react"
import "../styles/AddExamForm.css"

function AddExamForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    date: "",
    time: "",
    priority: "medium",
    studyHours: 15,
    icon: "📚",
    color: "#3b82f6",
  })

  const colors = [
    "#ef4444", "#14b8a6", "#f59e0b", 
    "#3b82f6", "#a855f7", "#6366f1"
  ]

  const icons = ["📚", "💻", "📝", "🔬", "🌍", "📊", "🎨", "🔍", "🧪", "⚡"]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.subject || !formData.date) {
        alert("Please fill in the subject and date")
        return
    }
    onSubmit(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="add-exam-form-container">
        <div className="form-header">
          <div className="form-header-text">
            <h2 className="form-title">Add New Exam</h2>
            <p className="form-subtitle">Add an exam to your study plan</p>
          </div>
          <button className="close-button" onClick={onCancel} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-exam-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Mathematics"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Paper/Topic</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Calculus"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Exam Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Exam Time</label>
              <input
                type="time"
                className="form-input"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Icon</label>
            <div className="icon-picker">
              {icons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  className={`icon-option ${formData.icon === ic ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, icon: ic })}
                  aria-label={`Select ${ic}`}
                >
                  <span className="icon-emoji">{ic}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.color === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <div className="priority-picker">
              <button
                type="button"
                className={`priority-option ${formData.priority === "low" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, priority: "low" })}
              >
                Low
              </button>
              <button
                type="button"
                className={`priority-option ${formData.priority === "medium" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, priority: "medium" })}
              >
                Medium
              </button>
              <button
                type="button"
                className={`priority-option ${formData.priority === "high" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, priority: "high" })}
              >
                High
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Add Exam</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddExamForm