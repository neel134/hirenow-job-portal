import React from "react";
import "./HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Profile",
      desc: "Sign up, add skills, education & upload resume to boost visibility.",
      icon: "👤",
    },
    {
      title: "Discover Jobs",
      desc: "Search by role, location, company & category with smart filters.",
      icon: "🔎",
    },
    {
      title: "Apply & Track",
      desc: "Apply in one click and track status updates in your dashboard.",
      icon: "📩",
    },
    {
      title: "Get Hired Faster",
      desc: "Get recruiter responses, schedule interviews and receive offers.",
      icon: "✅",
    },
  ];

  return (
    <section className="hhw-wrap">
      <div className="hhw-head">
        <span className="hhw-chip" >STEP BY STEP</span>
        <h2 className="hhw-title">
          How <span>HireNow</span> Works
        </h2>
        <p className="hhw-sub">
          A premium hiring flow designed for speed, clarity & better conversions.
        </p>
      </div>

      <div className="hhw-timeline">
        <div className="hhw-line" />
        {steps.map((s, idx) => (
          <div key={idx} className="hhw-step">
            <div className="hhw-node">
              <span className="hhw-num">{idx + 1}</span>
            </div>

            <div className="hhw-card">
              <div className="hhw-icon">{s.icon}</div>
              <h3 className="hhw-card-title">{s.title}</h3>
              <p className="hhw-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
