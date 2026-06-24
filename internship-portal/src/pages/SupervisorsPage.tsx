import { useState } from "react";
import { UserCog, Users } from "lucide-react";
import { MOCK_SUPERVISORS } from "../components/types";
import type { Supervisor } from "../components/types";

export default function SupervisorsPage() {
  const [supervisors] = useState<Supervisor[]>(MOCK_SUPERVISORS);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="portal-main">
      <div className="portal-page-heading">
        <div>
          <h1>Supervisors</h1>
          <p>Manage supervisors and their assigned interns</p>
        </div>
        <button className="portal-primary-button" type="button" onClick={() => setModalOpen(true)}>
          <UserCog size={16} />
          Add Supervisor
        </button>
      </div>

      <section className="staff-table-card" style={{ padding: 24 }}>
        <table>
          <thead>
            <tr>
              <th>Supervisor</th>
              <th>Department</th>
              <th>Email</th>
              <th>Assigned Interns</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supervisors.map((sup) => (
              <tr key={sup.id}>
                <td className="staff-intern-cell">
                  <span>{sup.avatar}</span>
                  <div>
                    <strong>{sup.name}</strong>
                    <span>{sup.email}</span>
                  </div>
                </td>
                <td>{sup.department}</td>
                <td>{sup.email}</td>
                <td>
                  <span className="badge" style={{ background: "var(--accent-tint)", color: "var(--accent)" }}>
                    <Users size={12} /> {sup.internCount}
                  </span>
                </td>
                <td>
                  <button className="edit-task-button" type="button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {modalOpen && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>Add Supervisor</h2>
            <p>Form would connect to POST /api/supervisors</p>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="button" onClick={() => setModalOpen(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
