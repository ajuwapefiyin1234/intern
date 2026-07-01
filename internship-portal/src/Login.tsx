import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, Eye, UserRound } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { AuthRole } from "./App";
import logo from "./assets/Logo.svg";
import "./Auth.css";

type LoginProps = {
  darkMode: boolean;
  onLogin: (role: AuthRole, email: string) => void;
};

const demoAccounts = {
  intern: {
    email: "marcus.chen@intern.co",
    password: "intern123",
  },
  staff: {
    email: "admin@company.com",
    password: "password",
  },
};

const internMetrics = [
  "View your tasks",
  "Track your progress",
  "Stay connected",
  "Across 5 different departments",
];

const staffMetrics = [
  "View active interns",
  "Track team progress",
  "Manage your team",
  "Across 5 different departments",
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

export default function Login({ darkMode, onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "staff" ? "staff" : "intern";
  const nextPath = searchParams.get("next");
  const [mode, setMode] = useState<AuthRole>(initialRole);
  const [email, setEmail] = useState(demoAccounts[initialRole].email);
  const [password, setPassword] = useState(demoAccounts[initialRole].password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const destination = useMemo(() => {
    if (nextPath) return nextPath;
    return mode === "staff" ? "/staff" : "/intern";
  }, [mode, nextPath]);

  const metrics = mode === "staff" ? staffMetrics : internMetrics;

  const switchMode = (role: AuthRole) => {
    setMode(role);
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].password);
    setError("");
  };

  const completeLogin = (loginEmail = email) => {
    onLogin(mode, loginEmail.trim() || demoAccounts[mode].email);
    navigate(destination, { replace: true });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }

    completeLogin();
  };

  const handleGoogleLogin = () => {
    completeLogin(
      mode === "staff" ? "admin.google@company.com" : "marcus.google@intern.co"
    );
  };

  return (
    <main className={`auth-page upgraded-auth ${darkMode ? "dark" : "light"}`}>
      <section className="auth-visual-panel">
        {/* Floating orbs */}
        <div className="orb-1" aria-hidden="true" />
        <div className="orb-2" aria-hidden="true" />

        <Link to="/" className="auth-back-link">
          Back to home
        </Link>
        <div className="auth-mark">
          <img src={logo} alt="" />
        </div>
        <h1>Welcome back.</h1>
        <p>
          Sign in to manage your internship journey, track work, view notices,
          and stay connected with your team.
        </p>
        <div className="auth-metrics text-only">
          {metrics.map((item) => (
            <div key={item}>
              <strong>{item}</strong>
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
              Intern Login
            </button>
            <button
              type="button"
              className={mode === "staff" ? "active" : ""}
              onClick={() => switchMode("staff")}
            >
              <UserRound size={16} />
              HR / Staff Login
            </button>
          </div>

          <div className="auth-heading">
            <h1>{mode === "staff" ? "Staff Sign In" : "Intern Sign In"}</h1>
            <p>
              {mode === "staff"
                ? "Access HR tools and intern management."
                : "Access your intern dashboard and task tracker."}
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
                  mode === "staff" ? "yourname@company.com" : "yourname@intern.co"
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
                <Eye
                  size={16}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </label>

            <button type="submit" className="auth-submit">
              Login
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="auth-helper-row">
            <Link to="/signup">Create intern account</Link>
            <button
              type="button"
              onClick={() => {
                setEmail(demoAccounts[mode].email);
                setPassword(demoAccounts[mode].password);
              }}
            >
              Fill demo credentials
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
