import React, { useState } from "react";
import { loginUser, saveAuth } from "../services/authservice";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await loginUser(form);
      saveAuth(token);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginStage">
      <div className="loginLayout">
        {/* LEFT */}
        <section className="loginInfo">
          <div className="brandPill">
            <span className="dot" />
            <span className="brandText">HireNow</span>
          </div>

          <h1 className="heroTitle">
            Find your next <span>job</span> faster.
          </h1>

          <p className="heroDesc">
            Smart search, verified companies, and roles that match your skills.
            Sign in to continue.
          </p>

          <div className="heroPoints">
            <div className="point">✅ Verified companies & real openings</div>
            <div className="point">⚡ Apply faster with saved profile</div>
            <div className="point">📈 Track applications in one place</div>
          </div>
        </section>

        {/* RIGHT */}
        <section className="loginPanel">
          <div className="loginCard">
            <h2>Log in</h2>
            <p className="sub">Welcome back — let’s get you hired.</p>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <label>
                Email
                <div className="field">
                  <FiMail />
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              <label>
                Password
                <div className="field">
                  <FiLock />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="eye"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </label>

              <button className="btn" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="foot">
              New user? <Link to="/register">Create account</Link>
            </p>
            <div style={{ marginTop: "12px", textAlign: "center" }}>
  <Link
    to="/admin/login"
    style={{
      color: "#67e8f9",
      textDecoration: "none",
      fontSize: "14px",
    }}
  >
    Login as Admin
  </Link>
</div>

          </div>
        </section>
      </div>
    </div>
  );
}
