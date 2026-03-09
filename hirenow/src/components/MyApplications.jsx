import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";
import "./MyApplications.css";

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMyApplications();
      setApps(Array.isArray(data) ? data : []);
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const onChanged = () => load();
    window.addEventListener("applicationsChanged", onChanged);
    return () => window.removeEventListener("applicationsChanged", onChanged);
  }, []);

  const statusClass = (status = "") => {
    const s = String(status).toUpperCase();
    if (s.includes("ACCEPT")) return "status-accepted";
    if (s.includes("REJECT")) return "status-rejected";
    return "status-pending";
  };

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "");

  if (loading) return <p className="apps-page">Loading...</p>;

  return (
    <div className="apps-page">
      <h2 className="apps-title">My Applications</h2>

      {apps.length === 0 ? (
        <p className="apps-empty">No applications yet.</p>
      ) : (
        <div className="apps-list">
          {apps.map((a) => (
            <div key={a.applicationId} className="app-card">
              <div className="app-head">
                <div>
                  <div className="app-title">{a.title}</div>
                  <div className="app-sub">
                    {a.companyname} • {a.location}
                  </div>
                  <div className="app-sub" style={{ marginTop: 6 }}>
                    Applied on: {fmt(a.appliedAt)}
                  </div>
                </div>

                <span className={`status-pill ${statusClass(a.status)}`}>
                  {a.status}
                </span>
              </div>

              {a.employerMessage && (
                <div className="app-message" style={{ marginTop: 12 }}>
                  <span className="detail-label">Message:</span>{" "}
                  {a.employerMessage}
                </div>
              )}

              <div className="app-actions">
        <button
  className="app-btn"
  onClick={() => navigate("/", { state: { openJobId: a.jobId } })}
  disabled={!a.jobId}
>
  View Job
</button>



              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
