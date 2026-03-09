import axios from "axios";

const BASE_URL = "http://localhost:8080"; // change if needed

const authHeader = () => {
  // ✅ change key if your token key is different
  const token = localStorage.getItem("employerToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ My jobs list
export const getMyJobs = async () => {
  const res = await axios.get(`${BASE_URL}/employer/jobs`, {
    headers: authHeader(),
  });
  return res.data;
};

// ✅ Create job (linked to employer via backend)
export const createMyJob = async (payload) => {
  const res = await axios.post(`${BASE_URL}/employer/jobs`, payload, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
  return res.data;
};

// ✅ Update my job
export const updateMyJob = async (id, payload) => {
  const res = await axios.put(`${BASE_URL}/employer/jobs/${id}`, payload, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
  return res.data;
};

// ✅ Delete my job
export const deleteMyJob = async (id) => {
  const res = await axios.delete(`${BASE_URL}/employer/jobs/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};
