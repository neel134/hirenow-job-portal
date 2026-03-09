import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "2K+", label: "Jobs Posted" },
    { value: "500+", label: "Companies" },
    { value: "1K+", label: "Successful Hires" },
  ];

  const pillars = [
    {
      title: "Verified Employers",
      desc: "We focus on trust. Employers can be verified so candidates apply with confidence.",
      icon: "🛡️",
    },
    {
      title: "Premium Experience",
      desc: "Black + cyan UI, fast flows, smooth tracking—everything feels modern and clean.",
      icon: "✨",
    },
    {
      title: "Smart Discovery",
      desc: "Search by role, category, location, and company with a simple, powerful UX.",
      icon: "🔎",
    },
    {
      title: "Faster Hiring",
      desc: "Recruiters get better applications. Candidates get faster updates & decisions.",
      icon: "⚡",
    },
  ];

  const timeline = [
    { year: "2026", title: "HireNow Started", desc: "Built to make job search and hiring feel premium and simple." },
    { year: "Phase 1", title: "Jobs + Profiles", desc: "Core features: jobs listing, user profile, resume upload." },
    { year: "Phase 2", title: "Applications + Tracking", desc: "Apply flow, saved jobs, status updates, notifications." },
    { year: "Next", title: "Subscriptions + Early Access", desc: "Premium benefits like early job access & visibility boosts." },
  ];



  return (
    <div className="au2-page">
      {/* HERO */}
      <section className="au2-hero">
        <div className="au2-orb orb1" />
        <div className="au2-orb orb2" />
        <div className="au2-orb orb3" />

        <div className="au2-container au2-hero-inner">
          <div className="au2-badge">ABOUT HIRENOW</div>

          <h1 className="au2-title">
            A smarter way to <span>hire</span> & <span>get hired</span>.
          </h1>

          <p className="au2-sub">
            HireNow is a modern job portal platform focused on trust, speed, and a premium user experience.
            We help candidates discover better opportunities and help employers hire the right talent faster.
          </p>

          <div className="au2-cta">
            <button className="au2-btn au2-btn-primary" type="button">Explore Jobs</button>
            <button className="au2-btn au2-btn-ghost" type="button">Contact Us</button>
          </div>

          {/* Stats */}
          <div className="au2-stats">
            {stats.map((s) => (
              <div key={s.label} className="au2-stat">
                <div className="au2-stat-value">{s.value}</div>
                <div className="au2-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY HIRENOW */}
      <section className="au2-section">
        <div className="au2-container">
          <div className="au2-head">
            <h2 className="au2-h2">Why HireNow?</h2>
            <p className="au2-muted">
              We built HireNow to remove confusion, reduce friction, and make hiring feel premium.
            </p>
          </div>

          <div className="au2-grid">
            {pillars.map((p) => (
              <div key={p.title} className="au2-card">
                <div className="au2-icon">{p.icon}</div>
                <h3 className="au2-h3">{p.title}</h3>
                <p className="au2-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="au2-section">
        <div className="au2-container au2-split">
          <div className="au2-panel">
            <div className="au2-panel-top">
              <span className="au2-mini">MISSION</span>
              <div className="au2-line" />
            </div>
            <h3 className="au2-h3 big">Make hiring simple & fast.</h3>
            <p className="au2-p">
              Help job seekers apply confidently and help recruiters find quality candidates without noise.
            </p>
          </div>

          <div className="au2-panel">
            <div className="au2-panel-top">
              <span className="au2-mini">VISION</span>
              <div className="au2-line" />
            </div>
            <h3 className="au2-h3 big">A premium job portal experience.</h3>
            <p className="au2-p">
              Clean UI, real-time updates, subscription benefits, and a modern workflow for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="au2-section">
        <div className="au2-container">
          <div className="au2-head">
            <h2 className="au2-h2">Our Journey</h2>
            <p className="au2-muted">What we built, what’s live, and what’s coming next.</p>
          </div>

          <div className="au2-timeline">
            {timeline.map((t, i) => (
              <div key={i} className="au2-time-item">
                <div className="au2-dot" />
                <div className="au2-time-card">
                  <div className="au2-time-year">{t.year}</div>
                  <div className="au2-time-title">{t.title}</div>
                  <div className="au2-time-desc">{t.desc}</div>
                </div>
              </div>
            ))}
            <div className="au2-time-line" />
          </div>
        </div>
      </section>

      
          {/* Footer CTA */}
          <div className="au2-footer-cta">
            <div>
              <h3 className="au2-h3 big">Ready to explore HireNow?</h3>
              <p className="au2-muted">Create your profile and start applying in minutes.</p>
            </div>
            <button className="au2-btn au2-btn-primary" type="button">Get Started</button>
          </div>
        </div>
  

  );
}
