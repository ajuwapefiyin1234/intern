import { useState } from "react";
import { Mail, Phone, Building2, Calendar, Shield } from "lucide-react";
import { MOCK_PROFILE } from "../components/types";
import type { UserProfile } from "../components/types";

type ProfilePageProps = {
  role: "intern" | "staff";
};

export default function ProfilePage({ role }: ProfilePageProps) {
  const [profile] = useState<UserProfile>(MOCK_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="portal-main">
      <div className="portal-page-heading">
        <div>
          <h1>Profile Settings</h1>
          <p>Manage your account information and preferences</p>
        </div>
      </div>

      <section className="portal-two-column" style={{ marginTop: 24 }}>
        <article className="portal-card" style={{ padding: 28 }}>
          <div className="portal-card-header">
            <h2>Personal Information</h2>
            <button className="edit-task-button" type="button" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            <div className="staff-intern-cell" style={{ justifyContent: "flex-start" }}>
              <span style={{ width: 48, height: 48, fontSize: "1.1rem" }}>{profile.name.split(" ").map((w) => w[0]).join("")}</span>
              <div>
                <strong>{profile.name}</strong>
                <span>{profile.email}</span>
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <Mail size={16} /> {profile.email}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <Phone size={16} /> {profile.phone || "Not provided"}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <Building2 size={16} /> {profile.department || "Not assigned"}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <Calendar size={16} /> Started {profile.startDate || "N/A"}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <Shield size={16} /> Role: {profile.role === "staff" ? "HR Staff" : "Intern"}
              </label>
            </div>

            {profile.bio && (
              <div style={{ marginTop: 8, padding: 16, borderRadius: 8, background: "var(--surface-muted)" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.6 }}>{profile.bio}</p>
              </div>
            )}
          </div>
        </article>

        <article className="portal-card" style={{ padding: 28 }}>
          <div className="portal-card-header">
            <h2>Account Security</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <button className="edit-task-button" type="button" style={{ justifyContent: "center" }}>
              Change Password
            </button>
            <button className="edit-task-button" type="button" style={{ justifyContent: "center" }}>
              Two-Factor Authentication
            </button>
            <button className="edit-task-button" type="button" style={{ justifyContent: "center" }}>
              Notification Preferences
            </button>
          </div>
        </article>
      </section>

      {role === "intern" && profile.supervisorName && (
        <section className="portal-card" style={{ marginTop: 20, padding: 24 }}>
          <div className="portal-card-header">
            <h2>Assigned Supervisor</h2>
          </div>
          <div className="staff-intern-cell" style={{ marginTop: 12, justifyContent: "flex-start" }}>
            <span>{profile.supervisorName?.split(" ").map((w) => w[0]).join("")}</span>
            <div>
              <strong>{profile.supervisorName}</strong>
              <span>Your point of contact for the program</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
