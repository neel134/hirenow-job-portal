import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/stats");
      setStats(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      {
        title: "Total Users",
        value: stats.totalUsers,
        meta: `Active: ${stats.activeUsers} • Blocked: ${stats.blockedUsers}`,
        to: "/admin/users",
      },
      {
        title: "Employers",
        value: stats.totalEmployers,
        meta: `Pending: ${stats.pendingEmployers} • Active: ${stats.activeEmployers}`,
        to: "/admin/employers",
      },
      {
        title: "Total Jobs",
        value: stats.totalJobs,
        meta: "Moderate / remove spam jobs",
        to: "/admin/jobs",
      },
      {
        title: "Revenue (₹)",
        value: Number(stats.totalRevenue || 0).toFixed(2),
        meta: `Payments: ${stats.totalPayments} • Active Subs: ${stats.activeSubscriptions}`,
        to: "/admin/payments",
      },
    ];
  }, [stats]);

  const styles = {
    page: {
      minHeight: "100vh",
      padding: 22,
      color: "white",
      background:
        "radial-gradient(1000px 600px at 10% 10%, rgba(103,232,249,.12), transparent 60%), radial-gradient(900px 600px at 90% 20%, rgba(139,92,246,.10), transparent 65%), #05070b",
    },
    top: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12,
      padding: 16,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
    },
    title: { fontSize: 20, fontWeight: 800, letterSpacing: 0.3 },
    sub: { marginTop: 4, fontSize: 13, color: "rgba(255,255,255,.72)" },
    btnRow: { display: "flex", gap: 10, flexWrap: "wrap" },
    btn: {
      padding: "10px 12px",
      borderRadius: 14,
      border: "1px solid rgba(103,232,249,.28)",
      background: "rgba(103,232,249,.10)",
      color: "white",
      cursor: "pointer",
    },
    ghost: {
      padding: "10px 12px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,.14)",
      background: "rgba(255,255,255,.04)",
      color: "white",
      cursor: "pointer",
    },
    grid: {
      marginTop: 14,
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 12,
    },
    card: {
      padding: 14,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
      cursor: "pointer",
      transition: "transform .15s ease, border-color .15s ease, background .15s ease",
    },
    cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
    k: { fontSize: 12, color: "rgba(255,255,255,.72)" },
    v: { marginTop: 8, fontSize: 24, fontWeight: 900 },
    meta: { marginTop: 10, fontSize: 12, color: "rgba(103,232,249,.85)" },
    panel: {
      marginTop: 12,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
      overflow: "hidden",
    },
    panelHead: {
      padding: "12px 14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,.10)",
    },
    panelTitle: { fontWeight: 800 },
    panelBody: { padding: 14, fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.7 },
    quickGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 10,
      marginTop: 10,
    },
    quick: {
      padding: 12,
      borderRadius: 16,
      border: "1px solid rgba(103,232,249,.18)",
      background: "rgba(103,232,249,.06)",
      cursor: "pointer",
    },
    quickT: { fontWeight: 800 },
    quickS: { marginTop: 4, fontSize: 12, color: "rgba(255,255,255,.70)" },
    small: { fontSize: 12, color: "rgba(255,255,255,.65)" },
  };

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.top}>
        <div>
          <div style={styles.title}>Admin Control Panel</div>
          <div style={styles.sub}>Manage users, employers, jobs and subscription payments</div>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.ghost} onClick={loadStats}>
            {loading ? "Refreshing..." : "Refresh Stats"}
          </button>

          <button style={styles.btn} onClick={() => navigate("/admin/users")}>
            Manage Users
          </button>

          <button style={styles.btn} onClick={() => navigate("/admin/employers")}>
            Approve Employers
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      {loading && !stats ? (
        <div style={{ marginTop: 14, ...styles.panel }}>
          <div style={{ padding: 14 }}>Loading...</div>
        </div>
      ) : (
        <div style={styles.grid}>
          {cards.map((c) => (
            <div
              key={c.title}
              style={styles.card}
              onClick={() => navigate(c.to)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(103,232,249,.28)";
                e.currentTarget.style.background = "rgba(103,232,249,.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,.10)";
                e.currentTarget.style.background = "rgba(255,255,255,.03)";
              }}
            >
              <div style={styles.cardTop}>
                <div style={styles.k}>{c.title}</div>
                <span style={{ ...styles.small, border: "1px solid rgba(255,255,255,.14)", padding: "4px 10px", borderRadius: 999 }}>
                  View
                </span>
              </div>
              <div style={styles.v}>{c.value}</div>
              <div style={styles.meta}>{c.meta}</div>
            </div>
          ))}
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div style={styles.panel}>
        <div style={styles.panelHead}>
          <div style={styles.panelTitle}>Quick Actions</div>
          <div style={styles.small}>Fast navigation</div>
        </div>

        <div style={styles.panelBody}>
          <div style={styles.quickGrid}>
            <div style={styles.quick} onClick={() => navigate("/admin/users")}>
              <div style={styles.quickT}>Users</div>
              <div style={styles.quickS}>Block / Unblock / Delete accounts</div>
            </div>

            <div style={styles.quick} onClick={() => navigate("/admin/employers")}>
              <div style={styles.quickT}>Employers</div>
              <div style={styles.quickS}>Approve / Reject / Block employers</div>
            </div>

            <div style={styles.quick} onClick={() => navigate("/admin/jobs")}>
              <div style={styles.quickT}>Jobs</div>
              <div style={styles.quickS}>Remove spam or invalid job posts</div>
            </div>

            <div style={styles.quick} onClick={() => navigate("/admin/payments")}>
              <div style={styles.quickT}>Payments</div>
              <div style={styles.quickS}>Audit transactions & revenue</div>
            </div>
          </div>

          <div style={{ marginTop: 12, ...styles.small }}>
            Tip: Use Refresh Stats after approving employers or deleting jobs to see updated numbers.
          </div>
        </div>
      </div>
    </div>
  );
}
