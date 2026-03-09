import React, { useState } from "react";

export default function ContactUs() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSent(true);      // show message
    e.target.reset();  // reset form

    setTimeout(() => setSent(false), 3000);
  };

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
          --success: #22c55e;
        }

        .contact-wrap {
          min-height: 100vh;
          background: var(--bg-dark);
          padding: 60px 20px;
        }

        .contact-inner {
          max-width: 1100px;
          margin: auto;
        }

        .contact-head {
          text-align: center;
          margin-bottom: 48px;
        }

        .contact-title {
          font-size: 34px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 10px;
        }

        .contact-sub {
          font-size: 15px;
          color: var(--text-muted);
          max-width: 620px;
          margin: auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
        }

        .contact-card {
          background: var(--card-dark);
          border: 1px solid var(--border-dark);
          border-radius: 18px;
          padding: 28px;
        }

        .contact-card h3 {
          color: var(--text-main);
          font-size: 20px;
          margin-bottom: 18px;
        }

        .contact-form {
          display: grid;
          gap: 16px;
        }

        .contact-form input,
        .contact-form textarea {
          background: transparent;
          border: 1px solid var(--border-dark);
          border-radius: 12px;
          padding: 12px 14px;
          color: var(--text-main);
          font-size: 14px;
          outline: none;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-form textarea {
          resize: none;
          min-height: 120px;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent-soft);
        }

        .contact-btn {
          margin-top: 6px;
          background: linear-gradient(135deg, #9333ea, #a855f7);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(168, 85, 247, 0.35);
        }

        .contact-success {
          margin-top: 12px;
          font-size: 14px;
          color: var(--success);
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.4);
          padding: 10px 12px;
          border-radius: 10px;
          text-align: center;
        }

        .info-item {
          display: flex;
          gap: 14px;
          margin-bottom: 18px;
          color: var(--text-main);
        }

        .info-ic {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: rgba(168, 85, 247, 0.15);
          color: var(--accent);
          font-size: 18px;
        }

        .info-text span {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="contact-wrap">
        <div className="contact-inner">
          <div className="contact-head">
            <h1 className="contact-title">Contact HireNow</h1>
            <p className="contact-sub">
              Have a question, partnership idea, or need support?  
              We’ll reach out to you soon.
            </p>
          </div>

          <div className="contact-grid">
            {/* FORM */}
            <div className="contact-card">
              <h3>Send us a message</h3>

              <form className="contact-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Your Message" required />

                <button className="contact-btn">Send Message</button>

                {sent && (
                  <div className="contact-success">
                    ✅ We’ll reach out to you soon
                  </div>
                )}
              </form>
            </div>

            {/* INFO */}
            <div className="contact-card">
              <h3>Get in touch</h3>

              <div className="info-item">
                <div className="info-ic">📧</div>
                <div className="info-text">
                  support@hirenow.com
                  <span>Email us anytime</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-ic">📞</div>
                <div className="info-text">
                  +91 98765 43210
                  <span>Mon–Fri, 9am–6pm</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-ic">📍</div>
                <div className="info-text">
                  India
                  <span>Serving globally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
