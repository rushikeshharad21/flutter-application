import { useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Data Structures", code: "CS201" },
    { id: 2, name: "Web Development", code: "CS301" },
  ]);
  const [form, setForm] = useState({ name: "", code: "" });

  const addCourse = (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;
    setCourses([...courses, { id: Date.now(), ...form }]);
    setForm({ name: "", code: "" });
  };

  const deleteCourse = (id) =>
    setCourses(courses.filter((c) => c.id !== id));

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
  );
}