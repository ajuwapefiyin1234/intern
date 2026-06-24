import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Intern } from "./types";
import { DEPARTMENTS } from "./types";

type InternFormPageProps = {
  mode: "add" | "edit";
  darkMode: boolean;
  intern?: Intern;
  onSave: (data: Omit<Intern, "id" | "avatar">) => void;
  onCancel: () => void;
};

export function InternFormPage({ mode, darkMode, intern, onSave, onCancel }: InternFormPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState(intern?.name ?? "");
  const [email, setEmail] = useState(intern?.email ?? "");
  const [department, setDepartment] = useState(intern?.department ?? DEPARTMENTS[0]);
  const [startDate, setStartDate] = useState(intern?.startDate ?? "");
  const [status, setStatus] = useState<Intern["status"]>(intern?.status ?? "Active");
  const [inactiveReason, setInactiveReason] = useState(intern?.inactiveReason ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (intern) {
      setName(intern.name);
      setEmail(intern.email);
      setDepartment(intern.department);
      setStartDate(intern.startDate);
      setStatus(intern.status);
      setInactiveReason(intern.inactiveReason ?? "");
    }
  }, [intern]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !startDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload: Omit<Intern, "id" | "avatar"> = {
      name: name.trim(),
      email: email.trim(),
      department,
      startDate,
      status,
    };

    if (status !== "Active") {
      payload.inactiveReason = inactiveReason.trim() || undefined;
    }

    onSave(payload);
    navigate("/staff/interns", { replace: true });
  };

  const handleCancel = () => {
    onCancel();
    navigate("/staff/interns", { replace: true });
  };

  const showReason = status === "Inactive" || status === "On Leave";

  return (
    <div className={`portal-app ${darkMode ? "dark" : ""}`}>
      <header className="portal-topbar">
        <button className="portal-brand" type="button" onClick={() => navigate("/staff")}>
          <strong>D'accubin interns</strong>
          <span>HR Staff</span>
        </button>
      </header>
      <main className="portal-main" style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px" }}>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
            color: "var(--accent)",
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} />
          Back to interns
        </button>

        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: "0 0 8px", color: "var(--text-strong)" }}>
          {mode === "add" ? "Add New Intern" : "Edit Intern"}
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
          {mode === "add"
            ? "Create a new intern record for the program."
            : "Update the intern's details and status."}
        </p>

        {error && (
          <p style={{
            margin: "0 0 16px",
            padding: "12px",
            borderRadius: 8,
            background: "rgba(220, 38, 38, 0.08)",
            color: "#dc2626",
            fontWeight: 700,
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
          <label style={{ display: "grid", gap: 8, color: "var(--text-strong)", fontWeight: 700 }}>
            Full Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sophia Nguyen"
              style={{
                height: 48,
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0 14px",
                font: "inherit",
                background: "var(--surface)",
                color: "var(--text-strong)",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8, color: "var(--text-strong)", fontWeight: 700 }}>
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sophia@intern.co"
              style={{
                height: 48,
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0 14px",
                font: "inherit",
                background: "var(--surface)",
                color: "var(--text-strong)",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8, color: "var(--text-strong)", fontWeight: 700 }}>
            Department
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{
                height: 48,
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0 14px",
                font: "inherit",
                background: "var(--surface)",
                color: "var(--text-strong)",
              }}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "grid", gap: 8, color: "var(--text-strong)", fontWeight: 700 }}>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                height: 48,
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0 14px",
                font: "inherit",
                background: "var(--surface)",
                color: "var(--text-strong)",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8, color: "var(--text-strong)", fontWeight: 700 }}>
            Status
            <div style={{ display: "flex", gap: 12 }}>
              {(["Active", "Inactive", "On Leave"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  style={{
                    flex: 1,
                    height: 44,
                    border: `1px solid ${status === s ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: 8,
                    background: status === s ? "var(--accent-tint)" : "var(--surface)",
                    color: status === s ? "var(--accent)" : "var(--text-muted)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </label>

          {showReason && (
            <label style={{ display: "grid", gap: 8, color: "var(--text-strong)", fontWeight: 700, animation: "card-enter 0.3s ease" }}>
              Reason for {status === "On Leave" ? "Leave" : "Inactivity"}
              <textarea
                value={inactiveReason}
                onChange={(e) => setInactiveReason(e.target.value)}
                placeholder={status === "On Leave" ? "e.g. Personal leave — approved until 2026-07-01" : "e.g. Medical leave — expected return 2026-07-01"}
                rows={3}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "12px 14px",
                  font: "inherit",
                  background: "var(--surface)",
                  color: "var(--text-strong)",
                  resize: "vertical",
                }}
              />
            </label>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                height: 48,
                padding: "0 24px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--surface)",
                color: "var(--text-muted)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                height: 48,
                border: "none",
                borderRadius: 8,
                background: "var(--accent)",
                color: "#ffffff",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Save size={16} />
              {mode === "add" ? "Add Intern" : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
