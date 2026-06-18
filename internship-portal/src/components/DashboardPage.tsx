import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import type { Intern } from "./types";
import { DEPARTMENTS } from "./types";
import "./DashboardPage.css";

interface DashboardPageProps {
  interns: Intern[];
  userEmail: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onAdd: () => void;
  onEdit: (intern: Intern) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
}

const PAGE_SIZE = 10;

const AVATAR_COLORS = [
  "#006078",
  "#2e7d9a",
  "#1a5c6f",
  "#0d7377",
  "#145374",
  "#1b4f72",
  "#117a65",
  "#1a6b3c",
];

function getAvatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

export function DashboardPage({
  interns,
  userEmail,
  darkMode,
  onToggleDarkMode,
  onAdd,
  onEdit,
  onDelete,
  onLogout,
}: DashboardPageProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [profileOpen, setProfileOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const displayName = userEmail ? userEmail.split("@")[0] : "staff";
  const filteredInterns = interns.filter((intern) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      intern.name.toLowerCase().includes(searchText) ||
      intern.email.toLowerCase().includes(searchText);
    const matchesDepartment =
      departmentFilter === "" || intern.department === departmentFilter;
    const matchesStatus = statusFilter === "" || intern.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredInterns.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleInterns = filteredInterns.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const internToDelete = interns.find((intern) => intern.id === deleteConfirm);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className={`dashboard-page ${darkMode ? "dark" : "light"}`}>
      <header className="dashboard-navbar">
        <div className="dashboard-navbar-inner">
          <div className="dashboard-brand">
            <img src={logo} alt="Interns Portal logo" />
            <span>Interns Portal</span>
          </div>

          <div className="dashboard-actions">
            <button
              className="theme-toggle-button"
              type="button"
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <label className="dashboard-search">
              <Search size={15} />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search interns..."
              />
            </label>

            <button
              className="add-intern-button"
              type="button"
              onClick={() => {
                onAdd();
                navigate("/intern-form/add");
              }}
            >
              <Plus size={16} />
              Add New Intern
            </button>

            <div className="profile-menu">
              <button
                className="profile-button"
                type="button"
                onClick={() => setProfileOpen((isOpen) => !isOpen)}
              >
                <span className="profile-avatar">
                  <User size={14} />
                </span>
                <span>{displayName}</span>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-details">
                    <strong>{displayName}</strong>
                    <span>{userEmail || "Signed out"}</span>
                  </div>
                  <button
                    className="logout-button"
                    type="button"
                    onClick={() => {
                      onLogout();
                      navigate("/login");
                    }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-title">
          <h1>All Interns</h1>
          <p>
            {filteredInterns.length} intern
            {filteredInterns.length === 1 ? "" : "s"} total
          </p>
        </section>

        <section className="dashboard-filters" aria-label="Intern filters">
          <select
            value={departmentFilter}
            onChange={(event) => {
              setDepartmentFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </section>

        <section className="intern-table-card">
          {visibleInterns.length === 0 ? (
            <div className="empty-state">
              <p>No interns found</p>
              <span>Try changing the search or filters.</span>
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Start Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleInterns.map((intern) => (
                    <tr key={intern.id}>
                      <td>
                        <div className="intern-name">
                          <span
                            className="intern-avatar"
                            style={{ background: getAvatarColor(intern.id) }}
                          >
                            {intern.avatar}
                          </span>
                          <span>{intern.name}</span>
                        </div>
                      </td>
                      <td>{intern.email}</td>
                      <td>
                        <span className="department-badge">
                          {intern.department}
                        </span>
                      </td>
                      <td>{formatDate(intern.startDate)}</td>
                      <td>
                        <span
                          className={
                            intern.status === "Active"
                              ? "status-badge active"
                              : "status-badge inactive"
                          }
                        >
                          {intern.status}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="edit-button"
                            type="button"
                            onClick={() => {
                              onEdit(intern);
                              navigate("/intern-form/edit");
                            }}
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            type="button"
                            onClick={() => setDeleteConfirm(intern.id)}
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <footer className="table-footer">
            <span>
              {filteredInterns.length === 0
                ? "0 of 0 interns"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
                    currentPage * PAGE_SIZE,
                    filteredInterns.length
                  )} of ${filteredInterns.length} interns`}
            </span>

            <div className="pagination-buttons">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={pageNumber === currentPage ? "current" : ""}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </footer>
        </section>
      </main>

      {internToDelete && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="delete-modal">
            <div className="delete-modal-icon">
              <Trash2 size={22} />
            </div>
            <h2>Delete Intern</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{internToDelete.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-delete"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete"
                onClick={() => {
                  onDelete(internToDelete.id);
                  setDeleteConfirm(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
