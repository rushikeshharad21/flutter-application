import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const API = `${BASE_URL}/api/courses`;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ name: "", code: "" });

  const loadCourses = () =>
    axios.get(API).then((res) => setCourses(res.data));

  useEffect(() => {
    loadCourses();
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;
    await axios.post(API, form);
    setForm({ name: "", code: "" });
    loadCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadCourses();
  };

  return (
    <div>
      <h1>Courses</h1>

      <form className="form" onSubmit={addCourse}>
        <input
          placeholder="Course Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <button type="submit">Add Course</button>
      </form>
<div className="table-wrap">
      <table>
        <thead>
          <tr><th>Code</th><th>Name</th><th>Action</th></tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td><button onClick={() => deleteCourse(c.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}