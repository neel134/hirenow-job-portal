import React, { useState } from "react";
import { employerRegister } from "../services/employerAuthService";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser,
  FiHash,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiTag,
  FiImage,
  FiFileText,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import "./EmployerRegister.css";

export default function EmployerRegister() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    name: "",
    companyRegNo: "",
    companyName: "",
    email: "",
    phone: "",
    location: "",
    websiteUrl: "",
    description: "",
    industry: "",
    companyImageUrl: "",
    password: "",
  });

  const onChange = (e) => {
    setErr("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      await employerRegister({
        ...form,
        companyRegNo: Number(form.companyRegNo),
      });
      nav("/employer/login");
    } catch (e2) {
      setErr("Register failed. Email already exists or invalid data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emp-reg-page">
      <div className="emp-reg-glow emp-reg-glow-1" />
      <div className="emp-reg-glow emp-reg-glow-2" />

      <div className="emp-reg-card">
        <div className="emp-reg-brand">
          <div className="emp-reg-logo">H</div>
          <div>
            <div className="emp-reg-brand-title">HireNow</div>
            <div className="emp-reg-brand-sub">Employer Registration</div>
          </div>
        </div>

        <h2 className="emp-reg-heading">Create employer account</h2>
        <p className="emp-reg-subheading">
          Fill all company details to start posting jobs and managing applicants.
        </p>

        {err && <div className="emp-reg-error">{err}</div>}

        <form onSubmit={onSubmit} className="emp-reg-form">
          {/* row 1 */}
          <div className="emp-reg-row">
            <div className="emp-reg-field">
              <label>Your Name</label>
              <div className="emp-reg-input">
                <FiUser />
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="emp-reg-field">
              <label>Company Name</label>
              <div className="emp-reg-input">
                <FiBriefcase />
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={onChange}
                  placeholder="Company legal name"
                  required
                />
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div className="emp-reg-row">
            <div className="emp-reg-field">
              <label>Company Reg No</label>
              <div className="emp-reg-input">
                <FiHash />
                <input
                  name="companyRegNo"
                  value={form.companyRegNo}
                  onChange={onChange}
                  placeholder="Registration number"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            <div className="emp-reg-field">
              <label>Industry</label>
              <div className="emp-reg-input">
                <FiTag />
                <input
                  name="industry"
                  value={form.industry}
                  onChange={onChange}
                  placeholder="Industry"
                  required
                />
              </div>
            </div>
          </div>

          {/* row 3 */}
          <div className="emp-reg-row">
            <div className="emp-reg-field">
              <label>Email</label>
              <div className="emp-reg-input">
                <FiMail />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Company email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="emp-reg-field">
              <label>Phone</label>
              <div className="emp-reg-input">
                <FiPhone />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone number"
                  inputMode="tel"
                  required
                />
              </div>
            </div>
          </div>

          {/* row 4 */}
          <div className="emp-reg-row">
            <div className="emp-reg-field">
              <label>Location</label>
              <div className="emp-reg-input">
                <FiMapPin />
                <input
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>

            <div className="emp-reg-field">
              <label>Website</label>
              <div className="emp-reg-input">
                <FiGlobe />
                <input
                  name="websiteUrl"
                  value={form.websiteUrl}
                  onChange={onChange}
                  placeholder="https://yourcompany.com"
                  type="url"
                  required
                />
              </div>
            </div>
          </div>

          {/* full width */}
          <div className="emp-reg-field">
            <label>Company Image URL</label>
            <div className="emp-reg-input">
              <FiImage />
              <input
                name="companyImageUrl"
                value={form.companyImageUrl}
                onChange={onChange}
                placeholder="https://logo-or-image-url"
                type="url"
                required
              />
            </div>
          </div>

          <div className="emp-reg-field">
            <label>Description</label>
            <div className="emp-reg-textarea">
              <FiFileText />
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Company description"
                rows={3}
                required
              />
            </div>
          </div>

          <div className="emp-reg-field">
            <label>Password</label>
            <div className="emp-reg-input">
              <FiLock />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Create a strong password"
                required
              />
            </div>
          </div>

          <button className="emp-reg-btn" disabled={loading}>
            <span>{loading ? "Creating..." : "Create Employer Account"}</span>
            <FiArrowRight />
          </button>
        </form>

        <div className="emp-reg-footer">
          <span>Already have account?</span>
          <Link to="/employer/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
