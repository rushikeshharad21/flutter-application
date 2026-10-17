import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="layout">
      <Sidebar user={user} onLogout={logout} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {user.role !== "STUDENT" && <Route path="/students" element={<Students />} />}
          {user.role === "ADMIN" && <Route path="/courses" element={<Courses />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}