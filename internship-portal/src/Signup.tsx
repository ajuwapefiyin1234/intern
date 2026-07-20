import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, Bell, Building2, CheckCircle2, TrendingUp } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { AuthRole } from "./App";
import logo from "./assets/Logo.svg";
import "./Auth.css";

type SignupProps = {
  darkMode: boolean;
  onSignup: (role: AuthRole, email: string, name?: string) => void;
};

type Metric = {
  icon: typeof CheckCircle2;
  title: string;
  description: string;
};

const signupMetrics: Metric[] = [
  { icon: CheckCircle2, title: "View your tasks", description: "See everything assigned to you." },
  { icon: TrendingUp, title: "Track your progress", description: "Watch your completion rate climb." },
  { icon: Bell, title: "Stay connected", description: "Get announcements as they're posted." },
  { icon: Building2, title: "Across 5 different departments", description: "One account, wherever you're placed." },
];

// Google "G" SVG logo
function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function Signup({ darkMode, onSignup }: SignupProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
  };

  const finishSignup = (email: string, name?: string) => {
    const nextPath = searchParams.get("next");
    const signupDestination =
      nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")
        ? nextPath
        : "/internships";

    onSignup("intern", email, name);
    navigate(signupDestination, { replace: true });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError("Enter your name and email.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    finishSignup(form.email.trim(), form.name.trim());
  };

  return (
    <main className={`auth-page upgraded-auth ${darkMode ? "dark" : "light"}`}>
      <section className="auth-visual-panel">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, c) => (
            <div
              key={`${r}-${c}`}
              className="auth-grid-tile"
              style={{ left: `${c * 22}%`, top: `${r * 22}%` }}
            />
          ))
        )}
        <div className="auth-glow-top" aria-hidden="true" />
        <div className="auth-glow-bottom" aria-hidden="true" />

        <Link to="/" className="auth-back-link">
          Back to home
        </Link>

        <div className="auth-brand-lockup">
          <span className="auth-brand-icon">
            <img src={logo} alt="" />
          </span>
          <strong>D'accubin Interns</strong>
        </div>

        <h1>Create your portal.</h1>
        <p>
          Join the internship workspace to track applications, tasks,
          announcements, and program progress.
        </p>

        <div className="auth-metrics">
          {signupMetrics.map((item) => (
            <div key={item.title}>
              <span className="auth-metric-icon">
                <item.icon size={16} />
              </span>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-card upgraded">
          <div className="auth-heading">
            <h1>Intern Sign Up</h1>
            <p>Start a candidate profile for applications and program updates.</p>
          </div>

          <button
            className="google-button"
            type="button"
            onClick={() => finishSignup("google.intern@intern.co")}
          >
            <GoogleLogo />
            Continue with Google
          </button>

          <div className="auth-divider">or sign up with email</div>

          <div className="auth-note">
            <span>Applications and status tracking live in the intern portal.</span>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Full name
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Marcus Chen"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                placeholder="you@intern.co"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateForm("password", event.target.value)}
                placeholder="Create a password"
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) =>
                  updateForm("confirmPassword", event.target.value)
                }
                placeholder="Confirm your password"
              />
            </label>

            <button type="submit" className="auth-submit">
              Create account
              <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login?role=intern">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
