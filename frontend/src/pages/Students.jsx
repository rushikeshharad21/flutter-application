import { useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Amit Patil", roll: "101", course: "Computer" },
    { id: 2, name: "Sneha Joshi", roll: "102", course: "IT" },
  ]);
  const [form, setForm] = useState({ name: "", roll: "", course: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = (e) => {
    e.preventDefault();
    if (!form.name || !form.roll) return;
    setStudents([...students, { id: Date.now(), ...form }]);
    setForm({ name: "", roll: "", course: "" });
  };

  const deleteStudent = (id) =>
    setStudents(students.filter((s) => s.id !== id));

  return (
    <div>
      <h1>Students</h1>

      <form className="form" onSubmit={addStudent}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="roll" placeholder="Roll No" value={form.roll} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>

      <table>
        <thead>
          <tr><th>Roll</th><th>Name</th><th>Course</th><th>Action</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.roll}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td><button onClick={() => deleteStudent(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}