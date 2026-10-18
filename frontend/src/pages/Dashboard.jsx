import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stats")
      .then((res) => setStats(res.data))
      .catch(() => setError("Stats मिळाले नाहीत. Backend चालू आहे का?"));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return <p>Loading...</p>;

  const cards = [
    { label: "Total Students", value: stats.totalStudents },
    { label: "Total Courses", value: stats.totalCourses },
    { label: "Avg Attendance", value: stats.avgAttendance + "%" },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="cards">
        {cards.map((s) => (
          <div className="card" key={s.label}>
            <p>{s.label}</p>
            <h2>{s.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}