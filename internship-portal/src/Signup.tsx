import React, { useState } from 'react'
import './Signup.css'

interface SignupProps {
  onNavigate: (page: 'landing' | 'login' | 'signup') => void
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long!')
      return
    }
    
    console.log('Signup:', { name, email, password })
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="success-message">
            <h2 className="auth-title">Success!</h2>
            <p className="success-text">Your account has been created successfully.</p>
            <button onClick={() => onNavigate('login')} className="auth-button">Go to Login</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="auth-link">
          Already have an account? <button onClick={() => onNavigate('login')} className="link-button">Login</button>
        </p>
        
        <p className="auth-link">
          <button onClick={() => onNavigate('landing')} className="link-button">Back to Home</button>
        </p>
      </div>
    </div>
  )
}

export default Signup
