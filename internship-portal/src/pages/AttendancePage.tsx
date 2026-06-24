import { useMemo, useState } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { MOCK_ATTENDANCE } from "../components/types";
import type { AttendanceRecord } from "../components/types";

const statusIcons = {
  Present: CheckCircle2,
  Late: Clock,
  Absent: XCircle,
};

const statusColors = {
  Present: "var(--success)",
  Late: "#d97706",
  Absent: "var(--danger)",
};

type AttendancePageProps = {
  role: "intern" | "staff";
  internId?: number;
};

export default function AttendancePage({ role, internId }: AttendancePageProps) {
  const [records] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [filter, setFilter] = useState<"All" | "Present" | "Late" | "Absent">("All");

  const filtered = useMemo(() => {
    let data = records;
    if (role === "intern" && internId) {
      data = data.filter((r) => r.internId === internId);
    }
    if (filter !== "All") {
      data = data.filter((r) => r.status === filter);
    }
    return data;
  }, [records, role, internId, filter]);

  const stats = useMemo(() => {
    const data = role === "intern" && internId ? records.filter((r) => r.internId === internId) : records;
    const total = data.length;
    const present = data.filter((r) => r.status === "Present").length;
    const late = data.filter((r) => r.status === "Late").length;
    const absent = data.filter((r) => r.status === "Absent").length;
    return { total, present, late, absent, rate: total ? Math.round((present / total) * 100) : 0 };
  }, [records, role, internId]);

  const today = new Date().toISOString().split("T")[0];
  const todayRecord = records.find((r) => r.date === today && (role === "staff" || r.internId === internId));
  const isCheckedIn = !!todayRecord?.checkIn;
  const isCheckedOut = !!todayRecord?.checkOut;

  return (
    <div className="portal-main">
      <div className="portal-page-heading">
        <div>
          <h1>Attendance</h1>
          <p>{role === "staff" ? "Track all intern attendance records" : "Your attendance records and clock-in status"}</p>
        </div>
      </div>

      {role === "intern" && (
        <section className="portal-hero" style={{ marginBottom: 20, minHeight: 100, padding: "20px 28px" }}>
          <div>
            <span>Today - {today}</span>
            <h1 style={{ fontSize: "1.3rem" }}>Clock In Status</h1>
            <p>{isCheckedIn ? (isCheckedOut ? "Checked out for the day" : "Checked in - working") : "Not checked in yet"}</p>
          </div>
          <aside className="hero-actions" style={{ gap: 10 }}>
            {!isCheckedIn && (
              <button className="manage-interns" type="button" onClick={() => {}}>
                <CheckCircle2 size={14} /> Check In
              </button>
            )}
            {isCheckedIn && !isCheckedOut && (
              <button className="manage-interns" type="button" onClick={() => {}}>
                <Clock size={14} /> Check Out
              </button>
            )}
            {isCheckedOut && (
              <span style={{ color: "#74d99f", fontWeight: 600 }}>Day Complete</span>
            )}
          </aside>
        </section>
      )}

      <section className="portal-stat-grid">
        <div className="portal-stat-card info">
          <span>Total Records</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="portal-stat-card success">
          <span>Present</span>
          <strong>{stats.present}</strong>
        </div>
        <div className="portal-stat-card gold">
          <span>Late</span>
          <strong>{stats.late}</strong>
        </div>
        <div className="portal-stat-card danger">
          <span>Absent</span>
          <strong>{stats.absent}</strong>
        </div>
      </section>

      <div className="filter-row" style={{ marginTop: 20 }}>
        {(["All", "Present", "Late", "Absent"] as const).map((s) => (
          <button key={s} type="button" className={filter === s ? "active" : ""} onClick={() => setFilter(s)}>
            {s}
          </button>
        ))}
      </div>

      <section className="staff-table-card" style={{ padding: 24, marginTop: 20 }}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              {role === "staff" && <th>Intern</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => {
              const Icon = statusIcons[record.status];
              return (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>
                    <span className="badge" style={{ color: statusColors[record.status], background: `${statusColors[record.status]}22` }}>
                      <Icon size={12} /> {record.status}
                    </span>
                  </td>
                  <td>{record.checkIn ?? "—"}</td>
                  <td>{record.checkOut ?? "—"}</td>
                  {role === "staff" && <td>Intern #{record.internId}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
