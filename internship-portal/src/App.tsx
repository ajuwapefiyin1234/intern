import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { InternFormPage } from "./components/InternFormPage";
import { MOCK_INTERNS } from "./components/types";
import type { Intern } from "./components/types";
import Footer from "./Footer";
import InternshipDetailPage from "./InternshipDetailPage";
import InternshipsPage from "./InternshipsPage";
import InternPortalPage from "./InternPortalPage";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";
import StaffPortalPage from "./StaffPortalPage";

type ThemeProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export type AuthRole = "intern" | "staff";

export type AuthSession = {
  role: AuthRole;
  email: string;
  name: string;
  profilePicture?: string;
};

type ProtectedRouteProps = {
  role: AuthRole;
  session: AuthSession | null;
  children: React.ReactNode;
};

const SESSION_KEY = "interns-portal-session";

function readStoredSession(): AuthSession | null {
  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as AuthSession) : null;
  } catch {
    return null;
  }
}

function PublicLayout({ darkMode, onToggleDarkMode }: ThemeProps) {
  return (
    <div className={`public-shell ${darkMode ? "dark" : "light"}`}>
      <Navbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Outlet />
      <Footer />
    </div>
  );
}

function ProtectedRoute({ role, session, children }: ProtectedRouteProps) {
  const location = useLocation();

  if (!session) {
    return (
      <Navigate
        to={`/login?role=${role}&next=${encodeURIComponent(
          location.pathname
        )}`}
        replace
      />
    );
  }

  if (session.role !== role) {
    return <Navigate to={session.role === "staff" ? "/staff" : "/intern"} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const [interns, setInterns] = useState<Intern[]>(MOCK_INTERNS);
  const [editingIntern, setEditingIntern] = useState<Intern | null>(null);
  const [nextId, setNextId] = useState(MOCK_INTERNS.length + 1);
  const [darkMode, setDarkMode] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(() =>
    readStoredSession()
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const createAvatar = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleLogin = (role: AuthRole, email: string) => {
    const nextSession: AuthSession = {
      role,
      email,
      name: role === "staff" ? "Admin" : "Marcus",
    };
    setSession(nextSession);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
  };

  const handleLogout = () => {
    setSession(null);
    window.localStorage.removeItem(SESSION_KEY);
  };

  const handleAdd = (data: Omit<Intern, "id" | "avatar">) => {
    setInterns((currentInterns) => [
      ...currentInterns,
      { ...data, id: nextId, avatar: createAvatar(data.name) },
    ]);
    setNextId((currentId) => currentId + 1);
  };

  const handleEdit = (data: Omit<Intern, "id" | "avatar">) => {
    if (!editingIntern) return;

    setInterns((currentInterns) =>
      currentInterns.map((intern) =>
        intern.id === editingIntern.id
          ? { ...intern, ...data, avatar: createAvatar(data.name) }
          : intern
      )
    );
    setEditingIntern(null);
  };

  const handleDelete = (id: number) => {
    setInterns((currentInterns) =>
      currentInterns.filter((intern) => intern.id !== id)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PublicLayout
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          }
        >
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route
            path="/internships"
            element={<InternshipsPage darkMode={darkMode} />}
          />
          <Route
            path="/internships/:id"
            element={<InternshipDetailPage darkMode={darkMode} />}
          />
          <Route path="/candidate" element={<Navigate to="/intern" replace />} />
          <Route
            path="/login"
            element={<Login darkMode={darkMode} onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup darkMode={darkMode} onSignup={handleLogin} />}
          />
        </Route>

        <Route
          path="/intern"
          element={
            <ProtectedRoute role="intern" session={session}>
              <InternPortalPage
                session={session}
                view="overview"
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intern/tasks"
          element={
            <ProtectedRoute role="intern" session={session}>
              <InternPortalPage
                session={session}
                view="tasks"
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intern/announcements"
          element={
            <ProtectedRoute role="intern" session={session}>
              <InternPortalPage
                session={session}
                view="announcements"
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute role="staff" session={session}>
              <StaffPortalPage
                interns={interns}
                session={session}
                view="overview"
                onAdd={() => setEditingIntern(null)}
                onEdit={(intern) => setEditingIntern(intern)}
                onDelete={handleDelete}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/interns"
          element={
            <ProtectedRoute role="staff" session={session}>
              <StaffPortalPage
                interns={interns}
                session={session}
                view="interns"
                onAdd={() => setEditingIntern(null)}
                onEdit={(intern) => setEditingIntern(intern)}
                onDelete={handleDelete}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/announcements"
          element={
            <ProtectedRoute role="staff" session={session}>
              <StaffPortalPage
                interns={interns}
                session={session}
                view="announcements"
                onAdd={() => setEditingIntern(null)}
                onEdit={(intern) => setEditingIntern(intern)}
                onDelete={handleDelete}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/reports"
          element={
            <ProtectedRoute role="staff" session={session}>
              <StaffPortalPage
                interns={interns}
                session={session}
                view="reports"
                onAdd={() => setEditingIntern(null)}
                onEdit={(intern) => setEditingIntern(intern)}
                onDelete={handleDelete}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="staff" session={session}>
              <Navigate to="/staff" replace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intern-form/add"
          element={
            <ProtectedRoute role="staff" session={session}>
              <InternFormPage
                mode="add"
                darkMode={darkMode}
                onSave={handleAdd}
                onCancel={() => setEditingIntern(null)}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intern-form/edit"
          element={
            <ProtectedRoute role="staff" session={session}>
              {editingIntern ? (
                <InternFormPage
                  mode="edit"
                  darkMode={darkMode}
                  intern={editingIntern}
                  onSave={handleEdit}
                  onCancel={() => setEditingIntern(null)}
                />
              ) : (
                <Navigate to="/staff/interns" replace />
              )}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
