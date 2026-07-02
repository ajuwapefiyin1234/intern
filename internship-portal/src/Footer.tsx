import type { AuthSession } from "./App";
import "./Footer.css";

type FooterProps = {
  session: AuthSession | null;
};

export default function Footer(_props: FooterProps) {
  return (
    <footer className="site-footer">
      <div>
        <strong>D'accubin Interns</strong>
        <span>A unified home for internship discovery and program management.</span>
      </div>
    </footer>
  );
}
