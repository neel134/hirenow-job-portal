import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const block = async (id) => { await api.patch(`/api/admin/users/${id}/block`); load(); };
  const unblock = async (id) => { await api.patch(`/api/admin/users/${id}/unblock`); load(); };
  const del = async (id) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/api/admin/users/${id}`);
    load();
  };

  const s = styles;

  return (
    <div style={s.page}>
      <div style={s.top}>
        <div>
          <div style={s.h}>Manage Users</div>
          <div style={s.sub}>Block / Unblock / Delete user accounts</div>
        </div>
        <div style={s.row}>
          <button style={s.btnGhost} onClick={() => navigate("/admin/dashboard")}>← Back to Dashboard</button>
          <button style={s.btn} onClick={load}>{loading ? "Refreshing..." : "Refresh"}</button>
        </div>
      </div>

      <div style={s.panel}>
        {loading ? (
          <div style={s.loading}>Loading...</div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>ID</th>
                  <th style={s.th}>Name</th>
                  <th style={s.th}>Email</th>
                  <th style={s.th}>Role</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={s.tr}>
                    <td style={s.td}>{u.id}</td>
                    <td style={s.td}>{u.name} {u.surname}</td>
                    <td style={s.td}>{u.email}</td>
                    <td style={s.td}>{u.role}</td>
                    <td style={s.td}>
                      <span style={{...s.tag, ...(u.status === "ACTIVE" ? s.tagOk : s.tagBad)}}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{...s.td, ...s.actions}}>
                      {u.status === "BLOCKED" ? (
                        <button style={s.btn} onClick={() => unblock(u.id)}>Unblock</button>
                      ) : (
                        <button style={s.btnWarn} onClick={() => block(u.id)}>Block</button>
                      )}
                      <button style={s.btnDanger} onClick={() => del(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

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
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "flex-end",
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(255,255,255,.03)",
  },
  h: { fontSize: 20, fontWeight: 900, letterSpacing: 0.3 },
  sub: { marginTop: 4, fontSize: 13, color: "rgba(255,255,255,.72)" },
  row: { display: "flex", gap: 10, flexWrap: "wrap" },

  panel: {
    marginTop: 14,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(255,255,255,.03)",
    overflow: "hidden",
  },
  loading: { padding: 14 },

  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 860 },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    fontSize: 12,
    color: "rgba(255,255,255,.75)",
    borderBottom: "1px solid rgba(103,232,249,.18)",
  },
  tr: { borderBottom: "1px solid rgba(255,255,255,.06)" },
  td: { padding: "12px 14px", fontSize: 13, color: "rgba(255,255,255,.88)" },
  actions: { display: "flex", gap: 8, flexWrap: "wrap" },

  btn: {
    padding: "9px 12px",
    borderRadius: 12,
    border: "1px solid rgba(103,232,249,.28)",
    background: "rgba(103,232,249,.10)",
    color: "white",
    cursor: "pointer",
  },
  btnGhost: {
    padding: "9px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.04)",
    color: "white",
    cursor: "pointer",
  },
  btnWarn: {
    padding: "9px 12px",
    borderRadius: 12,
    border: "1px solid rgba(245,158,11,.35)",
    background: "rgba(245,158,11,.12)",
    color: "white",
    cursor: "pointer",
  },
  btnDanger: {
    padding: "9px 12px",
    borderRadius: 12,
    border: "1px solid rgba(239,68,68,.35)",
    background: "rgba(239,68,68,.12)",
    color: "white",
    cursor: "pointer",
  },

  tag: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.14)",
    fontSize: 12,
  },
  tagOk: { borderColor: "rgba(34,197,94,.35)", background: "rgba(34,197,94,.10)" },
  tagBad: { borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.10)" },
};
