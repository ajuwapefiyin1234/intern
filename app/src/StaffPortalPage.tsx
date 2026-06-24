import { useMemo, useState } from "react";
import { AlertTriangle, ClipboardList, Edit3, Pin, Plus, Trash2, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { AuthSession } from "./App";
import type { Intern } from "./components/types";
import { DEPARTMENTS } from "./components/types";
import PortalChrome from "./PortalChrome";
import {
  departmentProgress,
  portalAnnouncements,
  portalTasks,
  type PortalAnnouncement,
  type PortalTask,
} from "./portalAppData";

type StaffPortalPageProps = {
  interns: Intern[];
  session: AuthSession | null;
  view: "overview" | "interns" | "announcements" | "reports" | "assign";
  onAdd: () => void;
  onEdit: (intern: Intern) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
};

export default function StaffPortalPage({
  interns,
  session,
  view,
  onAdd,
  onEdit,
  onDelete,
  onLogout,
}: StaffPortalPageProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [announcements, setAnnouncements] =
    useState<PortalAnnouncement[]>(portalAnnouncements);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");

  const [staffTasks, setStaffTasks] = useState<PortalTask[]>(portalTasks);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskDraft, setTaskDraft] = useState({
    title: "",
    description: "",
    category: "Project" as PortalTask["category"],
    dueDate: "",
  });

  const activeInterns = interns.filter((intern) => intern.status === "Active");
  const inactiveInterns = interns.filter((intern) => intern.status === "Inactive");
  const onLeaveInterns = interns.filter((intern) => intern.status === "On Leave");
  const blockedTasks = staffTasks.filter((task) => task.status === "Blocked");

  const visibleInterns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return interns.filter((intern) => {
      const matchesSearch =
        !query ||
        intern.name.toLowerCase().includes(query) ||
        intern.email.toLowerCase().includes(query);
      const matchesDepartment = !department || intern.department === department;
      const matchesStatus = !status || intern.status === status;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [department, interns, search, status]);

  const handleCreateAnnouncement = () => {
    const cleanTitle = announcementTitle.trim();
    if (!cleanTitle) return;

    setAnnouncements((current) => [
      {
        id: Date.now(),
        title: cleanTitle,
        body: announcementBody.trim() || "New announcement drafted for the internship program.",
        author: "Admin",
        date: "Jun 23, 2026",
        audience: "All Interns",
        pinned: true,
      },
      ...current,
    ]);
    setAnnouncementTitle("");
    setAnnouncementBody("");
    setAnnouncementModalOpen(false);
  };

  const handleAddTask = () => {
    const cleanTitle = taskDraft.title.trim();
    if (!cleanTitle) return;

    setStaffTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: cleanTitle,
        description: taskDraft.description.trim() || "New task assigned.",
        category: taskDraft.category,
        status: "Not Started",
        progress: 0,
        dueDate: taskDraft.dueDate || "Jul 15",
      },
    ]);
    setTaskDraft({ title: "", description: "", category: "Project", dueDate: "" });
    setTaskModalOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    setStaffTasks((current) => current.filter((t) => t.id !== id));
  };

  return (
    <PortalChrome role="staff" session={session} onLogout={onLogout}>
      <main className="portal-main">
        {view === "overview" && (
          <>
            <section className="portal-hero staff">
              <div className="portal-hero-pattern" aria-hidden="true" />
              <div>
                <span>HR Dashboard — Week 25</span>
                <h1>Good morning, {session?.name ?? "HR Team"}</h1>
                <p>Here's a snapshot of the current cohort.</p>
              </div>
              <aside className="hero-actions">
                <Link to="/staff/interns">Manage Interns</Link>
                <Link to="/staff/announcements">Post Announcement</Link>
              </aside>
            </section>

            <section className="portal-stat-grid">
              <StatCard label="Active Interns" value={activeInterns.length} tone="success" />
              <StatCard label="On Leave" value={onLeaveInterns.length} tone="gold" />
              <StatCard label="Inactive" value={inactiveInterns.length} tone="danger" />
              <StatCard label="Blocked Tasks" value={blockedTasks.length} tone="danger" />
            </section>

            <section className="portal-two-column">
              <article className="portal-card">
                <div className="portal-card-header">
                  <h2>Active Interns by Department</h2>
                </div>
                <div className="department-progress-list">
                  {departmentProgress.map((item) => (
                    <div key={item.name}>
                      <div>
                        <span>{item.name}</span>
                        <strong>{item.count}</strong>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="portal-card">
                <div className="portal-card-header">
                  <h2>Recent Announcements</h2>
                  <Link to="/staff/announcements">Manage</Link>
                </div>
                <div className="staff-announcement-stack">
                  {announcements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className="announcement-note">
                      <h3>{announcement.title}</h3>
                      <span>{announcement.audience}</span>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}

        {view === "interns" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>Manage Interns</h1>
                <p>{visibleInterns.length} interns</p>
              </div>
              <button
                className="portal-primary-button"
                type="button"
                onClick={() => {
                  onAdd();
                  navigate("/intern-form/add");
                }}
              >
                <Plus size={16} />
                Add Intern
              </button>
            </div>

            <div className="management-controls">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search interns..."
              />
              <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                <option value="">All Departments</option>
                {DEPARTMENTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <section className="staff-table-card">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Start Date</th>
                    <th>Status / Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleInterns.map((intern) => (
                    <tr key={intern.id}>
                      <td>
                        <div className="staff-intern-cell">
                          <span>{intern.avatar}</span>
                          <div>
                            <strong>{intern.name}</strong>
                            <small>{intern.department} Intern</small>
                          </div>
                        </div>
                      </td>
                      <td>{intern.email}</td>
                      <td>
                        <span className="soft-badge">{intern.department}</span>
                      </td>
                      <td>{formatDate(intern.startDate)}</td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <span className={`status-pill ${intern.status.toLowerCase().replace(/\s/g, "-")}`}>
                            {intern.status}
                          </span>
                          {intern.inactiveReason && (
                            <small style={{ color: "var(--text-muted)", fontSize: "0.75rem", maxWidth: 200 }}>
                              {intern.inactiveReason}
                            </small>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="staff-row-actions">
                          <button
                            type="button"
                            onClick={() => {
                              onEdit(intern);
                              navigate("/intern-form/edit");
                            }}
                          >
                            <Edit3 size={14} />
                            Edit
                          </button>
                          <button type="button" onClick={() => onDelete(intern.id)}>
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {view === "announcements" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>Announcements</h1>
                <p>Broadcast to all interns or specific departments</p>
              </div>
              <button
                className="portal-primary-button"
                type="button"
                onClick={() => setAnnouncementModalOpen(true)}
              >
                <Plus size={16} />
                New Announcement
              </button>
            </div>
            <section className="announcement-list">
              {announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className={`announcement-card ${
                    announcement.pinned ? "pinned" : ""
                  }`}
                >
                  <div>
                    <h2>{announcement.title}</h2>
                    <span>{announcement.audience}</span>
                  </div>
                  <p>{announcement.body}</p>
                  <footer>
                    <span>
                      {announcement.author} — {announcement.date}
                    </span>
                    <div>
                      <button type="button" aria-label="Pin announcement">
                        <Pin size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete announcement"
                        onClick={() =>
                          setAnnouncements((current) =>
                            current.filter((a) => a.id !== announcement.id)
                          )
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </footer>
                </article>
              ))}
            </section>
          </>
        )}

        {view === "reports" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>Task Reports</h1>
                <p>Live view of all intern task logs</p>
              </div>
            </div>
            <div className="blocked-alert">
              <AlertTriangle size={18} />
              <div>
                <strong>{blockedTasks.length} Blocked Tasks Need Attention</strong>
                <p>
                  Marcus Chen — Weekly status report: Waiting for project spec
                  documents from the Product team.
                </p>
              </div>
            </div>
            <section className="report-list">
              {interns.slice(0, 8).map((intern) => (
                <article
                  key={intern.id}
                  className={`report-row ${intern.id === 2 || intern.id === 7 ? "has-blocker" : ""}`}
                >
                  <div className="staff-intern-cell">
                    <span>{intern.avatar}</span>
                    <div>
                      <strong>{intern.name}</strong>
                      <small>{intern.department} — {intern.id % 4} tasks</small>
                    </div>
                  </div>
                  <div className="report-badges">
                    {(intern.id === 2 || intern.id === 7) && (
                      <span className="status-pill blocked">1 Blocked</span>
                    )}
                    <span className={`status-pill ${intern.status.toLowerCase().replace(/\s/g, "-")}`}>
                      {intern.status}
                    </span>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        {view === "assign" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>Assign Tasks</h1>
                <p>Create and manage intern tasks</p>
              </div>
              <button
                className="portal-primary-button"
                type="button"
                onClick={() => setTaskModalOpen(true)}
              >
                <ClipboardList size={16} />
                Assign Task
              </button>
            </div>

            <section className="task-list">
              {staffTasks.map((task) => (
                <article key={task.id} className={`task-row ${task.status.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="task-row-main">
                    <div>
                      <h2>{task.title}</h2>
                      <p>{task.description}</p>
                    </div>
                    <div className="task-badges">
                      <span>{task.category}</span>
                      <strong className={task.status.toLowerCase().replace(/\s/g, "-")}>
                        {task.status === "Blocked" && <AlertTriangle size={14} />}
                        {task.status}
                      </strong>
                    </div>
                  </div>
                  {task.blocker && (
                    <div className="blocker-note">
                      <AlertTriangle size={15} />
                      <span>{task.blocker}</span>
                    </div>
                  )}
                  <div className="progress-row">
                    <span>Progress</span>
                    <strong>{task.progress}%</strong>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${task.progress}%` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, gap: 8 }}>
                    <button
                      className="portal-secondary-button"
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <XCircle size={14} />
                      Remove
                    </button>
                  </div>
                  <small>Due {task.dueDate}</small>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

      {announcementModalOpen && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>New Announcement</h2>
            <label>
              Title
              <input
                value={announcementTitle}
                onChange={(event) => setAnnouncementTitle(event.target.value)}
                placeholder="e.g. Design review moved to Friday"
              />
            </label>
            <label style={{ marginTop: 12 }}>
              Body
              <textarea
                value={announcementBody}
                onChange={(event) => setAnnouncementBody(event.target.value)}
                placeholder="Enter announcement details..."
                rows={4}
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  font: "inherit",
                  background: "var(--surface)",
                  color: "var(--text-strong)",
                  marginTop: 8,
                }}
              />
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setAnnouncementModalOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleCreateAnnouncement}>
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {taskModalOpen && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>Assign New Task</h2>
            <label>
              Task title
              <input
                value={taskDraft.title}
                onChange={(event) => setTaskDraft((d) => ({ ...d, title: event.target.value }))}
                placeholder="e.g. Submit sprint notes"
              />
            </label>
            <label style={{ marginTop: 12 }}>
              Description
              <textarea
                value={taskDraft.description}
                onChange={(event) => setTaskDraft((d) => ({ ...d, description: event.target.value }))}
                placeholder="Describe the task..."
                rows={3}
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  font: "inherit",
                  background: "var(--surface)",
                  color: "var(--text-strong)",
                  marginTop: 8,
                }}
              />
            </label>
            <label style={{ marginTop: 12 }}>
              Category
              <select
                value={taskDraft.category}
                onChange={(event) => setTaskDraft((d) => ({ ...d, category: event.target.value as PortalTask["category"] }))}
                style={{
                  width: "100%",
                  height: 48,
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "0 16px",
                  font: "inherit",
                  background: "var(--surface)",
                  color: "var(--text-strong)",
                  marginTop: 8,
                }}
              >
                <option value="Learning">Learning</option>
                <option value="Project">Project</option>
                <option value="Administrative">Administrative</option>
              </select>
            </label>
            <label style={{ marginTop: 12 }}>
              Due Date
              <input
                type="date"
                value={taskDraft.dueDate}
                onChange={(event) => setTaskDraft((d) => ({ ...d, dueDate: event.target.value }))}
                style={{
                  width: "100%",
                  height: 48,
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "0 16px",
                  font: "inherit",
                  background: "var(--surface)",
                  color: "var(--text-strong)",
                  marginTop: 8,
                }}
              />
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setTaskModalOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleAddTask}>
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalChrome>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: string;
}) {
  return (
    <article className={`portal-stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
