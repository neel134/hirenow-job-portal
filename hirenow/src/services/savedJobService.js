import axios from "axios";

const BASE_URL = "http://localhost:8080/api/saved-jobs";

const authHeaders = () => {
  // ✅ make sure this key matches your USER login token key
  const token = localStorage.getItem("token"); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveJob = async (jobId) => {
  await axios.post(`${BASE_URL}/${jobId}`, null, {
    headers: authHeaders(),
  });
};

export const unsaveJob = async (jobId) => {
  await axios.delete(`${BASE_URL}/${jobId}`, {
    headers: authHeaders(),
  });
};

export const getSavedJobs = async () => {
  const res = await axios.get(BASE_URL, {
    headers: authHeaders(),
  });
  return res.data;
};

export const getSavedJobIds = async () => {
  const res = await axios.get(`${BASE_URL}/ids`, {
    headers: authHeaders(),
  });
  return res.data;
};
