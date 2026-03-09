import axios from "axios";

const BASE_URL = "http://localhost:8080/api/jobs";

/**
 * ✅ UPDATED:
 * - Uses new backend endpoints:
 *   - Public:  GET /api/jobs/public/search
 *   - User:    GET /api/jobs/search
 * - Supports filters:
 *   q, location, experience, jobType, sort (LATEST | SALARY_LOW | SALARY_HIGH)
 * - Still auto handles token + fallback to public if token invalid
 */
export const getAllJobs = async (filters = {}) => {
  const token = localStorage.getItem("token");

  // build query params
  const params = {};
  if (filters.q) params.q = filters.q;
  if (filters.location) params.location = filters.location;

  if (filters.experience !== "" && filters.experience !== null && filters.experience !== undefined) {
    params.experience = Number(filters.experience);
  }

  if (filters.jobType) params.jobType = filters.jobType;
  if (filters.sort) params.sort = filters.sort; // LATEST | SALARY_LOW | SALARY_HIGH

  // 🔓 No token → public search (30 min delayed)
  if (!token) {
    const res = await axios.get(`${BASE_URL}/public/search`, { params });
    return res.data;
  }

  // 🔐 Token present → user search (premium gets all instantly)
  try {
    const res = await axios.get(`${BASE_URL}/search`, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    // ⚠️ token expired / invalid → fallback to public
    const res = await axios.get(`${BASE_URL}/public/search`, { params });
    return res.data;
  }
};

// ✅ Job Details (ID based – public safe)
// NOTE: Only works if backend has GET /api/jobs/{id}
export const getJobById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
