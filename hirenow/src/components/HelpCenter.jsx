import React, { useMemo, useState } from "react";

export default function HelpCenter() {
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => [
      {
        title: "Getting Started",
        desc: "Create account, profile setup, resume tips.",
        links: ["Create account", "Edit profile", "Upload resume"],
        icon: "🚀",
      },
      {
        title: "Jobs & Applications",
        desc: "Apply, track status, saved jobs, notifications.",
        links: ["Apply to a job", "Track application", "Saved jobs"],
        icon: "📄",
      },
      {
        title: "Recruiters & Employers",
        desc: "Post jobs, manage applicants, decisions.",
        links: ["Post a job", "View applicants", "Accept/Reject"],
        icon: "🏢",
      },
      {
        title: "Account & Security",
        desc: "Password, login issues, account protection.",
        links: ["Reset password", "Login issues", "Report suspicious activity"],
        icon: "🛡️",
      },
      {
        title: "Payments & Plans",
        desc: "Subscriptions, invoices, premium benefits (optional).",
        links: ["Plans & benefits", "Payment issues", "Refund policy"],
        icon: "💳",
      },
      {
        title: "Support",
        desc: "Contact support, report scams, feedback.",
        links: ["Contact us", "Report a job", "Send feedback"],
        icon: "💬",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((c) => {
        const matchLinks = c.links.filter((l) => l.toLowerCase().includes(q));
        const match =
          c.title.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q) ||
          matchLinks.length > 0;

        return match ? { ...c, links: matchLinks.length ? matchLinks : c.links } : null;
      })
      .filter(Boolean);
  }, [categories, query]);

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

        .hc-wrap {
          min-height: 100vh;
          background: var(--bg);
          padding: 64px 20px;
        }

        .hc-inner {
          max-width: 1120px;
          margin: auto;
        }

        .hc-hero {
          text-align: center;
          margin-bottom: 26px;
        }

        .hc-title {
          font-size: 34px;
          font-weight: 850;
          color: var(--text);
          margin-bottom: 10px;
        }

        .hc-sub {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
          max-width: 760px;
          margin: auto;
        }

        .hc-searchRow {
          margin-top: 16px;
          display: flex;
          justify-content: center;
        }

        .hc-search {
          width: min(760px, 100%);
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 12px;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .hc-search:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accentSoft);
        }

        .hc-searchIcon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.25);
          color: var(--accent);
          font-size: 18px;
          flex: 0 0 auto;
        }

        .hc-search input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 14px;
        }

        .hc-grid {
          margin-top: 26px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .hc-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px;
          transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .hc-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accentSoft);
          transform: translateY(-3px);
        }

        .hc-top {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .hc-ic {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.25);
          color: var(--accent);
          font-size: 18px;
          flex: 0 0 auto;
        }

        .hc-h {
          color: var(--text);
          font-weight: 800;
          font-size: 16px;
          margin: 0;
        }

        .hc-desc {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          margin-top: 6px;
        }

        .hc-links {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }

        .hc-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(31,41,55,0.7);
          background: rgba(255,255,255,0.02);
          color: var(--text);
          font-size: 13px;
          cursor: pointer;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .hc-link:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accentSoft);
        }

        .hc-link span {
          color: var(--muted);
        }

        .hc-bottom {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
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

        .hc-empty {
          margin-top: 22px;
          text-align: center;
          color: var(--muted);
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px;
        }

        @media (max-width: 1020px) {
          .hc-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 680px) {
          .hc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="hc-wrap">
        <div className="hc-inner">
          <div className="hc-hero">
            <h1 className="hc-title">Help Center</h1>
            <p className="hc-sub">
              Search answers, explore guides, and get support — everything in one place.
            </p>

            <div className="hc-searchRow">
              <div className="hc-search">
                <div className="hc-searchIcon">🔎</div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search: apply, reset password, saved jobs, post job..."
                />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="hc-empty">
              No results found for <b style={{ color: "#e5e7eb" }}>"{query}"</b>. Try a different keyword.
            </div>
          ) : (
            <div className="hc-grid">
              {filtered.map((c, idx) => (
                <div className="hc-card" key={idx}>
                  <div className="hc-top">
                    <div className="hc-ic">{c.icon}</div>
                    <div>
                      <p className="hc-h">{c.title}</p>
                      <div className="hc-desc">{c.desc}</div>
                    </div>
                  </div>

                  <div className="hc-links">
                    {c.links.map((l, i) => (
                      <div
                        key={i}
                        className="hc-link"
                        onClick={() => alert(`Open article: ${l}`)}
                        title="Connect this to your articles/routes later"
                      >
                        <div>{l}</div>
                        <span>→</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="hc-bottom">
            <button className="btn btnPrimary" onClick={() => (window.location.href = "/contact")}>
              Contact Support
            </button>
            <button className="btn" onClick={() => (window.location.href = "/faq")}>
              View FAQs
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
