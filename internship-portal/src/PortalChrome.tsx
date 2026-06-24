import { useState } from "react";
import {
  BarChart3,
  Bell,
  CheckSquare,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
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
  { to: "/intern/announcements", label: "Announcements", icon: Bell },
];

const staffNav = [
  { to: "/staff", label: "Overview", icon: LayoutGrid },
  { to: "/staff/interns", label: "Manage Interns", icon: Users },
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
  const [profileOpen, setProfileOpen] = useState(false);
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
    <div className={`portal-app ${darkMode ? "dark" : ""}`}>
      <div className="portal-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="portal-particle" />
        ))}
      </div>
      <header className="portal-topbar">
        <button className="portal-brand" type="button" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
          <strong>D'accubin Interns</strong>
          <span>{badge}</span>
        </button>

        <nav className="portal-tabs" aria-label={`${badge} navigation`}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === `/${role}`}>
              <item.icon size={16} />
              {item.label}
              {item.label === "Announcements" && role === "intern" && (
                <span className="notification-dot">1</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="portal-user">
          <button
            className="portal-profile-trigger"
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Open profile menu"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={displayName}
                className="portal-user-avatar"
                style={{ width: "32px", height: "32px", borderRadius: "999px", objectFit: "cover" }}
              />
            ) : (
              <span className="portal-user-avatar">{initials}</span>
            )}
            <span className="portal-user-name">{displayName}</span>
            <ChevronDown size={15} className={profileOpen ? "chevron-rotated" : ""} />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <label className="profile-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  style={{ display: "none" }}
                />
                <span>Upload Profile Picture</span>
              </label>
              <button type="button" onClick={() => setProfileOpen(false)}>
                <Settings size={14} />
                Profile Settings
              </button>
              <button type="button" onClick={() => setProfileOpen(false)}>
                <Bell size={14} />
                Notifications
              </button>
              <button type="button" onClick={() => { onToggleDarkMode(); setProfileOpen(false); }}>
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button type="button" onClick={() => setProfileOpen(false)}>
                Help & Support
              </button>
              <div className="profile-dropdown-divider" />
              <button type="button" onClick={() => { onLogout(); setProfileOpen(false); }}>
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      {children}
      <button className="help-button" type="button" aria-label="Help">
        ?
      </button>
    </div>
  );
}
