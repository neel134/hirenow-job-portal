import React from "react";

export default function PrivacyPolicy() {
  const updatedDate = "February 8, 2026";

  return (
    <>
      <style>{`
        :root {
          --bg-dark: #0b0f14;
          --card-dark: #111827;
          --border-dark: #1f2937;
          --text-main: #e5e7eb;
          --text-muted: #9ca3af;
          --accent: #a855f7;
          --accent-soft: rgba(168, 85, 247, 0.35);
        }

        .pp-wrap {
          min-height: 100vh;
          background: var(--bg-dark);
          padding: 60px 20px;
        }

        .pp-inner {
          max-width: 980px;
          margin: auto;
        }

        .pp-hero {
          text-align: center;
          margin-bottom: 26px;
        }

        .pp-title {
          font-size: 34px;
          font-weight: 850;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .pp-sub {
          color: var(--text-muted);
          font-size: 14px;
          max-width: 760px;
          margin: auto;
          line-height: 1.7;
        }

        .pp-meta {
          margin-top: 14px;
          display: inline-flex;
          gap: 10px;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--border-dark);
          background: rgba(17, 24, 39, 0.6);
          color: var(--text-muted);
          font-size: 12px;
        }

        .pp-meta b {
          color: var(--text-main);
          font-weight: 600;
        }

        .pp-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 22px;
          margin-top: 28px;
        }

        .pp-card {
          background: var(--card-dark);
          border: 1px solid var(--border-dark);
          border-radius: 18px;
          padding: 18px;
        }

        .pp-navTitle {
          color: var(--text-main);
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .pp-nav {
          display: grid;
          gap: 8px;
        }

        .pp-nav a {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: rgba(255,255,255,0.02);
          transition: border 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
        }

        .pp-nav a:hover {
          color: var(--text-main);
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent-soft);
        }

        .pp-content {
          padding: 24px;
        }

        .pp-section {
          padding: 18px 0;
          border-bottom: 1px solid rgba(31, 41, 55, 0.7);
        }

        .pp-section:last-child {
          border-bottom: none;
        }

        .pp-h {
          color: var(--text-main);
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .pp-p {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.75;
          margin: 8px 0;
        }

        .pp-ul {
          margin: 10px 0 0 0;
          padding-left: 18px;
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .pp-ul li {
          margin: 6px 0;
        }

        .pp-badgeRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .pp-badge {
          font-size: 12px;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.06);
        }

        .pp-callout {
          margin-top: 12px;
          border-radius: 14px;
          border: 1px solid var(--border-dark);
          padding: 14px;
          background: rgba(255,255,255,0.02);
        }

        .pp-callout b {
          color: var(--text-main);
        }

        .pp-link {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px dashed rgba(168,85,247,0.55);
        }

        .pp-link:hover {
          border-bottom-style: solid;
        }

        @media (max-width: 980px) {
          .pp-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="pp-wrap">
        <div className="pp-inner">
          <div className="pp-hero">
            <h1 className="pp-title">Privacy Policy</h1>
            <p className="pp-sub">
              This Privacy Policy explains how HireNow collects, uses, shares, and protects your
              information when you use our website, apps, and services.
            </p>

            <div className="pp-meta">
              <span>Last updated:</span> <b>{updatedDate}</b>
            </div>
          </div>

          <div className="pp-grid">
            {/* LEFT NAV */}
            <aside className="pp-card">
              <div className="pp-navTitle">Quick navigation</div>
              <nav className="pp-nav">
                <a href="#overview">Overview</a>
                <a href="#data-we-collect">Information we collect</a>
                <a href="#how-we-use">How we use information</a>
                <a href="#sharing">Sharing & disclosure</a>
                <a href="#cookies">Cookies & tracking</a>
                <a href="#security">Security</a>
                <a href="#retention">Data retention</a>
                <a href="#rights">Your rights & choices</a>
                <a href="#children">Children’s privacy</a>
                <a href="#changes">Changes to this policy</a>
                <a href="#contact">Contact</a>
              </nav>

              <div className="pp-callout">
                <p className="pp-p" style={{ margin: 0 }}>
                  <b>Tip:</b> This page is a template. Replace emails/phone/address with your real
                  details before production.
                </p>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="pp-card pp-content">
              <section id="overview" className="pp-section">
                <div className="pp-h">Overview</div>
                <p className="pp-p">
                  HireNow is a job portal connecting candidates and recruiters. We collect only the
                  information needed to run the platform (like creating accounts, applying to jobs,
                  and managing hiring workflows).
                </p>
                <div className="pp-badgeRow">
                  <span className="pp-badge">Account & Profile</span>
                  <span className="pp-badge">Job Applications</span>
                  <span className="pp-badge">Recruiter Tools</span>
                  <span className="pp-badge">Security & Fraud Prevention</span>
                </div>
              </section>

              <section id="data-we-collect" className="pp-section">
                <div className="pp-h">Information we collect</div>
                <p className="pp-p">Depending on how you use HireNow, we may collect:</p>
                <ul className="pp-ul">
                  <li>
                    <b>Account information:</b> name, email, phone, password (stored securely),
                    location.
                  </li>
                  <li>
                    <b>Profile & resume:</b> skills, education, experience, job preferences, uploaded
                    resume, profile image.
                  </li>
                  <li>
                    <b>Application data:</b> jobs you apply to, application status, recruiter notes
                    (where applicable).
                  </li>
                  <li>
                    <b>Usage data:</b> pages visited, clicks, device/browser info, approximate
                    location (IP-based), logs.
                  </li>
                </ul>
              </section>

              <section id="how-we-use" className="pp-section">
                <div className="pp-h">How we use information</div>
                <ul className="pp-ul">
                  <li>Provide and operate the HireNow platform (accounts, jobs, applications).</li>
                  <li>Personalize your experience (recommended jobs, saved searches).</li>
                  <li>Communicate with you (support, important updates, security alerts).</li>
                  <li>Improve performance, analytics, and product features.</li>
                  <li>Prevent spam, abuse, and fraudulent activity.</li>
                </ul>
              </section>

              <section id="sharing" className="pp-section">
                <div className="pp-h">Sharing & disclosure</div>
                <p className="pp-p">
                  We may share information in limited cases:
                </p>
                <ul className="pp-ul">
                  <li>
                    <b>With recruiters/employers:</b> when you apply to a job, your profile/resume
                    may be shared with that employer.
                  </li>
                  <li>
                    <b>Service providers:</b> hosting, analytics, email delivery, payment processing
                    (only as needed).
                  </li>
                  <li>
                    <b>Legal & safety:</b> if required by law or to protect users and the platform.
                  </li>
                </ul>
              </section>

              <section id="cookies" className="pp-section">
                <div className="pp-h">Cookies & tracking</div>
                <p className="pp-p">
                  We use cookies/local storage to keep you logged in, remember preferences, and
                  understand how users interact with HireNow. You can control cookies via your
                  browser settings.
                </p>
              </section>

              <section id="security" className="pp-section">
                <div className="pp-h">Security</div>
                <p className="pp-p">
                  We use reasonable security measures such as access controls, encryption in transit
                  (HTTPS), and monitoring to protect data. No system is 100% secure, so please use a
                  strong password and keep your account safe.
                </p>
              </section>

              <section id="retention" className="pp-section">
                <div className="pp-h">Data retention</div>
                <p className="pp-p">
                  We retain information only as long as necessary for platform operations, legal
                  requirements, and legitimate business purposes. You may request deletion of your
                  account where applicable.
                </p>
              </section>

              <section id="rights" className="pp-section">
                <div className="pp-h">Your rights & choices</div>
                <ul className="pp-ul">
                  <li>Access, update, or correct your profile information.</li>
                  <li>Request deletion of your account (subject to legal requirements).</li>
                  <li>Opt out of non-essential communications (where offered).</li>
                </ul>

                <div className="pp-callout">
                  <p className="pp-p" style={{ margin: 0 }}>
                    For requests, email us at{" "}
                    <a className="pp-link" href="mailto:support@hirenow.com">
                      support@hirenow.com
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section id="children" className="pp-section">
                <div className="pp-h">Children’s privacy</div>
                <p className="pp-p">
                  HireNow is not intended for children under 13 (or the minimum age required in your
                  region). We do not knowingly collect personal data from children.
                </p>
              </section>

              <section id="changes" className="pp-section">
                <div className="pp-h">Changes to this policy</div>
                <p className="pp-p">
                  We may update this Privacy Policy from time to time. When we do, we will revise
                  the “Last updated” date at the top of this page.
                </p>
              </section>

              <section id="contact" className="pp-section">
                <div className="pp-h">Contact</div>
                <p className="pp-p">
                  If you have questions about this Privacy Policy, contact us:
                </p>
                <ul className="pp-ul">
                  <li>Email: support@hirenow.com</li>
                  <li>Phone: +91 98765 43210</li>
                  <li>Location: India</li>
                </ul>
              </section>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
