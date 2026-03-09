import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveAdminAuth } from "../services/authservice";

function parseJwt(token) {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@hirenow.com", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    setErr("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const token = await loginUser(form); // ✅ same /auth/login
      const payload = parseJwt(token);

      if (payload?.role !== "ROLE_ADMIN") {
        setErr("You are not an Admin.");
        setLoading(false);
        return;
      }

      saveAdminAuth(token);
      navigate("/admin/dashboard");
    } catch (e2) {
      setErr("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <form
        onSubmit={onSubmit}
        style={{
          width: "min(420px, 100%)",
          background: "#0b0f14",
          border: "1px solid rgba(103,232,249,.25)",
          borderRadius: 16,
          padding: 18,
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: 10 }}>Admin Login</h2>

        {err && (
          <div style={{ background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.35)", padding: 10, borderRadius: 12, marginBottom: 10 }}>
            {err}
          </div>
        )}

        <label style={{ display: "block", marginBottom: 6 }}>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          type="email"
          required
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(103,232,249,.25)", background: "#05070b", color: "white", marginBottom: 10 }}
        />

        <label style={{ display: "block", marginBottom: 6 }}>Password</label>
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          type="password"
          required
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(103,232,249,.25)", background: "#05070b", color: "white", marginBottom: 12 }}
        />

        <button
          disabled={loading}
          style={{
            width: "100%",
            padding: 11,
            borderRadius: 12,
            border: "1px solid rgba(103,232,249,.35)",
            background: "rgba(103,232,249,.12)",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
