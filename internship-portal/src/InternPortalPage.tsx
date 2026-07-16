import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AlertTriangle, CheckCircle2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { AuthSession } from "./App";
import PortalChrome from "./PortalChrome";
import {
  portalAnnouncements,
  type PortalTask,
  type TaskStatus,
} from "./portalAppData";

type InternPortalPageProps = {
  session: AuthSession | null;
  view: "overview" | "tasks" | "announcements";
  tasks: PortalTask[];
  onTasksChange: Dispatch<SetStateAction<PortalTask[]>>;
  onLogout: () => void;
  onUpdateProfile: (updates: Partial<AuthSession>) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
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
  tasks,
  onTasksChange,
  onLogout,
  onUpdateProfile,
  darkMode,
  onToggleDarkMode,
}: InternPortalPageProps) {
  const [filter, setFilter] = useState<TaskStatus | "All Statuses">(
    "All Statuses"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
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

    onTasksChange((current) => [
      ...current,
      {
        id: Date.now(),
        title: cleanTitle,
        description: "New task added to your weekly tracker.",
        category: "Project",
        status: "Not Started",
        progress: 0,
        dueDate: "Jul 12",
        assignedTo: [1],
      },
    ]);
    setDraftTitle("");
    setModalOpen(false);
  };

  const handleEditTask = () => {
    if (!editingTask) return;

    onTasksChange((current) =>
      current.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              progress: editProgress,
              blocker: editBlocker.trim() || undefined,
              status: editProgress === 100 ? "Completed" : editProgress > 0 ? "In Progress" : "Not Started",
            }
          : task
      )
    );
    setEditModalOpen(false);
    setEditingTask(null);
    setEditProgress(0);
    setEditBlocker("");
  };

  const openEditModal = (task: PortalTask) => {
    setEditingTask(task);
    setEditProgress(task.progress);
    setEditBlocker(task.blocker || "");
    setEditModalOpen(true);
  };

  return (
    <PortalChrome role="intern" session={session} onLogout={onLogout} onUpdateProfile={onUpdateProfile} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode}>
      <main className="portal-main">
        {view === "overview" && (
          <>
            <section className="portal-hero">
              <div>
                <span>Week 25</span>
                <h1>Welcome back, {session?.name ?? "Marcus"}</h1>
                <p>Intern</p>
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
                <p>Week 25 - {tasks.length} tasks</p>
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
                <TaskRow key={task.id} task={task} onEdit={openEditModal} />
              ))}
            </section>
          </>
        )}

        {view === "announcements" && (
          <>
            <div className="portal-page-heading">
              <div>
                <h1>Announcements</h1>
                <p>Company-wide and department notices</p>
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

      {editModalOpen && editingTask && (
        <div className="portal-modal-backdrop" role="dialog" aria-modal="true">
          <div className="portal-modal">
            <h2>Edit Task Progress</h2>
            <label>
              Progress ({editProgress}%)
              <input
                type="range"
                min="0"
                max="100"
                value={editProgress}
                onChange={(event) => setEditProgress(Number(event.target.value))}
              />
            </label>
            <label>
              Blocker (optional)
              <input
                type="text"
                value={editBlocker}
                onChange={(event) => setEditBlocker(event.target.value)}
                placeholder="Describe any blockers..."
              />
            </label>
            <div className="portal-modal-actions">
              <button type="button" onClick={() => setEditModalOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleEditTask}>
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

function TaskRow({ task, compact = false, onEdit }: { task: PortalTask; compact?: boolean; onEdit?: (task: PortalTask) => void }) {
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
        <>
          <small>Due {task.dueDate}</small>
          {onEdit && (
            <button
              type="button"
              className="edit-task-button"
              onClick={() => onEdit(task)}
              style={{ marginTop: "8px" }}
            >
              Edit Progress
            </button>
          )}
        </>
      )}
    </article>
  );
}
