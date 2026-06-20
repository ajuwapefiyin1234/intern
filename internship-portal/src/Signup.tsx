import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

type SignupProps = {
  darkMode: boolean;
};

export default function Signup({ darkMode }: SignupProps) {
  const navigate = useNavigate();
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

    navigate("/candidate");
  };

  return (
    <main className={`auth-page ${darkMode ? "dark" : "light"}`}>
      <section className="auth-card">
        <div className="auth-heading">
          <span>Candidate signup</span>
          <h1>Create account</h1>
          <p>Start a candidate profile for applications, updates, and program communication.</p>
        </div>

        <div className="auth-note">
          <CheckCircle2 size={17} />
          <span>Applications and status tracking live in the candidate portal.</span>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Sophia Nguyen"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
              placeholder="you@example.com"
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
