import { useState } from "react";
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckSquare,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Menu,
  Moon,
  Settings,
  Star,
  Sun,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import type { AuthSession } from "./App";
import logo from "./assets/Logo.svg";
import "./PortalApp.css";

type PortalChromeProps = {
  role: "intern" | "staff";
  session: AuthSession | null;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  children: React.ReactNode;
};

const internNav = [
  { to: "/intern", label: "Overview", icon: LayoutGrid },
  { to: "/intern/tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/intern/attendance", label: "Attendance", icon: Calendar },
  { to: "/intern/evaluations", label: "Evaluations", icon: Star },
  { to: "/intern/announcements", label: "Announcements", icon: Bell },
];

const staffNav = [
  { to: "/staff", label: "Overview", icon: LayoutGrid },
  { to: "/staff/interns", label: "Manage Interns", icon: Users },
  { to: "/staff/departments", label: "Departments", icon: Building2 },
  { to: "/staff/supervisors", label: "Supervisors", icon: UserCog },
  { to: "/staff/attendance", label: "Attendance", icon: Calendar },
  { to: "/staff/evaluations", label: "Evaluations", icon: Star },
  { to: "/staff/announcements", label: "Announcements", icon: Bell },
  { to: "/staff/reports", label: "Task Reports", icon: BarChart3 },
];

export default function PortalChrome({
  role,
  session,
  onLogout,
  darkMode,
  onToggleDarkMode,
  children,
}: PortalChromeProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(session?.profilePicture);
  const navItems = role === "staff" ? staffNav : internNav;
  const badge = role === "staff" ? "HR Staff" : "Intern";
  const displayName = session?.name ?? (role === "staff" ? "Admin" : "Marcus");
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        if (session) {
          const updatedSession = { ...session, profilePicture: reader.result as string };
          localStorage.setItem("interns-portal-session", JSON.stringify(updatedSession));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`portal-app ${darkMode ? "dark" : ""} ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="portal-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="portal-particle" />
        ))}
      </div>

      {/* LEFT SIDEBAR */}
      <aside className={`portal-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <img src={logo} alt="" />
          <strong>D'accubin Interns</strong>
        </div>

        <div className="sidebar-profile">
          <label style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: "none" }}
            />
            {profilePicture ? (
              <img src={profilePicture} alt={displayName} className="sidebar-avatar" />
            ) : (
              <span className="sidebar-avatar">{initials}</span>
            )}
          </label>
          <div className="sidebar-profile-info">
            <span className="sidebar-name">{displayName}</span>
            <span className="sidebar-badge">{badge}</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label={`${badge} navigation`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === `/${role}`}
              className="sidebar-nav-item"
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.label === "Announcements" && role === "intern" && (
                <span className="notification-badge">1</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-bottom-item"
            onClick={() => onToggleDarkMode()}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button
            type="button"
            className="sidebar-bottom-item"
            onClick={() => { navigate(role === "staff" ? "/staff/profile" : "/intern/profile"); setMobileOpen(false); }}
          >
            <Settings size={16} />
            <span>Profile</span>
          </button>
          <button
            type="button"
            className="sidebar-bottom-item"
            onClick={() => { onLogout(); setMobileOpen(false); }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>

        <button
          type="button"
          className="sidebar-collapse"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronDown size={16} className={collapsed ? "" : "chevron-rotated"} />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sidebar-mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <div className="portal-content-wrapper">
        <header className="portal-content-header">
          <div className="content-header-left">
            <button
              type="button"
              className="sidebar-mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1>{role === "staff" ? "Staff Dashboard" : "Intern Portal"}</h1>
          </div>
          <div className="content-header-actions">
            <button type="button" className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
          </div>
        </header>
        {children}
      </div>

      <button className="help-button" type="button" aria-label="Help">
        ?
      </button>
    </div>
  );
}
