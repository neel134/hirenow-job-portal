// JobLanding.jsx
import React, { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaClock, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./JobLanding.css";

export default function JobLanding() {
  const words = ["𝚋𝚞𝚒𝚕𝚍 𝚌𝚊𝚛𝚎𝚎𝚛𝚜", "𝚙𝚊𝚢 𝚋𝚎𝚝𝚝𝚎𝚛", "𝚐𝚛𝚘𝚠 𝚏𝚊𝚜𝚝𝚎𝚛"];
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  
  const [filters, setFilters] = useState({
    q: "",
    location: "",
    experience: "",
    jobType: "",
  });

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  const onSearch = () => {
    // ✅ stay on HOME route "/" because JobList is already on "/"
    const params = new URLSearchParams();

    if (filters.q.trim()) params.set("q", filters.q.trim());
    if (filters.location.trim()) params.set("location", filters.location.trim());
    if (filters.experience !== "") params.set("experience", filters.experience);
    if (filters.jobType) params.set("jobType", filters.jobType);

    // ✅ default sort
    params.set("sort", "LATEST");

    navigate(`/?${params.toString()}`);
  };

  return (
    <section className="hero hero-gradient">
      <h1 className="hero-title">
        𝖥𝗂𝗇𝖽 𝗃𝗈𝖻𝗌 𝗍𝗁𝖺𝗍{" "}
        <span className="flip-wrap">
          <span key={idx} className="flip-word">
            {words[idx]}
          </span>
        </span>
      </h1>

      <p className="hero-sub">Real market data. Smarter job decisions.</p>

      <div className="search-wrap">
        <div className="search-bar-long">
          <div className="bar-item">
            <FaSearch className="bar-icon" />
            <input
              placeholder="Role, skill, or keyword"
              value={filters.q}
              onChange={(e) => setFilters((p) => ({ ...p, q: e.target.value }))}
            />
          </div>

          <div className="divider" />

          <div className="bar-item">
            <FaMapMarkerAlt className="bar-icon" />
            <input
              placeholder="Location or remote"
              value={filters.location}
              onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
            />
          </div>

          <div className="divider" />

          <div className="bar-item">
            <FaClock className="bar-icon" />
            <select
              value={filters.experience}
              onChange={(e) => setFilters((p) => ({ ...p, experience: e.target.value }))}
            >
              <option value="">Experience</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="3">3–5</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div className="divider" />

          <div className="bar-item">
            <FaBriefcase className="bar-icon" />
            <select
              value={filters.jobType}
              onChange={(e) => setFilters((p) => ({ ...p, jobType: e.target.value }))}
            >
              <option value="">Job type</option>
              {/* ✅ Must match your backend enum values */}
              <option value="FULLTIME">Full-time</option>
              <option value="PARTTIME">Part-time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="PROJECTWORK">Project work</option>
            </select>
          </div>

          <button className="search-btn" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="cta-row">
        <button className="cta-primary">Get Started</button>
        <span className="cta-link">
          <a href="howitwork" style={{ color: "white" }}>
            How it works →
          </a>
        </span>
      </div>

      {/* ✅ Your cards remain same (unchanged) */}
      <div className="float-stack">
        <div className="float-card accent-purple">
          <span className="small-title">TRENDING CATEGORY</span>
          <strong>AI/ML</strong>
          <p>React · Python · Java</p>

          <div className="mini-bars purple-bars" aria-hidden="true">
            <span style={{ "--h": "22%" }}></span>
            <span style={{ "--h": "25%" }}></span>
            <span style={{ "--h": "34%" }}></span>
            <span style={{ "--h": "46%" }}></span>
            <span style={{ "--h": "56%" }}></span>
            <span style={{ "--h": "78%" }}></span>
            <span style={{ "--h": "88%" }}></span>
            <span style={{ "--h": "96%" }}></span>
            <span style={{ "--h": "98%" }}></span>
            <span style={{ "--h": "106%" }}></span>
            <span style={{ "--h": "128%" }}></span>
          </div>
          <div className="graph-foot">
            <span className="pill">2020</span>
            <span className="pill">2022</span>
            <span className="pill">2024</span>
            <span className="pill">2026</span>
          </div>
        </div>

        <div className="float-card accent-pink">
          <span className="small-title">AI INSIGHT</span>
          <strong>AI + React</strong>
          <p>↑ 32% this month</p>

          <div className="spark pink-spark" aria-hidden="true">
            <span style={{ "--h": "22%" }}></span>
            <span style={{ "--h": "25%" }}></span>
            <span style={{ "--h": "34%" }}></span>
            <span style={{ "--h": "46%" }}></span>
            <span style={{ "--h": "56%" }}></span>
            <span style={{ "--h": "78%" }}></span>
            <span style={{ "--h": "88%" }}></span>
            <span style={{ "--h": "96%" }}></span>
            <span style={{ "--h": "98%" }}></span>
            <span style={{ "--h": "106%" }}></span>
            <span style={{ "--h": "128%" }}></span>
          </div>
          <div className="graph-foot">
            <span className="pill">Oct</span>
            <span className="pill">Nov</span>
            <span className="pill">Dec</span>
            <span className="pill">Jan-Feb</span>
          </div>
        </div>

        <div className="float-card accent-cyan">
          <span className="small-title">PROFILE BOOST</span>
          <strong>Complete profile → shortlist</strong>
          <p>
            <span className="stat-up">↑ 48%</span> higher shortlist rate
          </p>

          <div className="mini-bars cyan" aria-hidden="true">
            <span style={{ "--h": "22%" }}></span>
            <span style={{ "--h": "25%" }}></span>
            <span style={{ "--h": "34%" }}></span>
            <span style={{ "--h": "46%" }}></span>
            <span style={{ "--h": "56%" }}></span>
            <span style={{ "--h": "78%" }}></span>
            <span style={{ "--h": "88%" }}></span>
            <span style={{ "--h": "96%" }}></span>
            <span style={{ "--h": "98%" }}></span>
            <span style={{ "--h": "106%" }}></span>
            <span style={{ "--h": "128%" }}></span>
          </div>
          <div className="graph-foot">
            <span className="pill">30%</span>
            <span className="pill">50%</span>
            <span className="pill">70%</span>
            <span className="pill">100%</span>
          </div>
        </div>

        <div className="float-card accent-amber">
          <span className="small-title">HIRING NOW</span>
          <strong>120+ companies</strong>
          <p>Open roles added this week</p>

          <div className="mini-graph" aria-hidden="true">
            <span style={{ "--h": "22%" }}></span>
            <span style={{ "--h": "25%" }}></span>
            <span style={{ "--h": "34%" }}></span>
            <span style={{ "--h": "46%" }}></span>
            <span style={{ "--h": "56%" }}></span>
            <span style={{ "--h": "78%" }}></span>
            <span style={{ "--h": "88%" }}></span>
            <span style={{ "--h": "96%" }}></span>
            <span style={{ "--h": "98%" }}></span>
            <span style={{ "--h": "106%" }}></span>
            <span style={{ "--h": "128%" }}></span>
          </div>

          <div className="graph-foot">
            <span className="pill">Mon</span>
            <span className="pill">Tue</span>
            <span className="pill">Wed</span>
            <span className="pill">Thr-Fri</span>
          </div>
        </div>
      </div>
    </section>
  );
}
