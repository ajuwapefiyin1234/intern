import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { DashboardPage } from "./components/DashboardPage";
import { InternFormPage } from "./components/InternFormPage";
import { MOCK_INTERNS } from "./components/types";
import type { Intern } from "./components/types";
import CandidatePortalPage from "./CandidatePortalPage";
import Footer from "./Footer";
import InternshipDetailPage from "./InternshipDetailPage";
import InternshipsPage from "./InternshipsPage";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";

type ThemeProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

function PublicLayout({ darkMode, onToggleDarkMode }: ThemeProps) {
  return (
    <div className={`public-shell ${darkMode ? "dark" : "light"}`}>
      <Navbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function App() {
  const [interns, setInterns] = useState<Intern[]>(MOCK_INTERNS);
  const [editingIntern, setEditingIntern] = useState<Intern | null>(null);
  const [nextId, setNextId] = useState(MOCK_INTERNS.length + 1);
  const [darkMode, setDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState("admin@internportal.com");

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
          <Route
            path="/candidate"
            element={<CandidatePortalPage darkMode={darkMode} />}
          />
          <Route
            path="/login"
            element={
              <Login
                darkMode={darkMode}
                onStaffLogin={(email) => setUserEmail(email)}
              />
            }
          />
          <Route path="/signup" element={<Signup darkMode={darkMode} />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <DashboardPage
              interns={interns}
              userEmail={userEmail}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              onAdd={() => setEditingIntern(null)}
              onEdit={(intern) => setEditingIntern(intern)}
              onDelete={handleDelete}
              onLogout={() => setUserEmail("")}
            />
          }
        />

        <Route
          path="/intern-form/add"
          element={
            <InternFormPage
              mode="add"
              darkMode={darkMode}
              onSave={handleAdd}
              onCancel={() => setEditingIntern(null)}
            />
          }
        />

        <Route
          path="/intern-form/edit"
          element={
            editingIntern ? (
              <InternFormPage
                mode="edit"
                darkMode={darkMode}
                intern={editingIntern}
                onSave={handleEdit}
                onCancel={() => setEditingIntern(null)}
              />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
