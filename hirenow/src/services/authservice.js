import axios from "axios";

const API_BASE = "http://localhost:8080/auth";

export const registerUser = async (payload) => {
  const res = await axios.post(`${API_BASE}/register`, payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await axios.post(`${API_BASE}/login`, payload);
  return res.data; // token string
};

// ✅ save user token
export const saveAuth = (token) => {
  localStorage.setItem("token", token);
};

// ✅ save admin token
export const saveAdminAuth = (token) => {
  localStorage.setItem("adminToken", token);
};

// ✅ logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ✅ logout admin
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
};
