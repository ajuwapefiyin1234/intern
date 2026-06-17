import React from 'react'
import './LandingPage.css'

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup') => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">D'Accubin Interns</div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button onClick={() => onNavigate('signup')} className="nav-button">Get Started</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Internship</h1>
          <p className="hero-description">
            Connect with top companies and kickstart your career with our comprehensive internship platform. 
            Discover opportunities that match your skills and aspirations.
          </p>
          <div className="hero-buttons">
            <button onClick={() => onNavigate('signup')} className="primary-button">Start Free Trial</button>
            <a href="#features" className="secondary-button">Learn More</a>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="features-container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Smart Matching</h3>
              <p className="feature-description">AI-powered matching to find internships that fit your profile perfectly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-description">Monitor your applications and interview progress in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Direct Connect</h3>
              <p className="feature-description">Connect directly with hiring managers and recruiters</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-container">
          <h2 className="section-title">About D'Accubin Interns</h2>
          <p className="about-description">
            We're dedicated to bridging the gap between talented students and amazing internship opportunities. 
            Our platform makes it easy to discover, apply, and land your dream internship.
          </p>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-description">Have questions? We'd love to hear from you.</p>
          <button className="contact-button">Contact Us</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 D'Accubin Interns. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
