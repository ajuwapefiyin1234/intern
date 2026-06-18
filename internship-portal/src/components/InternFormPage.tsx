import { ArrowLeft, Save, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import type { Department, Intern, Status } from "./types";
import { DEPARTMENTS } from "./types";
import "./InternFormPage.css";

interface InternFormPageProps {
  mode: "add" | "edit";
  darkMode: boolean;
  intern?: Intern;
  onSave: (data: Omit<Intern, "id" | "avatar">) => void;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  email: string;
  department: Department | "";
  startDate: string;
  status: Status;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  department: "",
  startDate: "",
  status: "Active",
};

const getInitialForm = (
  mode: "add" | "edit",
  intern?: Intern
): FormData => {
  if (mode === "edit" && intern) {
    return {
      name: intern.name,
      email: intern.email,
      department: intern.department,
      startDate: intern.startDate,
      status: intern.status,
    };
  }

  return emptyForm;
};

export function InternFormPage({
  mode,
  darkMode,
  intern,
  onSave,
  onCancel,
}: InternFormPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(() => getInitialForm(mode, intern));
  const [error, setError] = useState("");

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (!form.department) {
      setError("Select a department.");
      return;
    }

    if (!form.startDate) {
      setError("Select a start date.");
      return;
    }

    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      startDate: form.startDate,
      status: form.status,
    });
    navigate("/dashboard");
  };

  const handleBack = () => {
    if (onCancel) {
      onCancel();
    }
    navigate("/dashboard");
  };

  return (
    <div className={`form-page ${darkMode ? "dark" : "light"}`}>
      <header className="form-navbar">
        <div className="form-navbar-inner">
          <img src={logo} alt="Interns Portal logo" />
          <span>Interns Portal</span>
        </div>
      </header>

      <main className="form-main">
        <button className="back-button" type="button" onClick={handleBack}>
          <ArrowLeft size={15} />
          Back to All Interns
        </button>

        <section className="intern-form-card">
          <div className="form-card-header">
            <h1>{mode === "add" ? "Add New Intern" : "Edit Intern"}</h1>
            <p>
              {mode === "add"
                ? "Fill in the details below to register a new intern."
                : "Update the intern details below."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="intern-form">
            {error && <p className="form-error">{error}</p>}

            <label>
              Full Name
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="e.g. Sophia Nguyen"
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                placeholder="e.g. sophia@company.com"
              />
            </label>

            <label>
              Department
              <select
                value={form.department}
                onChange={(event) =>
                  updateForm("department", event.target.value as Department | "")
                }
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Start Date
              <input
                type="date"
                value={form.startDate}
                onChange={(event) => updateForm("startDate", event.target.value)}
              />
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(event) =>
                  updateForm("status", event.target.value as Status)
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <div className="form-actions">
              <button className="cancel-button" type="button" onClick={handleBack}>
                <X size={16} />
                Cancel
              </button>
              <button className="save-button" type="submit">
                <Save size={16} />
                Save Intern
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
