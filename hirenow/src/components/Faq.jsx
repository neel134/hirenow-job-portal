import React, { useMemo, useState } from "react";

export default function Faq() {
  const faqs = useMemo(
    () => [
      {
        q: "How do I apply for a job on HireNow?",
        a: "Open a job, click Apply, and confirm your resume/profile details. Your application will be visible in 'Your Applications'.",
      },
      {
        q: "Can I save jobs to apply later?",
        a: "Yes. Use the Save button on any job card. Saved jobs appear in your Saved section for quick access later.",
      },
      {
        q: "How do recruiters contact candidates?",
        a: "Recruiters can view applications on their job posts and contact candidates using the details provided (email/phone) based on your profile settings.",
      },
      {
        q: "How do I edit my profile or upload a new resume?",
        a: "Go to Profile → Edit Profile. Update details and upload a new resume. Save changes to update instantly.",
      },
      {
        q: "Is HireNow free to use?",
        a: "HireNow offers free features and may also provide premium plans (if enabled) for extra benefits like priority visibility or early access.",
      },
      {
        q: "Why was my application rejected?",
        a: "Employers may reject applications based on role requirements. You can improve your profile, resume, and apply again to more relevant roles.",
      },
      {
        q: "How do I report a scam job posting?",
        a: "Open the job and use the Report option (or contact support). We take fraud seriously and review reports quickly.",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #0b0f14;
          --card: #111827;
          --border: #1f2937;
          --text: #e5e7eb;
          --muted: #9ca3af;
          --accent: #a855f7;
          --accentSoft: rgba(168, 85, 247, 0.35);
        }

        .faq-wrap {
          min-height: 100vh;
          background: var(--bg);
          padding: 64px 20px;
        }

        .faq-inner {
          max-width: 980px;
          margin: auto;
        }

        .faq-hero {
          text-align: center;
          margin-bottom: 26px;
        }

        .faq-title {
          font-size: 34px;
          font-weight: 850;
          color: var(--text);
          margin-bottom: 10px;
        }

        .faq-sub {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
          max-width: 720px;
          margin: auto;
        }

        .faq-pillRow {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
        }

        .faq-pill {
          font-size: 12px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          color: var(--muted);
        }

        .faq-card {
          margin-top: 26px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px;
        }

        .faq-item {
          border: 1px solid rgba(31,41,55,0.75);
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          margin-bottom: 12px;
          overflow: hidden;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .faq-item:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accentSoft);
        }

        .faq-q {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: var(--text);
          font-weight: 700;
          padding: 14px 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 14px;
        }

        .faq-q span {
          color: var(--muted);
          font-weight: 600;
          font-size: 12px;
          padding: 4px 9px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          white-space: nowrap;
        }

        .faq-a {
          padding: 0 14px 14px 14px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }

        .faq-icon {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: var(--accent);
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.25);
          flex: 0 0 auto;
        }

        .faq-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .faq-cta {
          margin-top: 18px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn {
          border-radius: 12px;
          padding: 11px 14px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          color: var(--text);
          transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .btn:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accentSoft);
          transform: translateY(-2px);
        }

        .btnPrimary {
          border: none;
          background: linear-gradient(135deg, #9333ea, #a855f7);
        }

        .btnPrimary:hover {
          box-shadow: 0 12px 28px rgba(168, 85, 247, 0.35);
        }
      `}</style>

      <section className="faq-wrap">
        <div className="faq-inner">
          <div className="faq-hero">
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <p className="faq-sub">
              Quick answers to common questions about HireNow — candidates, recruiters, applications, and safety.
            </p>

            <div className="faq-pillRow">
              <span className="faq-pill">Candidates</span>
              <span className="faq-pill">Recruiters</span>
              <span className="faq-pill">Applications</span>
              <span className="faq-pill">Payments (optional)</span>
              <span className="faq-pill">Safety</span>
            </div>
          </div>

          <div className="faq-card">
            {faqs.map((item, idx) => {
              const open = openIndex === idx;
              return (
                <div key={idx} className="faq-item">
                  <button className="faq-q" onClick={() => toggle(idx)}>
                    <div className="faq-row">
                      <div className="faq-icon">{open ? "−" : "+"}</div>
                      <div>{item.q}</div>
                    </div>
                    <span>{open ? "Hide" : "View"}</span>
                  </button>

                  {open && <div className="faq-a">{item.a}</div>}
                </div>
              );
            })}

            <div className="faq-cta">
              <button className="btn btnPrimary" onClick={() => (window.location.href = "/contact")}>
                Contact Support
              </button>
              <button className="btn" onClick={() => (window.location.href = "/help")}>
                Open Help Center
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
