import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { employerMe } from "../services/employerService"; // existing
import { clearEmployerToken } from "../services/employerAuthService"; // existing
import { getMyJobs, deleteMyJob } from "../services/employerJobService";
import { getApplicantsForJob } from "../services/employerApplicationService"; // ✅ NEW
import "./EmployerDashboard.css";

export default function EmployerDashboard() {
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ✅ optional: show applicant count per job
  const [appCount, setAppCount] = useState(() => ({})); // { [jobId]: number }
  const [countLoading, setCountLoading] = useState(() => new Set()); // jobIds currently counting

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const profile = await employerMe();
      setMe(profile);

      const list = await getMyJobs();
      setJobs(Array.isArray(list) ? list : []);
    } catch (e) {
      clearEmployerToken();
      nav("/employer/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ fetch applicant count per job (lazy / on demand)
  const loadCount = async (jobId) => {
    if (!jobId) return;
    if (countLoading.has(jobId)) return;

    const nextLoading = new Set(countLoading);
    nextLoading.add(jobId);
    setCountLoading(nextLoading);

    try {
      const list = await getApplicantsForJob(jobId);
      const n = Array.isArray(list) ? list.length : 0;
      setAppCount((p) => ({ ...p, [jobId]: n }));
    } catch {
      // ignore count errors (still allow navigation)
      setAppCount((p) => ({ ...p, [jobId]: 0 }));
    } finally {
      const done = new Set(nextLoading);
      done.delete(jobId);
      setCountLoading(done);
    }
  };

  const logout = () => {
    clearEmployerToken();
    nav("/employer/login");
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteMyJob(id);
      setJobs((p) => p.filter((j) => j.id !== id));
      setAppCount((p) => {
        const cp = { ...p };
        delete cp[id];
        return cp;
      });
    } catch {
      setErr("Delete failed. Try again.");
    }
  };

  if (loading) return <div className="empd-loading">Loading...</div>;

  return (
    <div className="empd-page">
      <div className="empd-top">
        <div className="empd-title">
          <h2>Employer Dashboard</h2>
          <p>Post, edit and manage your jobs</p>
        </div>

        <div className="empd-actions">
          <button className="empd-btn primary" onClick={() => nav("/employer/jobs/new")}>
            + Add Job
          </button>
          <button className="empd-btn ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {err && <div className="empd-error">{err}</div>}

      <div className="empd-grid">
        <div className="empd-card">
          <h3>Profile</h3>
          <div className="empd-kv">
            <b>Name:</b> <span>{me?.name}</span>
          </div>
          <div className="empd-kv">
            <b>Company:</b> <span>{me?.companyName}</span>
          </div>
          <div className="empd-kv">
            <b>Email:</b> <span>{me?.email}</span>
          </div>
          <div className="empd-kv">
            <b>Location:</b> <span>{me?.location}</span>
          </div>
        </div>

        <div className="empd-card">
          <div className="empd-card-head">
            <h3>My Jobs</h3>
            <span className="empd-badge">{jobs.length}</span>
          </div>

          {jobs.length === 0 ? (
            <div className="empd-empty">
              No jobs posted yet. Click <b>Add Job</b>.
            </div>
          ) : (
            <div className="empd-joblist">
              {jobs.map((job) => {
                const cnt = appCount[job.id];
                const isCntLoading = countLoading.has(job.id);

                return (
                  <div className="empd-job" key={job.id}>
                    <div className="empd-job-main">
                      <div className="empd-job-title">{job.title}</div>
                      <div className="empd-job-sub">
                        {job.location} • {job.jobtype} • ₹{job.salary}
                      </div>
                      <div className="empd-job-meta">
                        Exp: <b>{job.experience}</b> yrs
                      </div>

                      {/* ✅ Applicants badge (optional, loads on hover/focus) */}
                      <div
                        className="empd-appcount"
                        onMouseEnter={() => loadCount(job.id)}
                        onFocus={() => loadCount(job.id)}
                        tabIndex={0}
                        style={{ marginTop: 8 }}
                        title="Applicants count"
                      >
                        {isCntLoading ? (
                          <span>Applicants: ...</span>
                        ) : typeof cnt === "number" ? (
                          <span>
                            Applicants: <b>{cnt}</b>
                          </span>
                        ) : (
                          <span>Applicants: —</span>
                        )}
                      </div>
                    </div>

                    <div className="empd-job-actions">
                      {/* ✅ NEW: View Applicants */}
                      <button
                        className="empd-btn small"
                        onClick={() => nav(`/employer/jobs/${job.id}/applicants`)}
                      >
                        View Applicants
                      </button>

                      <button
                        className="empd-btn small"
                        onClick={() => nav(`/employer/jobs/${job.id}/edit`)}
                      >
                        Edit
                      </button>

                      <button
                        className="empd-btn small danger"
                        onClick={() => onDelete(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
