import { LayoutDashboard, LogOut, Moon, Sun } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import type { AuthSession } from "./App";
import logo from "./assets/Logo.svg";
import "./Navbar.css";

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  session: AuthSession | null;
  onLogout: () => void;
};

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  session,
  onLogout,
}: NavbarProps) {
  const navigate = useNavigate();
  const portalPath = session?.role === "staff" ? "/staff" : "/intern";

  const handleLogout = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  return (
    <header className="site-header">
      <Link to="/" className="site-brand" aria-label="D'accubin Interns home">
        <img src={logo} alt="" />
        <span>D'accubin Interns</span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink to="/internships">Internships</NavLink>
        {session && (
          <NavLink to={portalPath}>
            <LayoutDashboard size={16} />
            {session.role === "staff" ? "Staff Portal" : "My Portal"}
          </NavLink>
        )}
      </nav>

      <div className="site-actions">
        <button
          type="button"
          className="icon-button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        {session ? (
          <button type="button" className="login-link" onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>
            <Link to="/signup" className="nav-cta">
              Apply
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
