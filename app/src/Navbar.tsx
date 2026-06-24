import { BriefcaseBusiness, LayoutDashboard, LogIn, Moon, Sun, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "./assets/Logo.png";
import "./Navbar.css";

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function Navbar({ darkMode, onToggleDarkMode }: NavbarProps) {
  return (
    <header className="site-header">
      <Link to="/" className="site-brand" aria-label="D'accubin interns home">
        <img src={logo} alt="" />
        <span>D'accubin interns</span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink to="/internships">Internships</NavLink>
        <NavLink to="/login?role=intern">
          <UserRound size={15} />
          Intern Portal
        </NavLink>
        <NavLink to="/login?role=staff">
          <LayoutDashboard size={15} />
          Staff Portal
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
          <LogIn size={15} />
          Login
        </Link>
        <Link to="/signup" className="nav-cta">
          <BriefcaseBusiness size={16} />
          Apply
        </Link>
      </div>
    </header>
  );
}
