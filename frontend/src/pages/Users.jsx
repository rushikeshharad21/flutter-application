import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function Users() {
  const [form, setForm] = useState({ username: "", password: "", role: "STUDENT" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addUser = async (e) => {
    e.preventDefault();
    setMsg("");

    const username = form.username.trim();
    if (!username || !form.password) {
      setIsError(true);
      setMsg("Username आणि password दोन्ही भरा");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        password: form.password,
        role: form.role,
      });
      setIsError(false);
      setMsg(`User बनला: ${res.data.username} (${res.data.role})`);
      setForm({ username: "", password: "", role: form.role });
    } catch (err) {
      setIsError(true);
      setMsg("User बनला नाही. हा username आधीच असू शकतो.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Users (Login Accounts)</h1>
      <form className="form" onSubmit={addUser}>
        <input
          name="username"
          placeholder="Username (उदा. amit)"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Create User"}
        </button>
      </form>
      {msg && <p className={isError ? "error" : ""}>{msg}</p>}
      <p style={{ marginTop: 16, color: "#64748b", fontSize: 14 }}>
        
      </p>
    </div>
  );
}