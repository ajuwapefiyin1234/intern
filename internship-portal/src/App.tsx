import React, { useState } from 'react'
import LandingPage from './LandingPage'
import Login from './Login'
import Signup from './Signup'

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup'>('landing')

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />
      case 'login':
        return <Login onNavigate={setCurrentPage} />
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />
      default:
        return <LandingPage onNavigate={setCurrentPage} />
    }
  }

  return renderPage()
}

export default App