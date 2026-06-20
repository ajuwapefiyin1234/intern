import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { candidateMilestones, internshipPostings } from "./portalData";
import "./CandidatePortalPage.css";

type CandidatePortalPageProps = {
  darkMode: boolean;
};

export default function CandidatePortalPage({
  darkMode,
}: CandidatePortalPageProps) {
  const featuredRole = internshipPostings[0];

  return (
    <main className={`candidate-page ${darkMode ? "dark" : "light"}`}>
      <section className="candidate-hero">
        <div>
          <span>Candidate portal</span>
          <h1>Your internship application hub.</h1>
          <p>
            Save your profile, track applications, and keep a clear view of each
            step from discovery to offer.
          </p>
          <Link to="/internships" className="primary-action candidate-action">
            Browse roles
            <ArrowRight size={17} />
          </Link>
        </div>
        <aside className="application-panel">
          <div className="application-panel-header">
            <CheckCircle2 size={18} />
            <span>Current application</span>
          </div>
          <h2>{featuredRole.title}</h2>
          <p>{featuredRole.department} · {featuredRole.duration}</p>
        </aside>
      </section>

      <section className="milestone-grid">
        {candidateMilestones.map((milestone) => (
          <article key={milestone.title} className="milestone-card">
            <div>
              <milestone.icon size={20} />
            </div>
            <h2>{milestone.title}</h2>
            <p>{milestone.status}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
