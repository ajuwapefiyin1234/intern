import { ArrowRight, BadgeCheck, Building2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "./assets/hero.png";
import { featuredDepartments, internshipPostings } from "./portalData";
import "./LandingPage.css";

type LandingPageProps = {
  darkMode: boolean;
};

export default function LandingPage({ darkMode }: LandingPageProps) {
  const openRoles = internshipPostings.filter(
    (posting) => posting.status === "Open"
  );

  return (
    <main className={`landing-page ${darkMode ? "dark" : "light"}`}>
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="hero-content">
          <span className="hero-kicker">
            <Sparkles size={16} />
            Internship lifecycle platform
          </span>
          <h1>Interns Portal</h1>
          <p>
            A single place for students to discover internship opportunities and
            for staff to manage every intern once the program begins.
          </p>
          <div className="hero-actions">
            <Link to="/internships" className="primary-action">
              View internships
              <ArrowRight size={17} />
            </Link>
            <Link to="/dashboard" className="secondary-action">
              Staff dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Program snapshot">
        <div>
          <strong>{openRoles.length}</strong>
          <span>open roles</span>
        </div>
        <div>
          <strong>{featuredDepartments.length}</strong>
          <span>departments</span>
        </div>
        <div>
          <strong>12 weeks</strong>
          <span>typical program</span>
        </div>
      </section>

      <section className="content-band">
        <div className="section-heading">
          <span>For candidates</span>
          <h2>Find a track that fits your next step.</h2>
        </div>

        <div className="department-grid">
          {featuredDepartments.map((department) => (
            <article key={department.name} className="department-card">
              <div className="department-icon">
                <department.icon size={22} />
              </div>
              <h3>{department.name}</h3>
              <p>{department.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-band">
        <div>
          <span className="section-label">For staff</span>
          <h2>Operational enough for real internship coordination.</h2>
          <p>
            The dashboard keeps the internal view focused on search, filters,
            intern records, status, dates, and quick admin actions.
          </p>
        </div>
        <div className="staff-preview">
          <div className="preview-row">
            <span className="preview-avatar">SN</span>
            <span>Sophia Nguyen</span>
            <strong>Active</strong>
          </div>
          <div className="preview-row">
            <span className="preview-avatar alt">MC</span>
            <span>Marcus Chen</span>
            <strong>Active</strong>
          </div>
          <div className="preview-row muted">
            <span className="preview-avatar quiet">JO</span>
            <span>James Okafor</span>
            <strong>Inactive</strong>
          </div>
        </div>
      </section>

      <section className="process-band">
        <Link to="/internships" className="process-item">
          <BadgeCheck size={19} />
          <span>Discover roles</span>
        </Link>
        <Link to="/signup" className="process-item">
          <ArrowRight size={19} />
          <span>Apply and sign in</span>
        </Link>
        <Link to="/dashboard" className="process-item">
          <Building2 size={19} />
          <span>Join the staff-managed program</span>
        </Link>
      </section>
    </main>
  );
}
