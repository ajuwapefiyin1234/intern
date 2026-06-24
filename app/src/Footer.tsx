import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>D'accubin interns</strong>
        <span>A unified home for internship discovery and program management.</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/internships">Internships</Link>
        <Link to="/login?role=intern">Intern portal</Link>
        <Link to="/login?role=staff">Staff dashboard</Link>
      </nav>
    </footer>
  );
}
