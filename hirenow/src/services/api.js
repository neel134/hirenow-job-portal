import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const url = config.url || "";

  const isEmployerApi = url.startsWith("/api/employer") || url.startsWith("/employer");
  const isAdminApi = url.startsWith("/api/admin");

  const employerToken = localStorage.getItem("employerToken");
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");

  const token = isAdminApi ? adminToken : isEmployerApi ? employerToken : userToken;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;

  return config;
});
