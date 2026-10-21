import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const API = `${BASE_URL}/api/students`;

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", roll: "", course: "" });

  const loadStudents = () =>
    axios.get(API).then((res) => setStudents(res.data));

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = async (e) => {
    e.preventDefault();
    if (!form.name || !form.roll) return;
    await axios.post(API, form);
    setForm({ name: "", roll: "", course: "" });
    loadStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadStudents();
  };

  return (
    <div>
      <h1>Students</h1>

      <form className="form" onSubmit={addStudent}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="roll" placeholder="Roll No" value={form.roll} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>
<div className="table-wrap">
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
    </div>
  );
}