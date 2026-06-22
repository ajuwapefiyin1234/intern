import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Sparkles,
  Zap,
  Target,
  Users,
  Award,
  Globe,
  Clock,
  ChevronRight,
  Star,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "./assets/hero.png";
import { featuredDepartments, internshipPostings } from "./portalData";
import "./LandingPage.css";

type LandingPageProps = {
  darkMode: boolean;
};

export default function LandingPage({ darkMode }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Launch Your Career",
      subtitle: "Discover amazing internship opportunities",
      description:
        "A single place for students to discover internship opportunities and for staff to manage every intern once the program begins.",
    },
    {
      title: "Grow With Mentors",
      subtitle: "Learn from industry experts",
      description:
        "Get paired with experienced professionals who will guide your growth and help you develop real-world skills.",
    },
    {
      title: "Build Your Future",
      subtitle: "Real projects, real impact",
      description:
        "Work on actual projects that make an impact. 85% of our interns receive full-time offers upon completion.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const features = [
    {
      icon: Zap,
      title: "Fast Track Your Career",
      description:
        "Gain hands-on experience with real projects that make an impact from day one.",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description:
        "Learn directly from industry professionals who are invested in your growth.",
    },
    {
      icon: Target,
      title: "Skill Development",
      description:
        "Build practical skills that employers are looking for in today's market.",
    },
    {
      icon: Award,
      title: "Certification",
      description:
        "Earn recognized credentials that validate your expertise and dedication.",
    },
  ];

  const stats = [
    { value: "95%", label: "Intern Satisfaction" },
    { value: "85%", label: "Full-time Offers" },
    { value: "50+", label: "Partner Companies" },
    { value: "12", label: "Weeks Average" },
  ];

  return (
    <main className={`landing-page ${darkMode ? "dark" : "light"}`}>
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="hero-content">
          <div className="hero-slides">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              >
                <span className="hero-kicker">
                  <Sparkles size={16} />
                  {slide.subtitle}
                </span>
                <h1>{slide.title}</h1>
                <p className="hero-description">{slide.description}</p>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <Link to="/internships" className="primary-action">
              View internships
              <ArrowRight size={17} />
            </Link>
            <Link to="/dashboard" className="secondary-action">
              Staff dashboard
            </Link>
          </div>
          <div className="hero-trust">
            <div className="trust-item">
              <BadgeCheck size={16} />
              <span>Verified Programs</span>
            </div>
            <div className="trust-item">
              <Globe size={16} />
              <span>Global Opportunities</span>
            </div>
            <div className="trust-item">
              <Clock size={16} />
              <span>24/7 Support</span>
            </div>
          </div>
          {/* Carousel Navigation */}
          <div className="carousel-nav">
            <button
              className="carousel-btn prev"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="carousel-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel-btn next"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRightIcon size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" aria-label="Platform statistics">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <strong className="stat-value">{stat.value}</strong>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-label">Why choose us</span>
          <h2>Everything you need to succeed</h2>
          <p className="section-description">
            Our platform provides comprehensive support for both interns and
            organizations, ensuring a smooth and productive experience.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={24} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section">
        <div className="section-header">
          <span className="section-label">Explore tracks</span>
          <h2>Find a path that fits your ambitions</h2>
          <p className="section-description">
            Discover opportunities across various departments and find the
            perfect match for your skills and interests.
          </p>
        </div>
        <div className="department-grid">
          {featuredDepartments.map((department) => (
            <article key={department.name} className="department-card">
              <div className="department-icon">
                <department.icon size={22} />
              </div>
              <div className="department-arrow">
                <ChevronRight size={18} />
              </div>
              <h3>{department.name}</h3>
              <p>{department.summary}</p>
              <Link to="/internships" className="department-link">
                View openings <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Open Positions Preview */}
      <section className="positions-section">
        <div className="section-header">
          <span className="section-label">Latest opportunities</span>
          <h2>Start applying today</h2>
          <p className="section-description">
            Browse through our curated list of internship positions and find
            your next career move.
          </p>
        </div>
        <div className="positions-preview">
          {internshipPostings.slice(0, 3).map((posting) => (
            <Link
              key={posting.id}
              to={`/internships/${posting.id}`}
              className="position-card"
            >
              <div className="position-header">
                <h3>{posting.title}</h3>
                <span
                  className={`position-status ${posting.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {posting.status}
                </span>
              </div>
              <div className="position-meta">
                <span>{posting.department}</span>
                <span>•</span>
                <span>{posting.location}</span>
                <span>•</span>
                <span>{posting.duration}</span>
              </div>
              <p>{posting.summary}</p>
              <div className="position-skills">
                {posting.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <Link to="/internships" className="view-all-link">
          View all positions <ArrowRight size={16} />
        </Link>
      </section>

      {/* Staff Preview Section */}
      <section className="staff-section">
        <div className="staff-content">
          <span className="section-label">For organizations</span>
          <h2>Streamline your internship program</h2>
          <p>
            Our comprehensive dashboard gives you full control over intern
            management, from onboarding to completion. Track progress, provide
            feedback, and ensure a successful program.
          </p>
          <ul className="staff-features">
            <li>
              <BadgeCheck size={18} />
              <span>Real-time progress tracking</span>
            </li>
            <li>
              <BadgeCheck size={18} />
              <span>Automated feedback collection</span>
            </li>
            <li>
              <BadgeCheck size={18} />
              <span>Comprehensive reporting</span>
            </li>
          </ul>
          <Link to="/dashboard" className="primary-action">
            Access staff portal
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="staff-preview">
          <div className="preview-card">
            <div className="preview-header">
              <span>Active Interns</span>
              <Star size={16} className="preview-star" />
            </div>
            <div className="preview-list">
              <div className="preview-row">
                <span className="preview-avatar">SN</span>
                <div className="preview-info">
                  <span className="preview-name">Sophia Nguyen</span>
                  <span className="preview-role">Frontend Intern</span>
                </div>
                <strong className="status-badge active">Active</strong>
              </div>
              <div className="preview-row">
                <span className="preview-avatar alt">MC</span>
                <div className="preview-info">
                  <span className="preview-name">Marcus Chen</span>
                  <span className="preview-role">Finance Intern</span>
                </div>
                <strong className="status-badge active">Active</strong>
              </div>
              <div className="preview-row">
                <span className="preview-avatar quiet">JO</span>
                <div className="preview-info">
                  <span className="preview-name">James Okafor</span>
                  <span className="preview-role">Marketing Intern</span>
                </div>
                <strong className="status-badge inactive">Inactive</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to begin your journey?</h2>
          <p>
            Join thousands of interns who have launched their careers through
            our platform. Whether you're a student looking for opportunities or
            an organization seeking talent, we've got you covered.
          </p>
          <div className="cta-actions">
            <Link to="/signup" className="primary-action cta-primary">
              Get started free
              <ArrowRight size={17} />
            </Link>
            <Link to="/internships" className="secondary-action cta-secondary">
              Browse opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="process-band">
        <div className="process-header">
          <span className="section-label">How it works</span>
          <h2>Three simple steps</h2>
        </div>
        <div className="process-grid">
          <Link to="/internships" className="process-item">
            <div className="process-number">01</div>
            <div className="process-icon">
              <BadgeCheck size={22} />
            </div>
            <span>Discover roles</span>
            <p>Browse curated opportunities</p>
          </Link>
          <Link to="/signup" className="process-item">
            <div className="process-number">02</div>
            <div className="process-icon">
              <ArrowRight size={22} />
            </div>
            <span>Apply and sign in</span>
            <p>Create your profile and apply</p>
          </Link>
          <Link to="/dashboard" className="process-item">
            <div className="process-number">03</div>
            <div className="process-icon">
              <Building2 size={22} />
            </div>
            <span>Join the program</span>
            <p>Start your internship journey</p>
          </Link>
        </div>
      </section>
    </main>
  );
}