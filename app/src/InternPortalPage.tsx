import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Edit3, Plus, Trash2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { AuthSession } from "./App";
import PortalChrome from "./PortalChrome";
import {
  portalAnnouncements,
  portalTasks,
  type PortalTask,
  type TaskStatus,
} from "./portalAppData";

type InternPortalPageProps = {
  session: AuthSession | null;
  view: "overview" | "tasks" | "announcements";
  onLogout: () => void;
};

const statusFilters: Array<TaskStatus | "All Statuses"> = [
  "All Statuses",
  "Not Started",
  "In Progress",
  "Completed",
  "Blocked",
];

const statusClass = {
  "Not Started": "neutral",
  "In Progress": "info",
  Completed: "success",
  Blocked: "danger",
};

export default function InternPortalPage({
  session,
  view,
  onLogout,
}: InternPortalPageProps) {
  const [tasks, setTasks] = useState<PortalTask[]>(portalTasks);
  const [filter, setFilter] = useState<TaskStatus | "All Statuses">(
    "All Statuses"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [editingTask, setEditingTask] = useState<PortalTask | null>(null);
  const [editProgress, setEditProgress] = useState(0);
  const [editBlocker, setEditBlocker] = useState("");

  const filteredTasks = useMemo(
    () =>
      filter === "All Statuses"
        ? tasks
        : tasks.filter((task) => task.status === filter),
    [filter, tasks]
  );

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const blocked = tasks.filter((task) => task.status === "Blocked").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const avgProgress = Math.round(
    tasks.reduce((total, task) => total + task.progress, 0) / tasks.length
  );

  const handleAddTask = () => {
    const cleanTitle = draftTitle.trim();
    if (!cleanTitle) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: cleanTitle,
        description: "New task added to your weekly tracker.",
        category: "Project",
        status: "Not Started",
        progress: 0,
        dueDate: "Jul 12",
      },
    ]);
    setDraftTitle("");
    setModalOpen(false);
  };

  const handleUpdateTask = (id: number, updates: Partial<PortalTask>) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const openEdit = (task: PortalTask) => {
    setEditingTask(task);
    setEditProgress(task.progress);
    setEditBlocker(task.blocker || "");
  };

  const saveEdit = () => {
    if (!editingTask) return;
    handleUpdateTask(editingTask.id, {
      progress: editProgress,
      blocker: editBlocker.trim() || undefined,
    });
    setEditingTask(null);
  };

  const removeBlocker = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, blocker: undefined, status: "In Progress" as TaskStatus }
          : task
      )
    );
  };

  return (
    <PortalChrome role="intern" session={session} onLogout={onLogout}>
      <main className="portal-main">
        {view === "overview" && (
          <>
            <section className="portal-hero">
              <div className="portal-hero-pattern" aria-hidden="true" />
              <div>
                <span>Week 25</span>
                <h1>Welcome back, {session?.name ?? "Marcus"}</h1>
                <p>Frontend Engineering Intern — Technology</p>
              </div>
              <aside>
                <strong>Active</strong>
                <span>Since Jan 2026</span>
              </aside>
            </section>

            <section className="portal-stat-grid">
              <StatCard label="In Progress" value={inProgress} tone="info" />
              <StatCard label="Blocked" value={blocked} tone="danger" />
              <StatCard label="Completed" value={completed} tone="success" />
              <StatCard label="Avg Progress" value={`${avgProgress}%`} tone="gold" />
            </section>

            <section className="portal-two-column">
              <article className="portal-card">
                <div className="portal-card-header">
                  <h2>Recent Tasks</h2>
                  <Link to="/intern/tasks">View all</Link>
                </div>
                <div className="compact-task-list">
                  {tasks.slice(0, 3).map((task) => (
                    <TaskRow key={task.id} task={task} compact />
                  ))}
                </div>
              </article>

              <article className="portal-card">
                <div className="portal-card-header">
                  <h2>Pinned Announcements</h2>
                  <Link to="/intern/announcements">View all</Link>
                </div>
                {portalAnnouncements
                  .filter((announcement) => announcement.pinned)
                  .slice(0, 1)
                  .map((announcement) => (
                    <div key={announcement.id} className="announcement-note pinned">
                      <h3>{announcement.title}</h3>
                      <p>{announcement.body}</p>
                      <span>{announcement.author}</span>
                    </div>
                  ))}
              </article>
            </section>
          </>
        )}

        {view === "tasks" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>My Tasks</h1>
                <p>Week 25 — {tasks.length} tasks</p>
              </div>
              <button className="portal-primary-button" type="button" onClick={() => setModalOpen(true)}>
                <Plus size={16} />
                Add Task
              </button>
            </div>

            <div className="filter-row">
              {statusFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <section className="task-list">
              {filteredTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onEdit={() => openEdit(task)}
                  onRemoveBlocker={() => removeBlocker(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  editable
                />
              ))}
            </section>
          </>
        )}

        {view === "announcements" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>Announcements</h1>
                <p>Company-wide and Technology department notices</p>
              </div>
            </div>
            <section className="announcement-list">
              {portalAnnouncements.map((announcement) => (
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
                    <span>{announcement.author}</span>
                    <span>{announcement.date}</span>
                  </footer>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

      {modalOpen && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>Add Task</h2>
            <label>
              Task title
              <input
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="e.g. Submit sprint notes"
              />
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleAddTask}>
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}

      {editingTask && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>Edit Task</h2>
            <p style={{ color: "var(--text-muted)", margin: "0 0 20px" }}>
              {editingTask.title}
            </p>
            <label>
              Progress: {editProgress}%
              <input
                type="range"
                min={0}
                max={100}
                value={editProgress}
                onChange={(event) => setEditProgress(Number(event.target.value))}
                style={{ width: "100%", marginTop: 8 }}
              />
            </label>
            <label style={{ marginTop: 12 }}>
              Blocker / Note
              <textarea
                value={editBlocker}
                onChange={(event) => setEditBlocker(event.target.value)}
                placeholder="Describe any blockers or notes..."
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
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setEditingTask(null)}>
                Cancel
              </button>
              <button type="button" onClick={saveEdit}>
                Save Changes
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

function TaskRow({
  task,
  compact = false,
  editable = false,
  onEdit,
  onRemoveBlocker,
  onDelete,
}: {
  task: PortalTask;
  compact?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  onRemoveBlocker?: () => void;
  onDelete?: () => void;
}) {
  return (
    <article className={`task-row ${statusClass[task.status]}`}>
      <div className="task-row-main">
        <div>
          <h2>{task.title}</h2>
          {!compact && <p>{task.description}</p>}
        </div>
        <div className="task-badges">
          <span>{task.category}</span>
          <strong>
            {task.status === "Completed" && <CheckCircle2 size={14} />}
            {task.status === "Blocked" && <AlertTriangle size={14} />}
            {task.status}
          </strong>
        </div>
      </div>
      {task.blocker && (
        <div className="blocker-note">
          <AlertTriangle size={15} />
          <span>{task.blocker}</span>
          {editable && onRemoveBlocker && (
            <button
              type="button"
              className="portal-text-button"
              onClick={onRemoveBlocker}
              style={{ marginLeft: "auto" }}
            >
              <XCircle size={14} />
              Remove
            </button>
          )}
        </div>
      )}
      <div className="progress-row">
        <span>Progress</span>
        <strong>{task.progress}%</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${task.progress}%` }} />
      </div>
      {!compact && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <small>Due {task.dueDate}</small>
          {editable && (
            <div style={{ display: "flex", gap: 8 }}>
              <button className="portal-secondary-button" type="button" onClick={onEdit}>
                <Edit3 size={14} />
                Edit
              </button>
              <button className="portal-secondary-button danger" type="button" onClick={onDelete}>
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
