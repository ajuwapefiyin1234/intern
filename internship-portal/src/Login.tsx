import React, { useState } from 'react'
import './Login.css'

interface LoginProps {
  onNavigate: (page: 'landing' | 'login' | 'signup') => void
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    console.log('Login:', { email, password })
    alert('Login functionality would connect to backend here')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <button onClick={() => onNavigate('signup')} className="link-button">Sign up</button>
        </p>
        
        <p className="auth-link">
          <button onClick={() => onNavigate('landing')} className="link-button">Back to Home</button>
        </p>
      </div>
    </div>
  )
}

export default Login
