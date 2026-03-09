import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const styles = {
    wrap: {
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "260px 1fr",
      background:
        "radial-gradient(1000px 600px at 10% 10%, rgba(103,232,249,.12), transparent 60%), radial-gradient(900px 600px at 90% 20%, rgba(139,92,246,.10), transparent 65%), #05070b",
      color: "white",
    },
    side: {
      padding: 16,
      borderRight: "1px solid rgba(255,255,255,.08)",
      background: "rgba(255,255,255,.02)",
      position: "sticky",
      top: 0,
      height: "100vh",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontWeight: 900,
      padding: "12px 12px",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
      cursor: "pointer",
      userSelect: "none",
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#67e8f9",
      boxShadow: "0 0 18px rgba(103,232,249,.45)",
    },
    badge: {
      marginLeft: "auto",
      fontSize: 11,
      padding: "5px 10px",
      borderRadius: 999,
      border: "1px solid rgba(103,232,249,.25)",
      background: "rgba(103,232,249,.10)",
      color: "#67e8f9",
    },
    nav: { marginTop: 14, display: "flex", flexDirection: "column", gap: 8 },
    link: {
      padding: "10px 12px",
      borderRadius: 14,
      textDecoration: "none",
      color: "rgba(255,255,255,.82)",
      border: "1px solid transparent",
      background: "rgba(255,255,255,.02)",
    },
    active: {
      borderColor: "rgba(103,232,249,.25)",
      background: "rgba(103,232,249,.10)",
      color: "#eaffff",
    },
    foot: { position: "absolute", left: 16, right: 16, bottom: 16 },
    btnGhost: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,.14)",
      background: "rgba(255,255,255,.04)",
      color: "white",
      cursor: "pointer",
    },
    main: { padding: 18 },
    top: {
      padding: 16,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
    },
  };

  return (
    <div style={styles.wrap}>
      <aside style={styles.side}>
        <div style={styles.brand} onClick={() => navigate("/admin/dashboard")}>
          <span style={styles.dot} />
          HireNow <span style={styles.badge}>ADMIN</span>
        </div>

        <nav style={styles.nav}>
          <NavLink to="/admin/dashboard" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}>
            Users
          </NavLink>
          <NavLink to="/admin/employers" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}>
            Employers
          </NavLink>
          <NavLink to="/admin/jobs" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}>
            Jobs
          </NavLink>
          <NavLink to="/admin/payments" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}>
            Payments
          </NavLink>
        </nav>

        <div style={styles.foot}>
          <button style={styles.btnGhost} onClick={logout}>Logout</button>
        </div>
      </aside>

      <main style={styles.main}>
        {/* optional top bar */}
        <div style={styles.top}>
          <div style={{ fontWeight: 900 }}>Admin Panel</div>
          <div style={{ marginTop: 4, fontSize: 13, color: "rgba(255,255,255,.70)" }}>
            Use the sidebar to manage everything
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
