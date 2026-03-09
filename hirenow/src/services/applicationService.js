import { api } from "./api";

export const applyToJob = async (jobId) => {
  const res = await api.post(`/api/applications/apply/${jobId}`);
  return res.data;
};

export const getMyApplications = async () => {
  const res = await api.get(`/api/applications/my`);
  return res.data;
};
