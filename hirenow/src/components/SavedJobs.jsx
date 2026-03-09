import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobCardItem } from "../components/JobCard";
import { getSavedJobs, getSavedJobIds, unsaveJob } from "../services/savedJobService";
import "./SavedJobs.css";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const [savedJobs, ids] = await Promise.all([getSavedJobs(), getSavedJobIds()]);
      setJobs(Array.isArray(savedJobs) ? savedJobs : []);
      setSavedIds(new Set(Array.isArray(ids) ? ids : []));
    } catch (e) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    // ✅ If you save/unsave from Job page, refresh here also
    const onSavedChanged = () => load();
    window.addEventListener("savedJobsChanged", onSavedChanged);
    return () => window.removeEventListener("savedJobsChanged", onSavedChanged);
  }, []);

  // ✅ only UNSAVE here (since this page itself is saved list)
  const onToggleSave = async (job) => {
    const id = job?.id;
    if (!id) return;

    try {
      await unsaveJob(id);
      window.dispatchEvent(new Event("savedJobsChanged"));
      await load();
    } catch {
      alert("Remove failed. Try again.");
    }
  };

  if (loading) return <div className="savedWrap"><div className="savedLoading">Loading saved jobs...</div></div>;

  return (
    <div className="savedWrap">
      <div className="savedTop">
        <h2 className="savedTitle">Saved jobs</h2>
        <span className="savedCount">{jobs.length}</span>
      </div>

      {jobs.length === 0 ? (
        <div className="savedEmpty">
          <div className="savedEmptyTitle">No saved jobs yet</div>
          <div className="savedEmptySub">Go to Jobs and tap bookmark to save.</div>
          <button className="savedGoBtn" onClick={() => navigate("/")}>
            Browse jobs
          </button>
        </div>
      ) : (
        <div className="savedGrid">
          {jobs.map((job, index) => {
            const key = job.id ?? `${job.title}-${index}`;
            const open = openId === key;
            const isSaved = job?.id ? savedIds.has(job.id) : true;

            return (
              <JobCardItem
                key={key}
                job={job}
                index={index}
                open={open}
                isSaved={isSaved}
                onToggleSave={onToggleSave}
                onToggle={() => setOpenId((p) => (p === key ? null : key))}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
