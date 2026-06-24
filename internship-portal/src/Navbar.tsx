import { LayoutDashboard, Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "./assets/Logo.svg";
import "./Navbar.css";

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function Navbar({ darkMode, onToggleDarkMode }: NavbarProps) {
  return (
    <header className="site-header">
      <Link to="/" className="site-brand" aria-label="D'accubin Interns home">
        <img src={logo} alt="" />
        <span>D'accubin Interns</span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink to="/internships">Internships</NavLink>
        <NavLink to="/candidate">Candidate</NavLink>
        <NavLink to="/dashboard">
          <LayoutDashboard size={16} />
          Staff
        </NavLink>
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
        <Link to="/login" className="login-link">
          Login
        </Link>
        <Link to="/signup" className="nav-cta">
          Apply
        </Link>
      </div>
    </header>
  );
}
