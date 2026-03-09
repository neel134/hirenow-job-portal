// JobList.jsx
import { useEffect, useMemo, useState } from "react";
import { getAllJobs } from "../services/jobsservice";
import JobCard from "./JobCard";
import { useLocation, useSearchParams } from "react-router-dom";

export default function JobList() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // ✅ URL se filters uthao (JobLanding navigate("/?q=..") wala)
  const urlFilters = useMemo(() => {
    return {
      q: searchParams.get("q") || "",
      location: searchParams.get("location") || "",
      experience: searchParams.get("experience") || "",
      jobType: searchParams.get("jobType") || "",
      sort: searchParams.get("sort") || "LATEST",
    };
  }, [searchParams]);

  // ✅ state (so sidebar/sort change can update)
  const [filters, setFilters] = useState({
    q: "",
    location: "",
    experience: "",
    jobType: "",
  });
  const [sort, setSort] = useState("LATEST");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ whenever URL changes -> sync into state
  useEffect(() => {
    setFilters({
      q: urlFilters.q,
      location: urlFilters.location,
      experience: urlFilters.experience,
      jobType: urlFilters.jobType,
    });
    setSort(urlFilters.sort);
  }, [urlFilters.q, urlFilters.location, urlFilters.experience, urlFilters.jobType, urlFilters.sort]);

  // ✅ fetch whenever filters / sort changes
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getAllJobs({ ...filters, sort })
      .then((data) => {
        if (!mounted) return;
        setJobs(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!mounted) return;
        setJobs([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [filters.q, filters.location, filters.experience, filters.jobType, sort]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <JobCard
        jobs={jobs}
        openJobId={location?.state?.openJobId}
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
}
