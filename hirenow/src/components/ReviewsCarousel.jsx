import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ReviewsFooter.css";

function Stars({ value = 5 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div className="rv-stars" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "rv-star on" : "rv-star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const reviews = useMemo(
    () => [
      {
        id: 1,
        name: "Aarav Sharma",
        role: "Frontend Developer",
        company: "PixelForge",
        location: "Pune, IN",
        plan: "Premium",
        verified: true,
        rating: 5,
        date: "Jan 2026",
        tag: "Fast Hiring",
        metrics: { time: "3 days", interviews: "2 rounds" },
        text: "HireNow pe apply karna super easy hai. Recommendations accurate the aur status updates bhi clear the.",
      },
      {
        id: 2,
        name: "Neha Patil",
        role: "UI/UX Designer",
        company: "StudioNova",
        location: "Mumbai, IN",
        plan: "Free",
        verified: true,
        rating: 5,
        date: "Dec 2025",
        tag: "Clean UI",
        metrics: { time: "5 days", interviews: "1 round" },
        text: "Interface premium lagta hai. Filters + saved jobs feature kaafi helpful. Smooth experience overall.",
      },
      {
        id: 3,
        name: "Rahul Verma",
        role: "Backend (Java)",
        company: "CloudStack",
        location: "Bengaluru, IN",
        plan: "Premium",
        verified: false,
        rating: 4,
        date: "Jan 2026",
        tag: "Better Tracking",
        metrics: { time: "1 week", interviews: "3 rounds" },
        text: "Applications tracking aur notifications ka flow mast hai. Employer decision updates time pe aaye.",
      },
      {
        id: 4,
        name: "Priya Singh",
        role: "HR / Recruiter",
        company: "TalentBridge",
        location: "Delhi, IN",
        plan: "Recruiter",
        verified: true,
        rating: 5,
        date: "Feb 2026",
        tag: "Time Saver",
        metrics: { time: "48 hours", interviews: "Shortlist" },
        text: "Applicants manage karna easy. Sorting + quick decision se kaafi time bachta hai.",
      },
      {
        id: 5,
        name: "Aditya Kulkarni",
        role: "Student Intern",
        company: "Campus Connect",
        location: "Nagpur, IN",
        plan: "Free",
        verified: false,
        rating: 4,
        date: "Jan 2026",
        tag: "Great Internships",
        metrics: { time: "6 days", interviews: "1 round" },
        text: "Internships section strong hai. Simple apply flow aur cards readable. Platform modern feels.",
      },
      {
        id: 6,
        name: "Sana Khan",
        role: "Full Stack Dev",
        company: "DevSphere",
        location: "Hyderabad, IN",
        plan: "Premium",
        verified: true,
        rating: 5,
        date: "Feb 2026",
        tag: "Early Access",
        metrics: { time: "4 days", interviews: "2 rounds" },
        text: "Premium benefits noticeable. Faster visibility + better job matches. Definitely worth it.",
      },
    ],
    []
  );

  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = (idx) => {
    const el = trackRef.current;
    if (!el) return;

    const maxIndex = Math.max(0, reviews.length - 1);
    const i = Math.max(0, Math.min(idx, maxIndex));
    setActive(i);

    const card = el.querySelector(".rv-card");
    if (!card) return;

    const gap = 16; // must match CSS gap
    const w = card.getBoundingClientRect().width;
    el.scrollTo({ left: i * (w + gap), behavior: "smooth" });
  };

  const next = () => scrollToIndex(active + 1);
  const prev = () => scrollToIndex(active - 1);

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const n = active + 1;
      if (n >= reviews.length) scrollToIndex(0);
      else scrollToIndex(n);
    }, 3200);
    return () => clearInterval(t);
  }, [active, paused, reviews.length]);

  // sync active on manual scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const card = el.querySelector(".rv-card");
      if (!card) return;
      const gap = 16;
      const w = card.getBoundingClientRect().width;
      const i = Math.round(el.scrollLeft / (w + gap));
      if (!Number.isNaN(i)) setActive(Math.max(0, Math.min(i, reviews.length - 1)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [reviews.length]);

  return (
    <section className="rv-wrap">
      <div className="rv-head">
        <div className="rv-chip">REVIEWS</div>
        <h2 className="rv-title">
          People <span>love</span> HireNow
        </h2>
        <p className="rv-sub">
          Real feedback from candidates and recruiters — fast, clean, and premium experience.
        </p>
      </div>

      <div
        className="rv-shell"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className={`rv-btn ${active === 0 ? "disabled" : ""}`} onClick={prev}>
          ‹
        </button>

        <div className="rv-track" ref={trackRef}>
          {reviews.map((r) => {
            const initials = r.name
              .split(" ")
              .slice(0, 2)
              .map((x) => x[0])
              .join("")
              .toUpperCase();

            return (
              <article className="rv-card" key={r.id}>
                <div className="rv-top">
                  <div className="rv-avatar" aria-hidden="true">
                    {initials}
                  </div>

                  <div className="rv-meta">
                    <div className="rv-nameRow">
                      <div className="rv-name">{r.name}</div>
                      {r.verified && <span className="rv-verified">Verified</span>}
                    </div>

                    <div className="rv-role">
                      {r.role} • <span>{r.company}</span>
                    </div>

                    <div className="rv-submeta">
                      <span>{r.location}</span>
                      <span className="rv-dot">•</span>
                      <span>{r.date}</span>
                      <span className="rv-dot">•</span>
                      <span className={`rv-plan ${r.plan === "Premium" ? "premium" : ""}`}>
                        {r.plan}
                      </span>
                    </div>
                  </div>

                  <div className="rv-right">
                    <Stars value={r.rating} />
                    <span className="rv-tag">{r.tag}</span>
                  </div>
                </div>

                <p className="rv-text">“{r.text}”</p>

                <div className="rv-metrics">
                  <div className="rv-metric">
                    <span className="rv-mLabel">Time</span>
                    <span className="rv-mVal">{r.metrics.time}</span>
                  </div>
                  <div className="rv-metric">
                    <span className="rv-mLabel">Process</span>
                    <span className="rv-mVal">{r.metrics.interviews}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          className={`rv-btn ${active >= reviews.length - 1 ? "disabled" : ""}`}
          onClick={next}
        >
          ›
        </button>
      </div>

      <div className="rv-dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`rv-dotBtn ${i === active ? "on" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
