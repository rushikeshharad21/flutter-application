import { NavLink } from "react-router-dom";

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <h2>🎓 Academic</h2>
      <p className="who">{user.username} ({user.role})</p>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        {user.role !== "STUDENT" && <NavLink to="/students">Students</NavLink>}
        {user.role === "ADMIN" && <NavLink to="/courses">Courses</NavLink>}
      </nav>
      <button className="logout" onClick={onLogout}>Logout</button>
    </aside>
  );
}