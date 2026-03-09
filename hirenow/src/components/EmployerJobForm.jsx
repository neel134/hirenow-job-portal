import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMyJob, getMyJobs, updateMyJob } from "../services/employerJobService";
import "./EmployerJobForm.css";

const JOB_TYPES = ["FULLTIME", "PARTTIME", "INTERNSHIP", "CONTRACT"];

export default function EmployerJobForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = useMemo(() => Boolean(id), [id]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    title: "",
    companyname: "",
    description: "",
    location: "",
    jobtype: "FULLTIME",
    salary: "",
    experience: "",
    img: "",
  });

  const onChange = (e) => {
    setErr("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // ✅ edit mode: load job from my jobs list (simple)
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setLoading(true);
        const list = await getMyJobs();
        const job = (list || []).find((j) => String(j.id) === String(id));
        if (!job) {
          setErr("Job not found.");
          return;
        }
        setForm({
          title: job.title || "",
          companyname: job.companyname || "",
          description: job.description || "",
          location: job.location || "",
          jobtype: job.jobtype || "FULLTIME",
          salary: job.salary ?? "",
          experience: job.experience ?? "",
          img: job.img || "",
        });
      } catch {
        setErr("Failed to load job.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
        experience: Number(form.experience),
      };

      if (isEdit) {
        await updateMyJob(id, payload);
      } else {
        await createMyJob(payload);
      }
      nav("/employer/dashboard");
    } catch {
      setErr("Save failed. Check inputs & try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ejf-page">
      <div className="ejf-card">
        <div className="ejf-top">
          <div>
            <h2>{isEdit ? "Edit Job" : "Add Job"}</h2>
            <p>Fill job details and save.</p>
          </div>
          <button className="ejf-back" onClick={() => nav("/employer/dashboard")}>
            Back
          </button>
        </div>

        {err && <div className="ejf-error">{err}</div>}

        <form className="ejf-form" onSubmit={onSubmit}>
          <div className="ejf-row">
            <div className="ejf-field">
              <label>Title</label>
              <input name="title" value={form.title} onChange={onChange} required />
            </div>
            <div className="ejf-field">
              <label>Company Name</label>
              <input name="companyname" value={form.companyname} onChange={onChange} required />
            </div>
          </div>

          <div className="ejf-row">
            <div className="ejf-field">
              <label>Location</label>
              <input name="location" value={form.location} onChange={onChange} required />
            </div>
            <div className="ejf-field">
              <label>Job Type</label>
              <select name="jobtype" value={form.jobtype} onChange={onChange} required>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="ejf-row">
            <div className="ejf-field">
              <label>Salary (₹)</label>
              <input
                name="salary"
                value={form.salary}
                onChange={onChange}
                inputMode="numeric"
                required
              />
            </div>
            <div className="ejf-field">
              <label>Experience (years)</label>
              <input
                name="experience"
                value={form.experience}
                onChange={onChange}
                inputMode="decimal"
                required
              />
            </div>
          </div>

          <div className="ejf-field">
            <label>Image URL</label>
            <input name="img" value={form.img} onChange={onChange} placeholder="https://..." />
          </div>

          <div className="ejf-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              required
            />
          </div>

          <button className="ejf-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
