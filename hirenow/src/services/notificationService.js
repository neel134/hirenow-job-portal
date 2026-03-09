import { api } from "./api";

export const getNotifications = async () => {
  const res = await api.get(`/api/notifications`);
  return res.data;
};

export const markNotificationRead = async (id) => {
  const res = await api.patch(`/api/notifications/${id}/read`);
  return res.data;
};
