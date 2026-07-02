import { useMemo, useState } from "react";
import { AlertTriangle, Edit3, Pin, Plus, Trash2 } from "lucide-react";
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
} from "./portalAppData";

type StaffPortalPageProps = {
  interns: Intern[];
  session: AuthSession | null;
  view: "overview" | "interns" | "announcements" | "reports";
  onAdd: () => void;
  onEdit: (intern: Intern) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
  onUpdateProfile: (updates: Partial<AuthSession>) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function StaffPortalPage({
  interns,
  session,
  view,
  onAdd,
  onEdit,
  onDelete,
  onLogout,
  onUpdateProfile,
  darkMode,
  onToggleDarkMode,
}: StaffPortalPageProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [announcements, setAnnouncements] =
    useState<PortalAnnouncement[]>(portalAnnouncements);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState<"Learning" | "Project" | "Administrative">("Project");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [selectedInterns, setSelectedInterns] = useState<number[]>([]);

  const activeInterns = interns.filter((intern) => intern.status === "Active");
  const inactiveInterns = interns.filter((intern) => intern.status === "Inactive");
  const blockedTasks = portalTasks.filter((task) => task.status === "Blocked");

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
        body: "New announcement drafted for the internship program.",
        author: "Admin",
        date: "Jun 23, 2026",
        audience: "All Interns",
        pinned: true,
      },
      ...current,
    ]);
    setAnnouncementTitle("");
    setAnnouncementModalOpen(false);
  };

  const handleCreateTask = () => {
    const cleanTitle = taskTitle.trim();
    const cleanDescription = taskDescription.trim();
    if (!cleanTitle || !cleanDescription || selectedInterns.length === 0) return;

    const newTask = {
      id: Date.now(),
      title: cleanTitle,
      description: cleanDescription,
      category: taskCategory,
      status: "Not Started" as const,
      progress: 0,
      dueDate: taskDueDate,
      assignedTo: selectedInterns,
    };

    portalTasks.push(newTask);
    setTaskTitle("");
    setTaskDescription("");
    setTaskCategory("Project");
    setTaskDueDate("");
    setSelectedInterns([]);
    setTaskModalOpen(false);
  };

  const toggleInternSelection = (internId: number) => {
    setSelectedInterns((current) =>
      current.includes(internId)
        ? current.filter((id) => id !== internId)
        : [...current, internId]
    );
  };

  return (
    <PortalChrome role="staff" session={session} onLogout={onLogout} onUpdateProfile={onUpdateProfile} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode}>
      <main className="portal-main">
        {view === "overview" && (
          <>
            <section className="portal-hero staff">
              <div>
                <span>HR Dashboard - Week 25</span>
                <h1>Good morning, HR Team</h1>
                <p>Here's a snapshot of the current cohort.</p>
              </div>
              <aside className="hero-actions">
                <Link to="/staff/interns" className="manage-interns">Manage Interns</Link>
                <Link to="/staff/announcements" className="post-announcement">Post Announcement</Link>
              </aside>
            </section>

            <section className="portal-two-column" style={{ marginBottom: 20 }}>
              <article className="portal-card" style={{ padding: 20 }}>
                <div className="portal-card-header">
                  <h2>Quick Links</h2>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                  <Link to="/staff/departments" className="manage-interns" style={{ textDecoration: "none" }}>Departments</Link>
                  <Link to="/staff/supervisors" className="manage-interns" style={{ textDecoration: "none" }}>Supervisors</Link>
                  <Link to="/staff/attendance" className="manage-interns" style={{ textDecoration: "none" }}>Attendance</Link>
                  <Link to="/staff/evaluations" className="manage-interns" style={{ textDecoration: "none" }}>Evaluations</Link>
                  <Link to="/staff/profile" className="manage-interns" style={{ textDecoration: "none" }}>Profile</Link>
                </div>
              </article>
            </section>

            <section className="portal-stat-grid">
              <StatCard label="Active Interns" value={activeInterns.length} tone="success" />
              <StatCard label="On Leave" value={1} tone="gold" />
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
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
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
                        <div className="status-cell">
                          <span className={`status-pill ${intern.status.toLowerCase().replace(" ", "-")}`}>
                            {intern.status}
                          </span>
                          {intern.reason && (
                            <small className="status-reason">{intern.reason}</small>
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
                      {announcement.author} - {announcement.date}
                    </span>
                    <div>
                      <button type="button" aria-label="Pin announcement">
                        <Pin size={15} />
                      </button>
                      <button type="button" aria-label="Delete announcement">
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
              <button
                className="portal-primary-button"
                type="button"
                onClick={() => setTaskModalOpen(true)}
              >
                <Plus size={16} />
                Assign Task
              </button>
            </div>
            <div className="blocked-alert">
              <AlertTriangle size={18} />
              <div>
                <strong>{blockedTasks.length} Blocked Tasks Need Attention</strong>
                <p>
                  Marcus Chen - Weekly status report: Waiting for project spec
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
                      <small>{intern.department} - {intern.id % 4} tasks</small>
                    </div>
                  </div>
                  <div className="report-badges">
                    {(intern.id === 2 || intern.id === 7) && (
                      <span className="status-pill blocked">1 Blocked</span>
                    )}
                    <span className={`status-pill ${intern.status.toLowerCase()}`}>
                      {intern.status}
                    </span>
                  </div>
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
            <h2>Assign Task to Interns</h2>
            <label>
              Task Title
              <input
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="e.g. Complete project documentation"
              />
            </label>
            <label>
              Description
              <input
                value={taskDescription}
                onChange={(event) => setTaskDescription(event.target.value)}
                placeholder="Describe the task..."
              />
            </label>
            <label>
              Category
              <select
                value={taskCategory}
                onChange={(event) => setTaskCategory(event.target.value as "Learning" | "Project" | "Administrative")}
              >
                <option value="Learning">Learning</option>
                <option value="Project">Project</option>
                <option value="Administrative">Administrative</option>
              </select>
            </label>
            <label>
              Due Date
              <input
                type="date"
                value={taskDueDate}
                onChange={(event) => setTaskDueDate(event.target.value)}
              />
            </label>
            <label>
              Assign to Interns (select multiple)
              <div className="intern-selection-list">
                {activeInterns.map((intern) => (
                  <label key={intern.id} className="intern-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedInterns.includes(intern.id)}
                      onChange={() => toggleInternSelection(intern.id)}
                    />
                    <span>{intern.name}</span>
                    <small>{intern.department}</small>
                  </label>
                ))}
              </div>
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setTaskModalOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleCreateTask}>
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
