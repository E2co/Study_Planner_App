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
    color: "#667eea",
  })

  const colors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#ec4899",
  ]

  const icons = ["📚", "💻", "📐", "🔬", "🌍", "📊", "🎨", "📝", "🧪", "⚡"]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="add-exam-form-container">
      <div className="form-header">
        <h2 className="form-title">Add New Exam</h2>
        <button className="close-button" onClick={onCancel}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="add-exam-form">
        <div className="form-group">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., COMP3652 - Language Processors"
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
            placeholder="e.g., Final Exam"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            required
          />
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
            <label className="form-label">Time</label>
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
          <label className="form-label">Study Hours Available</label>
          <input
            type="number"
            className="form-input"
            min="1"
            max="100"
            value={formData.studyHours}
            onChange={(e) => setFormData({ ...formData, studyHours: Number.parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            className="form-input"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Choose Color</label>
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
          <label className="form-label">Choose Icon</label>
          <div className="icon-picker">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                className={`icon-option ${formData.icon === icon ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, icon })}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Exam
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddExamForm