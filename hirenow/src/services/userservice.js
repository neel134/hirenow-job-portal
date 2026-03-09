import axios from "axios";

const API = "http://localhost:8080/user";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMe = async () => {
  const res = await axios.get(`${API}/me`, { headers: authHeader() });
  return res.data;
};

export const updateMe = async (payload) => {
  const res = await axios.put(`${API}/me`, payload, { headers: authHeader() });
  return res.data;
};

export const deleteMe = async () => {
  const res = await axios.delete(`${API}/me`, { headers: authHeader() });
  return res.data;
};
export const changePassword = async (payload) =>
  (await axios.put(`${API}/change-password`, payload, { headers: authHeader() })).data;
