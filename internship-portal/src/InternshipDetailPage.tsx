import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { internshipPostings } from "./portalData";
import "./InternshipDetailPage.css";

type InternshipDetailPageProps = {
  darkMode: boolean;
};

export default function InternshipDetailPage({
  darkMode,
}: InternshipDetailPageProps) {
  const { id } = useParams();
  const posting = internshipPostings.find((item) => item.id === Number(id));

  if (!posting) {
    return <Navigate to="/internships" replace />;
  }

  return (
    <main className={`internship-detail-page ${darkMode ? "dark" : "light"}`}>
      <Link to="/internships" className="back-link">
        <ArrowLeft size={16} />
        Back to internships
      </Link>

      <section className="detail-hero">
        <div>
          <span>{posting.department}</span>
          <h1>{posting.title}</h1>
          <p>{posting.summary}</p>
          <div className="detail-meta">
            <span>
              <MapPin size={16} />
              {posting.location}
            </span>
            <span>{posting.duration}</span>
            <strong>{posting.status}</strong>
          </div>
        </div>
        <aside className="apply-panel">
          <h2>Already signed up?</h2>
          <p>
            Access your intern page to manage your profile, tasks, and
            internship updates after creating an account.
          </p>
          <Link to="/intern" className="primary-action detail-apply">
            Access intern page
            <ArrowRight size={17} />
          </Link>
        </aside>
      </section>

      <section className="detail-grid">
        <article className="detail-section">
          <h2>What you will do</h2>
          <div className="highlight-list">
            {posting.highlights.map((highlight) => (
              <div key={highlight}>
                <CheckCircle2 size={18} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-section">
          <h2>Skills you will use</h2>
          <div className="skill-row detail-skills">
            {posting.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
