import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
          const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
      localStorage.setItem("user", JSON.stringify(res.data));
      onLogin(res.data);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-box">
      <h1>🎓 Academic Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}