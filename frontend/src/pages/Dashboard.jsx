export default function Dashboard() {
  const stats = [
    { label: "Total Students", value: 120 },
    { label: "Total Courses", value: 8 },
    { label: "Avg Attendance", value: "86%" },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="cards">
        {stats.map((s) => (
          <div className="card" key={s.label}>
            <p>{s.label}</p>
            <h2>{s.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}