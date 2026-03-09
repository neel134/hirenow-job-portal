import axios from "axios";

const API = "http://localhost:8080";

const tokenKey = "employerToken";

const authHeader = () => {
  const token = localStorage.getItem(tokenKey);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const setEmployerToken = (token) => {
  localStorage.setItem(tokenKey, token);
  window.dispatchEvent(new Event("employerAuthChanged"));
};

export const clearEmployerToken = () => {
  localStorage.removeItem(tokenKey);
  window.dispatchEvent(new Event("employerAuthChanged"));
};

export const getEmployerToken = () => localStorage.getItem(tokenKey);

export const employerRegister = async (payload) => {
  const res = await axios.post(`${API}/employer/auth/register`, payload);
  return res.data;
};

export const employerLogin = async ({ email, password }) => {
  const res = await axios.post(`${API}/employer/auth/login`, {
    email,
    password,
  });

  // backend returns raw token string
  const token = typeof res.data === "string" ? res.data : res.data?.token;
  if (!token) throw new Error("Token not received");

  setEmployerToken(token);
  return token;
};

// helper to use in other services
export const employerAuthHeader = () => authHeader();
