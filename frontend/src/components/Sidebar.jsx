import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="topbar">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <span>🎓 Academic</span>
      </header>

      {open && <div className="overlay" onClick={close}></div>}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2>🎓 Academic</h2>
        <p className="who">{user.username} ({user.role})</p>
        <nav onClick={close}>
          <NavLink to="/" end>Dashboard</NavLink>
          {user.role !== "STUDENT" && <NavLink to="/students">Students</NavLink>}
          {user.role === "ADMIN" && <NavLink to="/courses">Courses</NavLink>}
          {user.role !== "STUDENT" && <NavLink to="/notices">Notices</NavLink>}
          {user.role !== "STUDENT" && <NavLink to="/attendance">Attendance</NavLink>}
          {user.role !== "STUDENT" && <NavLink to="/grades">Grades</NavLink>}
          {user.role === "ADMIN" && <NavLink to="/users">Users</NavLink>}
        </nav>
        <button className="logout" onClick={onLogout}>Logout</button>
      </aside>
    </>
  );
}