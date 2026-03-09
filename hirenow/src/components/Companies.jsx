// Companies.jsx
import React, { useMemo, useState } from "react";
import "./Companies.css";

const demoCompanies = [
  { id: 1, name: "Google", location: "Bengaluru, IN", industry: "Product", openJobs: 42, logoUrl: "https://logo.clearbit.com/google.com" },
  { id: 2, name: "Microsoft", location: "Hyderabad, IN", industry: "Product", openJobs: 31, logoUrl: "https://logo.clearbit.com/microsoft.com" },
  { id: 3, name: "Amazon", location: "Bengaluru, IN", industry: "E-commerce", openJobs: 55, logoUrl: "https://logo.clearbit.com/amazon.com" },
  { id: 4, name: "Flipkart", location: "Bengaluru, IN", industry: "E-commerce", openJobs: 19, logoUrl: "https://logo.clearbit.com/flipkart.com" },
  { id: 5, name: "TCS", location: "Mumbai, IN", industry: "IT Services", openJobs: 120, logoUrl: "https://logo.clearbit.com/tcs.com" },
  { id: 6, name: "Infosys", location: "Pune, IN", industry: "IT Services", openJobs: 88, logoUrl: "https://logo.clearbit.com/infosys.com" },
  { id: 7, name: "Wipro", location: "Chennai, IN", industry: "IT Services", openJobs: 64, logoUrl: "https://logo.clearbit.com/wipro.com" },
  { id: 8, name: "Capgemini", location: "Noida, IN", industry: "Consulting", openJobs: 47, logoUrl: "https://logo.clearbit.com/capgemini.com" },
  { id: 9, name: "Accenture", location: "Gurugram, IN", industry: "Consulting", openJobs: 73, logoUrl: "https://logo.clearbit.com/accenture.com" },
  { id: 10, name: "HCLTech", location: "Noida, IN", industry: "IT Services", openJobs: 59, logoUrl: "https://logo.clearbit.com/hcltech.com" },
  { id: 11, name: "Zomato", location: "Gurugram, IN", industry: "Food Tech", openJobs: 12, logoUrl: "https://logo.clearbit.com/zomato.com" },
  { id: 12, name: "Swiggy", location: "Bengaluru, IN", industry: "Food Tech", openJobs: 15, logoUrl: "https://logo.clearbit.com/swiggy.com" },
  { id: 13, name: "Paytm", location: "Noida, IN", industry: "Fintech", openJobs: 22, logoUrl: "https://logo.clearbit.com/paytm.com" },
  { id: 14, name: "Razorpay", location: "Bengaluru, IN", industry: "Fintech", openJobs: 18, logoUrl: "https://logo.clearbit.com/razorpay.com" },
  { id: 15, name: "PhonePe", location: "Bengaluru, IN", industry: "Fintech", openJobs: 27, logoUrl: "https://logo.clearbit.com/phonepe.com" },
  { id: 16, name: "Reliance Industries", location: "Mumbai, IN", industry: "Conglomerate", openJobs: 33, logoUrl: "https://logo.clearbit.com/ril.com" },
  { id: 17, name: "Adani Group", location: "Ahmedabad, IN", industry: "Conglomerate", openJobs: 21, logoUrl: "https://logo.clearbit.com/adani.com" },
  { id: 18, name: "Byju's", location: "Bengaluru, IN", industry: "EdTech", openJobs: 9, logoUrl: "https://logo.clearbit.com/byjus.com" },
  { id: 19, name: "Unacademy", location: "Bengaluru, IN", industry: "EdTech", openJobs: 11, logoUrl: "https://logo.clearbit.com/unacademy.com" },
  { id: 20, name: "Lenskart", location: "Delhi, IN", industry: "Retail", openJobs: 14, logoUrl: "https://logo.clearbit.com/lenskart.com" },
  { id: 21, name: "Nykaa", location: "Mumbai, IN", industry: "Retail", openJobs: 17, logoUrl: "https://logo.clearbit.com/nykaa.com" },
  { id: 22, name: "Ola", location: "Bengaluru, IN", industry: "Mobility", openJobs: 13, logoUrl: "https://logo.clearbit.com/olacabs.com" },
  { id: 23, name: "Uber", location: "Hyderabad, IN", industry: "Mobility", openJobs: 25, logoUrl: "https://logo.clearbit.com/uber.com" },
  { id: 24, name: "IBM", location: "Bengaluru, IN", industry: "Product", openJobs: 39, logoUrl: "https://logo.clearbit.com/ibm.com" },
  { id: 25, name: "Oracle", location: "Hyderabad, IN", industry: "Product", openJobs: 28, logoUrl: "https://logo.clearbit.com/oracle.com" }
];


function initials(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]?.toUpperCase()).join("") || "C";
}

export default function Companies({
  companies = demoCompanies,
  onViewCompany, // optional: (company) => void
}) {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All");

  const industries = useMemo(() => {
    const set = new Set(companies.map(c => c.industry).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [companies]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return companies.filter((c) => {
      const matchQ =
        !query ||
        c.name?.toLowerCase().includes(query) ||
        c.location?.toLowerCase().includes(query) ||
        c.industry?.toLowerCase().includes(query);

      const matchIndustry = industry === "All" || c.industry === industry;
      return matchQ && matchIndustry;
    });
  }, [companies, q, industry]);

  return (
    <section className="cmp-wrap">
      <div className="cmp-head">
        <div>
          <h2 className="cmp-title">Companies</h2>
          <p className="cmp-sub">Explore top companies and see open roles.</p>
        </div>

        <div className="cmp-controls">
          <div className="cmp-search">
            <span className="cmp-searchIcon">⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="cmp-input"
              placeholder="Search company, location, industry..."
            />
          </div>

          <select
            className="cmp-select"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {industries.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cmp-grid">
        {filtered.map((c) => (
          <button
            key={c.id}
            type="button"
            className="cmp-card"
            onClick={() => onViewCompany?.(c)}
            title="View company"
          >
            <div className="cmp-logo">
              {c.logoUrl ? (
                <img
                  src={c.logoUrl}
                  alt={`${c.name} logo`}
                  loading="lazy"
                  onError={(e) => {
                    // fallback to initials if logo fails
                    e.currentTarget.style.display = "none";
                    e.currentTarget.closest(".cmp-logo")?.setAttribute("data-fallback", "1");
                  }}
                />
              ) : null}

              {/* Fallback initials */}
              <div className="cmp-fallback">{initials(c.name)}</div>
            </div>

            <div className="cmp-info">
              <div className="cmp-topRow">
                <div className="cmp-name">{c.name}</div>
                <span className="cmp-badge">{c.openJobs ?? 0} Jobs</span>
              </div>

              <div className="cmp-meta">
                <span className="cmp-dot" />
                <span>{c.industry || "—"}</span>
                <span className="cmp-sep">•</span>
                <span>{c.location || "—"}</span>
              </div>

              <div className="cmp-cta">
                <span>View Company</span>
                <span className="cmp-arrow">→</span>
              </div>
            </div>

            <div className="cmp-glow" />
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="cmp-empty">
            <div className="cmp-emptyTitle">No companies found</div>
            <div className="cmp-emptySub">Try a different keyword or industry filter.</div>
          </div>
        )}
      </div>
    </section>
  );
}
