// JobCard.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./JobCard.css";
import { useNavigate } from "react-router-dom";
import { saveJob, unsaveJob, getSavedJobIds } from "../services/savedJobService";
import { applyToJob } from "../services/applicationService";
import { getJobById } from "../services/jobsservice";

const variants = ["peach", "mint", "lav", "sky", "rose", "sand"];

function formatDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toLPA(salary) {
  if (salary === null || salary === undefined || salary === "") return "—";
  const n = Number(salary);
  if (Number.isNaN(n) || n <= 0) return "—";
  const lpa = n / 100000;
  const clean = (Math.round(lpa * 100) / 100).toString().replace(/\.0+$/, "");
  return `${clean} LPA`;
}

function BookmarkIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" className={`bmSvg ${active ? "active" : ""}`} aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="miniSvg" aria-hidden="true">
      <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Zm0-9.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
    </svg>
  );
}

/** ✅ Exported so SavedJobs page can reuse JUST the card */
export function JobCardItem({
  job,
  index,
  open,
  onToggle,
  isSaved,
  onToggleSave,
  isApplied,
  applying,
  onApply,
}) {
  const variant = variants[index % variants.length];

  return (
    <article className="jobOuter">
      <div className={`jobInner v-${variant}`}>
        <div className="jobTop">
          <span className="datePill">{formatDate(job.postedDate)}</span>

          <button
            className="bookmarkBtn"
            type="button"
            aria-label="Bookmark"
            title={isSaved ? "Saved" : "Save job"}
            onClick={() => onToggleSave(job)}
          >
            <BookmarkIcon active={isSaved} />
          </button>
        </div>

        <div className="jobHead">
          <div className="leftHead">
            <div className="company">{job.companyname || "Company"}</div>
            <div className="role">{job.title || "Role title"}</div>
          </div>

          <div className="rightLogoWrap" title={job.companyname || ""}>
            <img
              className="rightLogo"
              src={job.img}
              alt={job.companyname || job.title || "Company"}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="tagRow">
          <span className="tag">{job.jobtype || "Full time"}</span>
          <span className="tag">{(job.experience ?? 0) + "+ yrs"}</span>
        </div>
      </div>

      <div className="jobFooter">
        <div className="payBlock">
          <div className="salary">{toLPA(job.salary)}</div>
          <div className="loc">
            <PinIcon />
            <span className="locText">{job.location || "—"}</span>
          </div>
        </div>

        <button className="detailsBtn" type="button" onClick={onToggle}>
          {open ? "Hide" : "Details"}
        </button>
      </div>

      <div className={`expand ${open ? "show" : ""}`}>
        <div className="expandInner">
          <div className="expTitle">Description</div>
          <p className="expText">{job.description || "No description provided."}</p>

          <button
            className={`applyBtn ${isApplied ? "applied" : ""}`}
            type="button"
            onClick={() => onApply(job.id)}
            disabled={isApplied || applying}
            title={isApplied ? "Already applied" : "Apply to this job"}
          >
            {isApplied ? "Applied ✓" : applying ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function JobCard({ jobs = [], filters, setFilters, sort, setSort }) {
  const [openId, setOpenId] = useState(null);

  const [savedIds, setSavedIds] = useState(() => new Set());
  const [savingId, setSavingId] = useState(null);

  const [appliedIds, setAppliedIds] = useState(() => new Set());
  const [applyingId, setApplyingId] = useState(null);

  // ✅ Modal state (for View Job from MyApplications)
  const [jdOpen, setJdOpen] = useState(false);
  const [jdLoading, setJdLoading] = useState(false);
  const [jdJob, setJdJob] = useState(null);

  // ✅ Filters UI state
  const [filtersOpen, setFiltersOpen] = useState(true);

  // ✅ Pagination (9 at a time)
  const PAGE_SIZE = 9;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const navigate = useNavigate();

  // ✅ show only 9/18/27...
  const visibleJobs = useMemo(() => jobs.slice(0, visibleCount), [jobs, visibleCount]);
  const hasMore = visibleCount < jobs.length;

  useEffect(() => {
    // when new search/filter happens => reset to first 9
    setVisibleCount(PAGE_SIZE);
  }, [jobs.length]);

  const loadSavedIds = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSavedIds(new Set());
      return;
    }
    try {
      const ids = await getSavedJobIds();
      setSavedIds(new Set(Array.isArray(ids) ? ids : []));
    } catch {
      setSavedIds(new Set());
    }
  };

  const loadAppliedIds = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAppliedIds(new Set());
      return;
    }
    // optional: later endpoint "my applied jobIds"
  };

  const openJobDetails = async (jobId) => {
    if (!jobId) return;

    const found = jobs.find((j) => String(j.id) === String(jobId));
    if (found) {
      setJdJob(found);
      setJdOpen(true);
      return;
    }

    setJdLoading(true);
    try {
      const data = await getJobById(jobId);
      setJdJob(data);
      setJdOpen(true);
    } catch {
      alert("Job details not found.");
    } finally {
      setJdLoading(false);
    }
  };

  useEffect(() => {
    loadSavedIds();
    loadAppliedIds();

    const onAuthChanged = () => {
      loadSavedIds();
      loadAppliedIds();
    };
    const onSavedChanged = () => loadSavedIds();
    const onOpenJobDetails = (e) => openJobDetails(e.detail);

    window.addEventListener("authChanged", onAuthChanged);
    window.addEventListener("savedJobsChanged", onSavedChanged);
    window.addEventListener("openJobDetails", onOpenJobDetails);

    return () => {
      window.removeEventListener("authChanged", onAuthChanged);
      window.removeEventListener("savedJobsChanged", onSavedChanged);
      window.removeEventListener("openJobDetails", onOpenJobDetails);
    };
  }, [jobs]);

  const onToggleSave = async (job) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const id = job?.id;
    if (!id) return;

    if (savingId === id) return;
    setSavingId(id);

    const next = new Set(savedIds);
    const wasSaved = next.has(id);

    try {
      if (wasSaved) {
        next.delete(id);
        setSavedIds(next);
        await unsaveJob(id);
      } else {
        next.add(id);
        setSavedIds(next);
        await saveJob(id);
      }

      window.dispatchEvent(new Event("savedJobsChanged"));
    } catch {
      await loadSavedIds();
      alert("Save failed. Try again.");
    } finally {
      setSavingId(null);
    }
  };

  const onApply = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!jobId) return;
    if (applyingId === jobId) return;
    if (appliedIds.has(jobId)) return;

    setApplyingId(jobId);

    try {
      await applyToJob(jobId);

      const next = new Set(appliedIds);
      next.add(jobId);
      setAppliedIds(next);

      window.dispatchEvent(new Event("applicationsChanged"));
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data ||
        "Apply failed / Already applied";
      alert(msg);
    } finally {
      setApplyingId(null);
    }
  };

  // ✅ Working schedule -> backend jobType (single select)
  const setJobType = (type) => {
    setFilters((p) => ({
      ...p,
      jobType: type,
    }));
  };

  const clearFilters = () => {
    setFilters((p) => ({ ...p, jobType: "" }));
  };

  const goFaq = () => {
    navigate("/faq");
  };

  return (
    <div className="pageWrap">
      <div className="jobsLayout">
        <aside className="sideCol">
          <div className="sidePromo">
            <div className="promoT1">Get your best profession</div>
            <div className="promoT2">with HireNow</div>

            <button className="promoBtn" type="button" onClick={goFaq}>
              Learn more
            </button>
          </div>

          <div className="sideFilters">
            <div className="sideTopRow">
              <div className="sideTitle">Filters</div>

              <div className="sideTopActions">
                <button
                  type="button"
                  className="miniBtn"
                  onClick={() => setFiltersOpen((p) => !p)}
                  title="Toggle filters"
                >
                  {filtersOpen ? "Hide" : "Show"}
                </button>

                <button
                  type="button"
                  className="miniBtn ghost"
                  onClick={clearFilters}
                  title="Clear filters"
                >
                  Clear
                </button>
              </div>
            </div>

            {filtersOpen && (
              <div className="sideGroup">
                <div className="sideLabel">Working schedule</div>

                {/* ✅ Premium pills */}
                <div className="pillGrid">
                  <button
                    type="button"
                    className={`pillBtn ${!filters?.jobType ? "active" : ""}`}
                    onClick={() => setJobType("")}
                  >
                    All
                  </button>

                  <button
                    type="button"
                    className={`pillBtn ${filters?.jobType === "FULLTIME" ? "active" : ""}`}
                    onClick={() => setJobType("FULLTIME")}
                  >
                    Full time
                  </button>

                  <button
                    type="button"
                    className={`pillBtn ${filters?.jobType === "PARTTIME" ? "active" : ""}`}
                    onClick={() => setJobType("PARTTIME")}
                  >
                    Part time
                  </button>

                  <button
                    type="button"
                    className={`pillBtn ${filters?.jobType === "INTERNSHIP" ? "active" : ""}`}
                    onClick={() => setJobType("INTERNSHIP")}
                  >
                    Internship
                  </button>

                  <button
                    type="button"
                    className={`pillBtn ${filters?.jobType === "PROJECTWORK" ? "active" : ""}`}
                    onClick={() => setJobType("PROJECTWORK")}
                  >
                    Project work
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main className="mainCol">
          <div className="topHeader">
            <div className="headLeft">
              <h2 className="title">Recommended jobs</h2>
              <span className="count">{jobs.length}</span>
            </div>

            <div className="sortWrap">
              <span className="sortText">Sort by</span>

              <div className="sortBox">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="sortSelect"
                >
                  <option value="LATEST">Latest posted</option>
                  <option value="SALARY_LOW">Salary: Low to High</option>
                  <option value="SALARY_HIGH">Salary: High to Low</option>
                </select>
                <span className="sortChevron">▾</span>
              </div>
            </div>
          </div>

          <section className="gridWrap">
            {visibleJobs.map((job, index) => {
              const key = job.id ?? `${job.title}-${index}`;
              const open = openId === key;

              const isSaved = job?.id ? savedIds.has(job.id) : false;
              const isApplied = job?.id ? appliedIds.has(job.id) : false;
              const applying = applyingId === job?.id;

              return (
                <JobCardItem
                  key={key}
                  job={job}
                  index={index}
                  open={open}
                  isSaved={isSaved}
                  isApplied={isApplied}
                  applying={applying}
                  onApply={onApply}
                  onToggleSave={onToggleSave}
                  onToggle={() => setOpenId((p) => (p === key ? null : key))}
                />
              );
            })}
          </section>

          {/* ✅ View more */}
          {hasMore && (
            <div className="viewMoreWrap">
              <button
                type="button"
                className="viewMoreBtn"
                onClick={() => setVisibleCount((p) => p + PAGE_SIZE)}
              >
                View more
              </button>
              <div className="viewMoreMeta">
                Showing <b>{Math.min(visibleCount, jobs.length)}</b> of <b>{jobs.length}</b>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ✅ Job Details Modal */}
      {jdOpen && (
        <div className="jd-overlay" onClick={() => setJdOpen(false)}>
          <div className="jd-modal" onClick={(e) => e.stopPropagation()}>
            {jdLoading ? (
              <div className="jd-loading">Loading...</div>
            ) : jdJob ? (
              <>
                <div className="jd-head">
                  <div>
                    <div className="jd-title">{jdJob.title}</div>
                    <div className="jd-sub">
                      {jdJob.companyname} • {jdJob.location}
                    </div>
                  </div>

                  <button className="jd-close" onClick={() => setJdOpen(false)}>
                    ✕
                  </button>
                </div>

                <div className="jd-row">
                  <span>Job Type</span>
                  <b>{jdJob.jobtype || "—"}</b>
                </div>
                <div className="jd-row">
                  <span>Experience</span>
                  <b>{(jdJob.experience ?? 0) + " yrs"}</b>
                </div>
                <div className="jd-row">
                  <span>Salary</span>
                  <b>{toLPA(jdJob.salary)}</b>
                </div>
                <div className="jd-row">
                  <span>Posted</span>
                  <b>{formatDate(jdJob.postedDate)}</b>
                </div>

                <div className="jd-desc">
                  {jdJob.description || "No description provided."}
                </div>
              </>
            ) : (
              <div className="jd-loading">No data</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
