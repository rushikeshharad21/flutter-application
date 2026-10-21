import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const API = `${BASE_URL}/api/grades`;

export default function Grades() {
  const [records, setRecords] = useState([]);
  const [studentUsername, setStudentUsername] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState(100);
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    axios
      .get(API)
      .then((res) => setRecords(res.data))
      .catch(() => setError("Grades मिळाले नाहीत. Backend चालू आहे का?"));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!studentUsername.trim() || !subject.trim() || marks === "") return;
    await axios.post(API, {
      studentUsername: studentUsername.trim(),
      subject,
      marks: Number(marks),
      maxMarks: Number(maxMarks),
      grade,
    });
    setSubject("");
    setMarks("");
    setGrade("");
    load();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div>
      <h1>Grades</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={add} style={{ marginBottom: 20 }}>
        <input
          placeholder="Student username (उदा. rushi)"
          value={studentUsername}
          onChange={(e) => setStudentUsername(e.target.value)}
        />{" "}
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          style={{ width: 80 }}
        />{" "}
        <input
          type="number"
          placeholder="Max"
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
          style={{ width: 80 }}
        />{" "}
        <input
          placeholder="Grade (A, B+)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{ width: 100 }}
        />{" "}
        <button type="submit">Add</button>
      </form>
<div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.studentUsername}</td>
              <td>{r.subject}</td>
              <td>
                {r.marks} / {r.maxMarks}
              </td>
              <td>{r.grade}</td>
              <td>
                <button onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}