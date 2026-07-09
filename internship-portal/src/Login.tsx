import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { AuthRole, AuthSession } from "./App";
import { DEPARTMENTS } from "./components/types";
import type { DepartmentName } from "./components/types";
import logo from "./assets/Logo.svg";
import "./Auth.css";

type LoginMode = "intern" | "hr" | "supervisor";

type LoginProps = {
  darkMode: boolean;
  session: AuthSession | null;
  onLogout: () => void;
  onLogin: (
    role: AuthRole,
    email: string,
    name?: string,
    staffRole?: "hr" | "supervisor",
    department?: DepartmentName
  ) => void;
};

const demoAccounts: Record<LoginMode, { email: string; password: string }> = {
  intern: {
    email: "marcus.chen@intern.co",
    password: "intern123",
  },
  hr: {
    email: "admin@company.com",
    password: "password",
  },
  supervisor: {
    email: "supervisor@company.com",
    password: "password",
  },
};

type Metric = {
  icon: typeof Users;
  title: string;
  description: string;
};

const internMetrics: Metric[] = [
  { icon: CheckCircle2, title: "View your tasks", description: "See everything assigned to you." },
  { icon: TrendingUp, title: "Track your progress", description: "Watch your completion rate climb." },
  { icon: Bell, title: "Stay connected", description: "Get announcements as they're posted." },
  { icon: Building2, title: "Across 5 different departments", description: "One account, wherever you're placed." },
];

const hrMetrics: Metric[] = [
  { icon: Users, title: "View every intern, company-wide", description: "See everyone across every department." },
  { icon: Building2, title: "Manage departments & supervisors", description: "Full administrative control." },
  { icon: TrendingUp, title: "Track team-wide progress", description: "Monitor performance at a glance." },
  { icon: ShieldCheck, title: "Full program oversight", description: "Nothing is out of view." },
];

const supervisorMetrics: Metric[] = [
  { icon: Users, title: "View interns in your department only", description: "See exactly who reports to you \u2014 no noise." },
  { icon: CheckCircle2, title: "Track their progress", description: "Live task logs, progress bars, and blockers." },
  { icon: ShieldCheck, title: "Give feedback & evaluations", description: "Score performance and leave structured notes." },
  { icon: Building2, title: "Focused on your own team", description: "Department-scoped view keeps things relevant." },
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

function initialModeFromParam(param: string | null): LoginMode {
  if (param === "supervisor") return "supervisor";
  if (param === "hr" || param === "staff") return "hr";
  return "intern";
}

export default function Login({ darkMode, session, onLogout, onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get("next");
  const [mode, setMode] = useState<LoginMode>(() =>
    initialModeFromParam(searchParams.get("role"))
  );
  const [email, setEmail] = useState(demoAccounts[mode].email);
  const [password, setPassword] = useState(demoAccounts[mode].password);
  const [department, setDepartment] = useState<DepartmentName>("Technology");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotNotice, setForgotNotice] = useState(false);

  // Landing on the login screen — including via the browser's back button
  // after being logged in — always ends any existing session. Otherwise a
  // stale session would still be valid in the background, and the nav bar's
  // "Staff Portal"/"My Portal" link would let someone straight back in
  // without actually re-entering credentials.
  useEffect(() => {
    if (session) {
      onLogout();
    }
    // Only ever run once per mount of the login screen, not on every session
    // change (that would immediately log out someone who just submitted the
    // form on this very page).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const role: AuthRole = mode === "intern" ? "intern" : "staff";
  const staffRole: "hr" | "supervisor" | undefined =
    mode === "hr" ? "hr" : mode === "supervisor" ? "supervisor" : undefined;

  const destination = useMemo(() => {
    if (nextPath) return nextPath;
    return role === "staff" ? "/staff" : "/intern";
  }, [role, nextPath]);

  const metrics =
    mode === "hr" ? hrMetrics : mode === "supervisor" ? supervisorMetrics : internMetrics;

  const switchMode = (nextMode: LoginMode) => {
    setMode(nextMode);
    setEmail(demoAccounts[nextMode].email);
    setPassword(demoAccounts[nextMode].password);
    setError("");
    setForgotNotice(false);
  };

  const completeLogin = (loginEmail = email) => {
    onLogin(
      role,
      loginEmail.trim() || demoAccounts[mode].email,
      undefined,
      staffRole,
      mode === "supervisor" ? department : undefined
    );
    navigate(destination, { replace: true });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }

    const account = demoAccounts[mode];
    const emailMatches = email.trim().toLowerCase() === account.email.toLowerCase();
    const passwordMatches = password === account.password;

    if (!emailMatches || !passwordMatches) {
      setError(
        "Invalid email or password. Use the demo credentials shown below."
      );
      return;
    }

    completeLogin();
  };

  const handleGoogleLogin = () => {
    const googleEmail =
      mode === "intern"
        ? "marcus.google@intern.co"
        : mode === "hr"
        ? "admin.google@company.com"
        : "supervisor.google@company.com";
    completeLogin(googleEmail);
  };

  const fillDemoCredentials = () => {
    setEmail(demoAccounts[mode].email);
    setPassword(demoAccounts[mode].password);
    setError("");
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

        <h1>Welcome back.</h1>
        <p>
          Sign in to manage your internship journey, track work, view notices,
          and stay connected with your team.
        </p>

        <div className="auth-metrics">
          {metrics.map((item) => (
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
          <div className="auth-switch" aria-label="Login type">
            <button
              type="button"
              className={mode === "intern" ? "active" : ""}
              onClick={() => switchMode("intern")}
            >
              <UserRound size={16} />
              Intern
            </button>
            <button
              type="button"
              className={mode === "hr" ? "active" : ""}
              onClick={() => switchMode("hr")}
            >
              <ShieldCheck size={16} />
              HR
            </button>
            <button
              type="button"
              className={mode === "supervisor" ? "active" : ""}
              onClick={() => switchMode("supervisor")}
            >
              <Building2 size={16} />
              Supervisor
            </button>
          </div>

          <div className="auth-heading">
            <h1>
              {mode === "hr"
                ? "HR Sign In"
                : mode === "supervisor"
                ? "Supervisor Sign In"
                : "Intern Sign In"}
            </h1>
            <p>
              {mode === "hr"
                ? "Full access to every intern, department, and supervisor."
                : mode === "supervisor"
                ? "Access your own department's interns, attendance, and evaluations."
                : "Track your tasks, view announcements, and stay on top of your internship journey."}
            </p>
          </div>

          <button
            className="google-button"
            type="button"
            onClick={handleGoogleLogin}
          >
            <GoogleLogo />
            Continue with Google
          </button>

          <div className="auth-divider">or continue with email</div>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  mode === "intern" ? "yourname@intern.co" : "yourname@company.com"
                }
              />
            </label>

            <label>
              Password
              <span className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>

            {mode === "supervisor" && (
              <label>
                Department you supervise
                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value as DepartmentName)}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button type="submit" className="auth-submit">
              Login
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="auth-helper-row">
            <button
              type="button"
              className="auth-link-button"
              onClick={() => setForgotNotice(true)}
            >
              Forgot password?
            </button>
            <button type="button" onClick={fillDemoCredentials}>
              Fill demo
            </button>
          </div>
          {forgotNotice && (
            <p className="auth-inline-note">
              Password reset isn't available in this demo \u2014 use the credentials below.
            </p>
          )}

          <p className="auth-signup-line">
            New intern? <Link to="/signup">Create intern account</Link>{" "}
            <span className="auth-signup-hint">· All demo credentials below</span>
          </p>

          <div className="auth-demo-box">
            <span className="auth-demo-label">Demo ({mode})</span>
            <span className="auth-demo-value">
              {demoAccounts[mode].email} / {demoAccounts[mode].password}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
