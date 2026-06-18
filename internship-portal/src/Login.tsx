import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, Building2, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

type LoginProps = {
  darkMode: boolean;
  onStaffLogin: (email: string) => void;
};

type LoginMode = "candidate" | "staff";

export default function Login({ darkMode, onStaffLogin }: LoginProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }

    if (mode === "staff") {
      onStaffLogin(email.trim());
      navigate("/dashboard");
      return;
    }

    navigate("/candidate");
  };

  return (
    <main className={`auth-page ${darkMode ? "dark" : "light"}`}>
      <section className="auth-card">
        <div className="auth-heading">
          <span>Welcome back</span>
          <h1>Login</h1>
          <p>Use candidate access for applications or staff access for intern management.</p>
        </div>

        <div className="auth-switch" aria-label="Login type">
          <button
            type="button"
            className={mode === "candidate" ? "active" : ""}
            onClick={() => setMode("candidate")}
          >
            <UserRound size={16} />
            Candidate
          </button>
          <button
            type="button"
            className={mode === "staff" ? "active" : ""}
            onClick={() => setMode("staff")}
          >
            <Building2 size={16} />
            Staff
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={
                mode === "staff" ? "admin@internportal.com" : "you@example.com"
              }
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          <button type="submit" className="auth-submit">
            Continue
            <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
