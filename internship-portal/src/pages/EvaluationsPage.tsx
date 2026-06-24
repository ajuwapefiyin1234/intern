import { useMemo, useState } from "react";
import { Star, TrendingUp } from "lucide-react";
import { MOCK_EVALUATIONS } from "../components/types";
import type { Evaluation } from "../components/types";

type EvaluationsPageProps = {
  role: "intern" | "staff";
  internId?: number;
};

export default function EvaluationsPage({ role, internId }: EvaluationsPageProps) {
  const [evaluations] = useState<Evaluation[]>(MOCK_EVALUATIONS);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (role === "intern" && internId) {
      return evaluations.filter((e) => e.internId === internId);
    }
    return evaluations;
  }, [evaluations, role, internId]);

  const avgScore = useMemo(() => {
    if (!filtered.length) return 0;
    return (filtered.reduce((sum, e) => sum + e.overallScore, 0) / filtered.length).toFixed(1);
  }, [filtered]);

  return (
    <div className="portal-main">
      <div className="portal-page-heading">
        <div>
          <h1>Evaluations</h1>
          <p>{role === "staff" ? "Review and create intern evaluations" : "Your performance reviews"}</p>
        </div>
        {role === "staff" && (
          <button className="portal-primary-button" type="button" onClick={() => setModalOpen(true)}>
            <Star size={16} /> New Evaluation
          </button>
        )}
      </div>

      <section className="portal-stat-grid">
        <div className="portal-stat-card gold">
          <span>{role === "staff" ? "Total Evaluations" : "Your Reviews"}</span>
          <strong>{filtered.length}</strong>
        </div>
        <div className="portal-stat-card info">
          <span>Average Score</span>
          <strong>{avgScore} / 5</strong>
        </div>
        <div className="portal-stat-card success">
          <span>Top Rating</span>
          <strong>{filtered.length ? Math.max(...filtered.map((e) => e.overallScore)) : 0} / 5</strong>
        </div>
      </section>

      <section className="announcement-list" style={{ marginTop: 28 }}>
        {filtered.map((evalItem) => (
          <article key={evalItem.id} className="announcement-card" style={{ padding: 24 }}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{evalItem.internName}</h2>
              <span>Evaluated by {evalItem.supervisorName} — {evalItem.date}</span>
            </div>
            <div className="progress-track" style={{ margin: "12px 0", height: 8, borderRadius: 4 }}>
              <span style={{ width: `${(evalItem.overallScore / 5) * 100}%`, background: "var(--accent)" }} />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              {evalItem.criteria.map((c) => (
                <span key={c.name} className="badge" style={{ background: "var(--accent-tint)", color: "var(--accent)", fontSize: "0.75rem" }}>
                  {c.name}: {c.score}/5
                </span>
              ))}
            </div>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)" }}>"{evalItem.feedback}"</p>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingUp size={16} style={{ color: "var(--accent)" }} />
              <strong style={{ color: "var(--accent)" }}>Overall: {evalItem.overallScore} / 5</strong>
            </div>
          </article>
        ))}
      </section>

      {modalOpen && role === "staff" && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal" style={{ maxWidth: 520 }}>
            <h2>New Evaluation</h2>
            <p>Form would connect to POST /api/evaluations</p>
            <label>
              Select Intern
              <select><option>Marcus Chen</option><option>Sophia Nguyen</option></select>
            </label>
            <label>
              Performance (1-5)
              <input type="range" min="1" max="5" defaultValue="3" />
            </label>
            <label>
              Feedback
              <textarea rows={3} placeholder="Write your feedback..." />
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="button" onClick={() => setModalOpen(false)}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
