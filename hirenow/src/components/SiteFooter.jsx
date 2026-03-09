import React, { useState } from "react";
import "./ReviewsFooter.css";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    setSubscribed(true);       // show message
    e.target.reset();         // reset input

    setTimeout(() => setSubscribed(false), 3000); // auto-hide
  };

  return (
    <footer className="ft-wrap">
      <div className="ft-inner">
        <div className="ft-brand">
          <div className="ft-logo">
            <span className="ft-logoDot" />
            HireNow
          </div>

          <p className="ft-desc">
            A modern job portal for candidates and recruiters — faster hiring, cleaner experience,
            premium feel.
          </p>

          <div className="ft-pillRow">
            <span className="ft-pill">Jobs</span>
            <span className="ft-pill">Internships</span>
            <span className="ft-pill">Recruiters</span>
            <span className="ft-pill">Subscriptions</span>
          </div>
        </div>

        <div className="ft-cols">
          <div className="ft-col">
            <div className="ft-h">Company</div>
            <a className="ft-a" href="/about">About Us</a>
            <a className="ft-a" href="/contact">Contact</a>
            <a className="ft-a" href="/">How It Works</a>
            <a className="ft-a" href="/privacy">Privacy</a>
          </div>

          <div className="ft-col">
            <div className="ft-h">Support</div>
            <a className="ft-a" href="/help">Help Center</a>
            <a className="ft-a" href="/faq">FAQ</a>
            <a className="ft-a" href="/terms">Terms</a>
            <a className="ft-a" href="/contact">Report an Issue</a>
          </div>

          <div className="ft-col">
            <div className="ft-h">Stay Updated</div>
            <p className="ft-note">Get updates about new jobs & features.</p>

            <form className="ft-form" onSubmit={handleSubscribe}>
              <input
                className="ft-input"
                type="email"
                placeholder="Enter your email"
                required
              />
              <button className="ft-btn" type="submit">
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="ft-success">
                ✅ Newsletter subscribed
              </div>
            )}

            <div className="ft-social">
              <a className="ft-socialBtn" href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a className="ft-socialBtn" href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a className="ft-socialBtn" href="#" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} HireNow. All rights reserved.</span>
      </div>
    </footer>
  );
}
