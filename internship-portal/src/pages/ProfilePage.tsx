import { useState } from "react";
import { Mail, Phone, Building2, Calendar, Shield, Camera } from "lucide-react";
import { MOCK_PROFILE } from "../components/types";
import type { AuthSession } from "../App";
import { readAndValidateProfilePicture } from "../lib/profilePicture";

type ProfilePageProps = {
  role: "intern" | "staff";
  session: AuthSession | null;
  onUpdateProfile: (updates: Partial<AuthSession>) => void;
};

export default function ProfilePage({ role, session, onUpdateProfile }: ProfilePageProps) {
  // Real identity (name/email/phone/bio) comes from the logged-in session.
  // Department/start date/supervisor aren't collected during signup yet, so
  // those still fall back to demo placeholder context for now.
  const name = session?.name ?? MOCK_PROFILE.name;
  const email = session?.email ?? MOCK_PROFILE.email;

  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftPhone, setDraftPhone] = useState(session?.phone ?? MOCK_PROFILE.phone ?? "");
  const [draftBio, setDraftBio] = useState(session?.bio ?? MOCK_PROFILE.bio ?? "");
  const [uploadError, setUploadError] = useState("");

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdateProfile({
        name: draftName.trim() || name,
        phone: draftPhone.trim(),
        bio: draftBio.trim(),
      });
    } else {
      setDraftName(name);
      setDraftPhone(session?.phone ?? MOCK_PROFILE.phone ?? "");
      setDraftBio(session?.bio ?? MOCK_PROFILE.bio ?? "");
    }
    setIsEditing((current) => !current);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    readAndValidateProfilePicture(file, {
      onSuccess: (dataUrl) => onUpdateProfile({ profilePicture: dataUrl }),
      onError: (message) => setUploadError(message),
    });
  };

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
            <button className="edit-task-button" type="button" onClick={handleEditToggle}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            <div className="staff-intern-cell" style={{ justifyContent: "flex-start" }}>
              <label style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />
                {session?.profilePicture ? (
                  <img
                    src={session.profilePicture}
                    alt={name}
                    style={{ width: 48, height: 48, borderRadius: "999px", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <span style={{ width: 48, height: 48, fontSize: "1.1rem" }}>{initials}</span>
                )}
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 20,
                    height: 20,
                    borderRadius: "999px",
                    background: "var(--accent)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera size={11} />
                </span>
              </label>
              <div>
                <strong>{name}</strong>
                <span>{email}</span>
              </div>
            </div>
            {uploadError && (
              <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 600, color: "#df3246" }}>
                {uploadError}
              </p>
            )}

            <div style={{ display: "grid", gap: 12 }}>
              {isEditing ? (
                <>
                  <label style={{ display: "grid", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Full name
                    <input
                      value={draftName}
                      onChange={(event) => setDraftName(event.target.value)}
                      placeholder="Your full name"
                    />
                  </label>
                  <label style={{ display: "grid", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Phone
                    <input
                      value={draftPhone}
                      onChange={(event) => setDraftPhone(event.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </label>
                  <label style={{ display: "grid", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Bio
                    <textarea
                      value={draftBio}
                      onChange={(event) => setDraftBio(event.target.value)}
                      placeholder="A short bio about you"
                      rows={3}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    <Mail size={16} /> {email}
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    <Phone size={16} /> {session?.phone || MOCK_PROFILE.phone || "Not provided"}
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    <Building2 size={16} /> {MOCK_PROFILE.department || "Not assigned"}
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    <Calendar size={16} /> Started {MOCK_PROFILE.startDate || "N/A"}
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    <Shield size={16} /> Role: {role === "staff" ? "HR Staff" : "Intern"}
                  </label>
                </>
              )}
            </div>

            {!isEditing && (session?.bio || MOCK_PROFILE.bio) && (
              <div style={{ marginTop: 8, padding: 16, borderRadius: 8, background: "var(--surface-muted)" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.6 }}>
                  {session?.bio || MOCK_PROFILE.bio}
                </p>
              </div>
            )}
          </div>
        </article>

        <article className="portal-card" style={{ padding: 28 }}>
          <div className="portal-card-header">
            <h2>Account Security</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <button
              className="edit-task-button"
              type="button"
              disabled
              title="Not available in this demo"
              style={{ justifyContent: "center", opacity: 0.55, cursor: "not-allowed" }}
            >
              Change Password
            </button>
            <button
              className="edit-task-button"
              type="button"
              disabled
              title="Not available in this demo"
              style={{ justifyContent: "center", opacity: 0.55, cursor: "not-allowed" }}
            >
              Two-Factor Authentication
            </button>
            <button
              className="edit-task-button"
              type="button"
              disabled
              title="Not available in this demo"
              style={{ justifyContent: "center", opacity: 0.55, cursor: "not-allowed" }}
            >
              Notification Preferences
            </button>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
              These settings aren't wired up yet in this demo.
            </p>
          </div>
        </article>
      </section>

      {role === "intern" && MOCK_PROFILE.supervisorName && (
        <section className="portal-card" style={{ marginTop: 20, padding: 24 }}>
          <div className="portal-card-header">
            <h2>Assigned Supervisor</h2>
          </div>
          <div className="staff-intern-cell" style={{ marginTop: 12, justifyContent: "flex-start" }}>
            <span>{MOCK_PROFILE.supervisorName?.split(" ").map((w) => w[0]).join("")}</span>
            <div>
              <strong>{MOCK_PROFILE.supervisorName}</strong>
              <span>Your point of contact for the program</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
