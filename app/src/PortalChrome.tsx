import {
  BarChart3,
  Bell,
  CheckSquare,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Users,
  ClipboardList,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import type { AuthSession } from "./App";
import logo from "./assets/Logo.png";
import "./PortalApp.css";

type PortalChromeProps = {
  role: "intern" | "staff";
  session: AuthSession | null;
  onLogout: () => void;
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
  { to: "/staff/assign", label: "Assign Tasks", icon: ClipboardList },
];

export default function PortalChrome({
  role,
  session,
  onLogout,
  children,
}: PortalChromeProps) {
  const navigate = useNavigate();
  const navItems = role === "staff" ? staffNav : internNav;
  const badge = role === "staff" ? "HR Staff" : "Intern";
  const displayName = session?.name ?? (role === "staff" ? "Admin" : "Marcus");
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="portal-app">
      {/* Floating particles background */}
      <div className="portal-particles" aria-hidden="true">
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
        <div className="portal-particle" />
      </div>

      {/* Animated grid overlay */}
      <div className="portal-grid-overlay" aria-hidden="true" />

      <header className="portal-topbar">
        <button className="portal-brand" type="button" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
          <strong>D'accubin interns</strong>
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
          <span className="portal-user-avatar">{initials}</span>
          <span>{displayName}</span>
          <ChevronDown size={15} />
          <button type="button" onClick={onLogout} aria-label="Logout">
            <LogOut size={15} />
          </button>
        </div>
      </header>
      {children}
      <button className="help-button" type="button" aria-label="Help">
        ?
      </button>
    </div>
  );
}
