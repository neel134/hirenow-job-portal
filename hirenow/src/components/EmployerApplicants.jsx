import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decideApplication, getApplicantsForJob } from "../services/employerApplicationService";
import "./EmployerApplicants.css";

export default function EmployerApplicants() {
  const { jobId } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [list, setList] = useState([]);
  const [expanded, setExpanded] = useState(() => new Set()); // applicationId set
  const [doing, setDoing] = useState(null); // applicationId currently updating

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await getApplicantsForJob(jobId);
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("Failed to load applicants. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const toggleExpand = (applicationId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(applicationId)) next.delete(applicationId);
      else next.add(applicationId);
      return next;
    });
  };

  const decide = async (applicationId, decision) => {
    if (!applicationId) return;
    if (doing === applicationId) return;

    const defaultMsg =
      decision === "ACCEPTED"
        ? "Selected for interview"
        : "Thanks for applying, but we will not be moving forward";

    setDoing(applicationId);
    try {
      await decideApplication(applicationId, {
        decision,
        message: defaultMsg,
      });
      await load(); // refresh list
    } catch {
      alert("Action failed. Try again.");
    } finally {
      setDoing(null);
    }
  };

  if (loading) return <div className="eapp-page"><div className="eapp-loading">Loading...</div></div>;

  return (
    <div className="eapp-page">
      <div className="eapp-top">
        <button className="eapp-back" onClick={() => nav(-1)}>← Back</button>
        <div>
          <h2 className="eapp-title">Applicants</h2>
          <p className="eapp-sub">Job ID: {jobId}</p>
        </div>
        <div className="eapp-badge">{list.length}</div>
      </div>

      {err && <div className="eapp-error">{err}</div>}

      {list.length === 0 ? (
        <div className="eapp-empty">No one applied yet.</div>
      ) : (
        <div className="eapp-list">
          {list.map((a) => {
            const isOpen = expanded.has(a.applicationId);
            return (
              <div className="eapp-card" key={a.applicationId}>
                <div className="eapp-row">
                  <div className="eapp-left">
                    <div className="eapp-name">
                      {a.name} {a.surname}
                      <span className={`eapp-status s-${String(a.status || "").toLowerCase()}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="eapp-mini">{a.email} • {a.phone}</div>
                    <div className="eapp-mini">{a.location} • Exp: {a.experience} yrs</div>
                  </div>

                  <div className="eapp-actions">
                    <button className="eapp-btn ghost" onClick={() => toggleExpand(a.applicationId)}>
                      {isOpen ? "Hide" : "View Profile"}
                    </button>

                    <button
                      className="eapp-btn ok"
                      disabled={doing === a.applicationId || a.status === "ACCEPTED"}
                      onClick={() => decide(a.applicationId, "ACCEPTED")}
                    >
                      {doing === a.applicationId ? "..." : "Accept"}
                    </button>

                    <button
                      className="eapp-btn danger"
                      disabled={doing === a.applicationId || a.status === "REJECTED"}
                      onClick={() => decide(a.applicationId, "REJECTED")}
                    >
                      {doing === a.applicationId ? "..." : "Reject"}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="eapp-expand">
                    <div className="eapp-grid">
                      <div><b>Job Profile:</b> {a.jobProfile || "—"}</div>
                      <div><b>Education:</b> {a.education || "—"}</div>
                      <div className="full"><b>Skills:</b> {a.skills || "—"}</div>
                      <div className="full"><b>Resume:</b> {a.resume ? <a href={a.resume} target="_blank" rel="noreferrer">Open</a> : "—"}</div>
                    </div>

                    {a.profileImage && (
                      <div className="eapp-imgWrap">
                        <img className="eapp-img" src={a.profileImage} alt="profile" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
