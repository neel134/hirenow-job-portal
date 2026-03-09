import axios from "axios";
import { employerAuthHeader } from "./employerAuthService";

const API = "http://localhost:8080";

export const employerMe = async () => {
  const res = await axios.get(`${API}/employer/me`, {
    headers: employerAuthHeader(),
  });
  return res.data;
};

export const employerUpdateMe = async (payload) => {
  const res = await axios.put(`${API}/employer/me`, payload, {
    headers: employerAuthHeader(),
  });
  return res.data;
};

export const employerChangePassword = async (payload) => {
  const res = await axios.put(`${API}/employer/me/password`, payload, {
    headers: employerAuthHeader(),
  });
  return res.data;
};

export const employerDeleteMe = async () => {
  const res = await axios.delete(`${API}/employer/me`, {
    headers: employerAuthHeader(),
  });
  return res.data;
};
