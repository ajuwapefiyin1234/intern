import { useState } from "react";
import { Building2 } from "lucide-react";
import { MOCK_DEPARTMENTS } from "../components/types";
import type { Department } from "../components/types";

export default function DepartmentsPage() {
  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [draftName, setDraftName] = useState("");

  const handleAdd = () => {
    if (!draftName.trim()) return;
    setDraftName("");
    setModalOpen(false);
  };

  return (
    <div className="portal-main">
      <div className="portal-page-heading">
        <div>
          <h1>Departments</h1>
          <p>Manage departments and view intern distribution</p>
        </div>
        <button className="portal-primary-button" type="button" onClick={() => setModalOpen(true)}>
          <Building2 size={16} />
          Add Department
        </button>
      </div>

      <section className="portal-stat-grid">
        {departments.map((dept) => (
          <article key={dept.id} className="portal-card" style={{ borderLeft: `4px solid ${dept.color}` }}>
            <div className="portal-card-header">
              <h2 style={{ color: dept.color }}>{dept.name}</h2>
              <span>{dept.headCount} Head</span>
            </div>
            <div className="portal-stat-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 12, gap: 8 }}>
              <div className="portal-stat-card info" style={{ minHeight: 80, padding: 14 }}>
                <span>Interns</span>
                <strong>{dept.internCount}</strong>
              </div>
              <div className="portal-stat-card gold" style={{ minHeight: 80, padding: 14 }}>
                <span>Utilization</span>
                <strong>{Math.round((dept.internCount / 20) * 100)}%</strong>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="edit-task-button" type="button">Edit</button>
              <button className="edit-task-button" type="button">Delete</button>
            </div>
          </article>
        ))}
      </section>

      {modalOpen && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>Add Department</h2>
            <label>
              Department Name
              <input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="e.g. Data Science" />
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="button" onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
