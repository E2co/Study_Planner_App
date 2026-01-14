"use client"

import { useState } from "react"
import "../styles/Auth.css"

export default function Register({ onNavigate }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // 1. Validate input locally first
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields")
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      // 2. Call the Backend API
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Backend expects 'username', 'email', 'password'
        body: JSON.stringify({ 
          username: name, 
          email, 
          password 
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // 3. Success! Pass the user data (including token) up to App.jsx
      console.log("Registration successful:", data)
      onNavigate("dashboard", data)

    } catch (err) {
      console.error("Registration error:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">LockIn</div>
        <h2>Create Account</h2>
        <p className="subtitle">Start your focused study journey today</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={isLoading}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
          />
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate("login")
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}