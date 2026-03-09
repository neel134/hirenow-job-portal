import React, { useState } from "react";
import { registerUser } from "../services/authservice";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiBookOpen,
  FiFileText,
  FiImage,
  FiAward,
} from "react-icons/fi";
import "./Register.css";
import { color } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    phone: "",
    location: "",
    resume: "",
    jobProfile: "",
    skills: "",
    education: "",
    experience: "",
    password: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser({
        ...form,
        age: form.age === "" ? null : Number(form.age),
        experience: form.experience === "" ? null : Number(form.experience),
      });
      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="regStage">
      <div className="regLayout">
        {/* LEFT: Info */}
        <section className="regInfo">
          <div className="brandPill">
            <span className="dot" />
            <span className="brandText">HireNow</span>
          </div>

          <h1 className="heroTitle">
            Create your <span>candidate profile</span>.
          </h1>

          <p className="heroDesc">
            Fill your details once — apply faster, get better matches, and track
            everything in one place.
          </p>

          <div className="heroPoints">
            <div className="point">✅ Verified companies</div>
            <div className="point">⚡ Faster applications</div>
            <div className="point">📌 Personalized job matches</div>
          </div>
        </section>

        {/* RIGHT: Form */}
        <section className="regPanel">
          <div className="regCard">
            <div className="regTop">
              <h2 >Create Account</h2>
              <p>Build your profile to start applying.</p>
            </div>

            {error && <div className="regError">{error}</div>}

            <form className="regForm" onSubmit={handleSubmit}>
              <div className="regGrid">
                <label className="f">
                  <span>First Name</span>
                  <div className="fi">
                    <i><FiUser /></i>
                    <input
                      name="name"
                      placeholder="First Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Last Name</span>
                  <div className="fi">
                    <i><FiUser /></i>
                    <input
                      name="surname"
                      placeholder="Last Name"
                      value={form.surname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Age</span>
                  <div className="fi">
                    <i><FiAward /></i>
                    <input
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={form.age}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Email</span>
                  <div className="fi">
                    <i><FiMail /></i>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Phone</span>
                  <div className="fi">
                    <i><FiPhone /></i>
                    <input
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Location</span>
                  <div className="fi">
                    <i><FiMapPin /></i>
                    <input
                      name="location"
                      placeholder="Location"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Job Profile</span>
                  <div className="fi">
                    <i><FiBriefcase /></i>
                    <input
                      name="jobProfile"
                      placeholder="e.g. Java Developer"
                      value={form.jobProfile}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Skills</span>
                  <div className="fi">
                    <i><FiAward /></i>
                    <input
                      name="skills"
                      placeholder="Java, React, SQL"
                      value={form.skills}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Education</span>
                  <div className="fi">
                    <i><FiBookOpen /></i>
                    <input
                      name="education"
                      placeholder="Education"
                      value={form.education}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Experience (years)</span>
                  <div className="fi">
                    <i><FiBriefcase /></i>
                    <input
                      name="experience"
                      type="number"
                      placeholder="Experience"
                      value={form.experience}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Resume URL</span>
                  <div className="fi">
                    <i><FiFileText /></i>
                    <input
                      name="resume"
                      placeholder="Resume URL"
                      value={form.resume}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f">
                  <span>Profile Image URL</span>
                  <div className="fi">
                    <i><FiImage /></i>
                    <input
                      name="profileImage"
                      placeholder="Profile Image URL"
                      value={form.profileImage}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="f full">
                  <span>Password</span>
                  <div className="fi">
                    <i><FiLock /></i>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>
              </div>

              <button className="regBtn" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>

              <p className="regFoot">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
