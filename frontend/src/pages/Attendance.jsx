import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config"

const API = `${BASE_URL}/api/attendance`;

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [studentUsername, setStudentUsername] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState("PRESENT");
  const [error, setError] = useState("");

  const load = () =>
    axios
      .get(API)
      .then((res) => setRecords(res.data))
      .catch(() => setError("Attendance मिळाली नाही. Backend चालू आहे का?"));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!studentUsername.trim() || !subject.trim()) return;
    await axios.post(API, {
      studentUsername: studentUsername.trim(),
      subject,
      date,
      status,
    });
    setSubject("");
    load();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div>
      <h1>Attendance</h1>
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
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />{" "}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PRESENT">PRESENT</option>
          <option value="ABSENT">ABSENT</option>
        </select>{" "}
        <button type="submit">Add</button>
      </form>
<div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.studentUsername}</td>
              <td>{r.subject}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
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