import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>🎓 Academic Admin</h2>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>
    </aside>
  );
}