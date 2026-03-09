import React, { useEffect, useState } from "react";
import { getNotifications, markNotificationRead } from "../services/notificationService";
import "./Notifications.css";

export default function Notifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    try {
      await markNotificationRead(id);
      load();
    } catch {
      alert("Failed to mark read");
    }
  };

  if (loading) return <p className="notifications-page">Loading...</p>;

  return (
    <div className="notifications-page">
      <h2 className="notifications-title">Notifications</h2>

      {list.length === 0 ? (
        <p className="notifications-empty">No notifications</p>
      ) : (
        <div className="notifications-list">
          {list.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${n.readFlag ? "read" : ""}`}
            >
              <div className="notification-message">{n.message}</div>
              <div className="notification-date">
                {new Date(n.createdAt).toLocaleString()}
              </div>

              {!n.readFlag && (
                <div className="notification-actions">
                  <button
                    className="notification-btn"
                    onClick={() => markRead(n.id)}
                  >
                    Mark read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
