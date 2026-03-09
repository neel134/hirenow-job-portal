import React, { useState } from "react";
import { employerLogin } from "../services/employerAuthService";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "./EmployerLogin.css";

export default function EmployerLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
      await employerLogin(form);
      nav("/employer/dashboard");
    } catch {
      setErr("Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emp-login-page">
      <div className="emp-glow emp-glow-1" />
      <div className="emp-glow emp-glow-2" />

      <div className="emp-login-card">
        <div className="emp-brand">
          <div className="emp-logo">H</div>
          <div>
            <div className="emp-brand-title">HireNow</div>
            <div className="emp-brand-sub">Employer Portal</div>
          </div>
        </div>

        <h2 className="emp-heading">Welcome back</h2>
        <p className="emp-subheading">
          Log in to manage jobs, applicants, and company profile.
        </p>

        {err && <div className="emp-error">{err}</div>}

        <form onSubmit={onSubmit} className="emp-form">
          <label>Email</label>
          <div className="emp-input-wrap">
            <FiMail />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="company@email.com"
            />
          </div>

          <label>Password</label>
          <div className="emp-input-wrap">
            <FiLock />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter password"
            />
          </div>

          <button className="emp-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            <FiArrowRight />
          </button>
        </form>

        <div className="emp-footer">
          <span>New employer?</span>
          <Link to="/employer/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}
