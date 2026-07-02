import { Link } from "react-router-dom";
import type { AuthSession } from "./App";
import "./Footer.css";

type FooterProps = {
  session: AuthSession | null;
};

export default function Footer({ session }: FooterProps) {
  const portalPath = session?.role === "staff" ? "/staff" : "/intern";

  return (
    <footer className="site-footer">
      <div>
        <strong>D'accubin Interns</strong>
        <span>A unified home for internship discovery and program management.</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/internships">Internships</Link>
        {session ? (
          <Link to={portalPath}>
            {session.role === "staff" ? "Staff portal" : "My portal"}
          </Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Apply</Link>
          </>
        )}
      </nav>
    </footer>
  );
}
