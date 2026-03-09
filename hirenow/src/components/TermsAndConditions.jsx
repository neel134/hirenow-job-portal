import React from "react";

export default function TermsAndConditions() {
  const effectiveDate = "February 8, 2026";

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
          --warn: #fbbf24;
        }

        .tc-wrap {
          min-height: 100vh;
          background: var(--bg-dark);
          padding: 60px 20px;
        }

        .tc-inner {
          max-width: 980px;
          margin: auto;
        }

        .tc-hero {
          text-align: center;
          margin-bottom: 26px;
        }

        .tc-title {
          font-size: 34px;
          font-weight: 850;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .tc-sub {
          color: var(--text-muted);
          font-size: 14px;
          max-width: 760px;
          margin: auto;
          line-height: 1.7;
        }

        .tc-meta {
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

        .tc-meta b {
          color: var(--text-main);
          font-weight: 600;
        }

        .tc-card {
          background: var(--card-dark);
          border: 1px solid var(--border-dark);
          border-radius: 18px;
          padding: 24px;
          margin-top: 22px;
        }

        .tc-section {
          padding: 18px 0;
          border-bottom: 1px solid rgba(31, 41, 55, 0.7);
        }

        .tc-section:last-child {
          border-bottom: none;
        }

        .tc-h {
          color: var(--text-main);
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .tc-p {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.75;
          margin: 8px 0;
        }

        .tc-ul {
          margin: 10px 0 0 0;
          padding-left: 18px;
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .tc-ul li {
          margin: 6px 0;
        }

        .tc-callout {
          margin: 12px 0 0 0;
          border-radius: 14px;
          border: 1px solid rgba(251, 191, 36, 0.35);
          padding: 14px;
          background: rgba(251, 191, 36, 0.08);
        }

        .tc-callout b {
          color: var(--text-main);
        }

        .tc-link {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px dashed rgba(168,85,247,0.55);
        }

        .tc-link:hover {
          border-bottom-style: solid;
        }

        .tc-badgeRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .tc-badge {
          font-size: 12px;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.06);
        }
      `}</style>

      <section className="tc-wrap">
        <div className="tc-inner">
          <div className="tc-hero">
            <h1 className="tc-title">Terms & Conditions</h1>
            <p className="tc-sub">
              These Terms govern your use of HireNow (website, apps, and services). By using HireNow,
              you agree to these Terms. If you do not agree, please do not use the platform.
            </p>

            <div className="tc-meta">
              <span>Effective date:</span> <b>{effectiveDate}</b>
            </div>
          </div>

          <div className="tc-card">
            <div className="tc-section">
              <div className="tc-h">1) About HireNow</div>
              <p className="tc-p">
                HireNow is a job portal that helps candidates discover opportunities and helps
                recruiters manage hiring. HireNow may update features and services from time to time.
              </p>
              <div className="tc-badgeRow">
                <span className="tc-badge">Jobs</span>
                <span className="tc-badge">Applications</span>
                <span className="tc-badge">Recruiter Tools</span>
                <span className="tc-badge">Subscriptions</span>
              </div>
            </div>

            <div className="tc-section">
              <div className="tc-h">2) Eligibility</div>
              <p className="tc-p">
                You must be at least the minimum age required by your local laws to use HireNow. You
                agree that the information you provide is accurate and belongs to you.
              </p>
            </div>

            <div className="tc-section">
              <div className="tc-h">3) Accounts & Security</div>
              <ul className="tc-ul">
                <li>You are responsible for your account credentials and all activity under your account.</li>
                <li>Do not share passwords or access tokens with others.</li>
                <li>Notify us if you suspect unauthorized access to your account.</li>
              </ul>
            </div>

            <div className="tc-section">
              <div className="tc-h">4) Candidate Rules</div>
              <ul className="tc-ul">
                <li>Do not upload false, misleading, or copied resumes.</li>
                <li>Do not apply using impersonated identity or fake details.</li>
                <li>Use HireNow respectfully—no harassment, spam, or abuse.</li>
              </ul>
            </div>

            <div className="tc-section">
              <div className="tc-h">5) Recruiter/Employer Rules</div>
              <ul className="tc-ul">
                <li>Jobs posted must be genuine and relevant.</li>
                <li>No scams, misleading salary/role claims, or collecting data for unrelated marketing.</li>
                <li>You must handle candidate information responsibly and lawfully.</li>
              </ul>

              <div className="tc-callout">
                <p className="tc-p" style={{ margin: 0 }}>
                  <b>Important:</b> If we detect fraud/scam patterns, we may remove content and
                  suspend accounts without notice.
                </p>
              </div>
            </div>

            <div className="tc-section">
              <div className="tc-h">6) Content Ownership</div>
              <p className="tc-p">
                You own your content (resume, profile, job posts). By submitting content to HireNow,
                you grant HireNow permission to host, display, and process it for operating the
                platform (e.g., showing your resume to employers when you apply).
              </p>
            </div>

            <div className="tc-section">
              <div className="tc-h">7) Prohibited Activities</div>
              <ul className="tc-ul">
                <li>Hacking, exploiting, scraping, or reverse engineering the platform.</li>
                <li>Uploading viruses, malware, or harmful code.</li>
                <li>Using HireNow for illegal activity or policy violation.</li>
                <li>Attempting to bypass access controls or security.</li>
              </ul>
            </div>

            <div className="tc-section">
              <div className="tc-h">8) Subscriptions & Payments (if applicable)</div>
              <p className="tc-p">
                HireNow may offer paid plans for candidates or recruiters. Pricing, billing cycle,
                benefits, and renewal rules will be displayed at checkout. Payments may be processed
                via third-party providers (e.g., Razorpay).
              </p>
              <ul className="tc-ul">
                <li>Paid features are available only after successful payment confirmation.</li>
                <li>We may change plans/pricing; changes apply for future billing periods.</li>
                <li>Refunds (if any) follow the Refund/Cancellation policy on the platform.</li>
              </ul>
            </div>

            <div className="tc-section">
              <div className="tc-h">9) Termination</div>
              <p className="tc-p">
                We may suspend or terminate your access if you violate these Terms or misuse the
                platform. You may stop using HireNow at any time.
              </p>
            </div>

            <div className="tc-section">
              <div className="tc-h">10) Disclaimer</div>
              <p className="tc-p">
                HireNow is provided “as is”. We do not guarantee job offers, hiring outcomes, or the
                accuracy of third-party postings. Recruiters and candidates are responsible for
                their communications and decisions.
              </p>
            </div>

            <div className="tc-section">
              <div className="tc-h">11) Limitation of Liability</div>
              <p className="tc-p">
                To the extent permitted by law, HireNow will not be liable for indirect damages,
                lost profits, or losses resulting from your use of the platform.
              </p>
            </div>

            <div className="tc-section">
              <div className="tc-h">12) Changes to Terms</div>
              <p className="tc-p">
                We may update these Terms. When updated, we will revise the effective date shown at
                the top of this page.
              </p>
            </div>

            <div className="tc-section">
              <div className="tc-h">13) Contact</div>
              <p className="tc-p">
                If you have questions about these Terms, contact us at{" "}
                <a className="tc-link" href="mailto:support@hirenow.com">
                  support@hirenow.com
                </a>
                .
              </p>
              <ul className="tc-ul">
                <li>Email: support@hirenow.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Location: India</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
