import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Interns Portal</strong>
        <span>A unified home for internship discovery and program management.</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/internships">Internships</Link>
        <Link to="/candidate">Candidate portal</Link>
        <Link to="/dashboard">Staff dashboard</Link>
      </nav>
    </footer>
  );
}
