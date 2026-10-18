import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/notices";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const load = () =>
    axios
      .get(API)
      .then((res) => setNotices(res.data))
      .catch(() => setError("Notices मिळाल्या नाहीत. Backend चालू आहे का?"));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    await axios.post(API, {
      title,
      message,
      date: new Date().toISOString().slice(0, 10),
      postedBy: user.username || "admin",
    });
    setTitle("");
    setMessage("");
    load();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div>
      <h1>Notices</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={add} style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: 300 }}
        />{" "}
        <button type="submit">Add Notice</button>
      </form>

      {notices.map((n) => (
        <div className="card" key={n.id} style={{ marginBottom: 10 }}>
          <h3>{n.title}</h3>
          <p>{n.message}</p>
          <small>
            {n.date} • {n.postedBy}
          </small>
          <div>
            <button onClick={() => remove(n.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}