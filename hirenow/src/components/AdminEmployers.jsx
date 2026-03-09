import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AdminEmployers() {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/api/admin/employers");
    setEmployers(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const approve = async (id) => { await api.patch(`/api/admin/employers/${id}/approve`); load(); };
  const reject = async (id) => { await api.patch(`/api/admin/employers/${id}/reject`); load(); };
  const block = async (id) => { await api.patch(`/api/admin/employers/${id}/block`); load(); };
  const unblock = async (id) => { await api.patch(`/api/admin/employers/${id}/unblock`); load(); };

  const s = styles;

  const statusTag = (st) => {
    if (st === "ACTIVE") return { ...s.tag, ...s.tagOk };
    if (st === "PENDING") return { ...s.tag, ...s.tagWarn };
    if (st === "BLOCKED") return { ...s.tag, ...s.tagBad };
    return s.tag;
  };

  return (
    <div style={s.page}>
      <div style={s.top}>
        <div>
          <div style={s.h}>Manage Employers</div>
          <div style={s.sub}>Approve pending employers or block suspicious profiles</div>
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
                  <th style={s.th}>Company</th>
                  <th style={s.th}>Email</th>
                  <th style={s.th}>Phone</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employers.map((e) => (
                  <tr key={e.id} style={s.tr}>
                    <td style={s.td}>{e.id}</td>
                    <td style={s.td}>{e.companyName}</td>
                    <td style={s.td}>{e.email}</td>
                    <td style={s.td}>{e.phone}</td>
                    <td style={s.td}>
                      <span style={statusTag(e.status)}>{e.status}</span>
                    </td>

                    <td style={{ ...s.td, ...s.actions }}>
                      {e.status === "PENDING" && (
                        <>
                          <button style={s.btn} onClick={() => approve(e.id)}>Approve</button>
                          <button style={s.btnDanger} onClick={() => reject(e.id)}>Reject</button>
                        </>
                      )}

                      {e.status === "ACTIVE" && (
                        <button style={s.btnWarn} onClick={() => block(e.id)}>Block</button>
                      )}

                      {e.status === "BLOCKED" && (
                        <button style={s.btn} onClick={() => unblock(e.id)}>Unblock</button>
                      )}
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
  table: { width: "100%", borderCollapse: "collapse", minWidth: 900 },
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
  tagWarn: { borderColor: "rgba(245,158,11,.35)", background: "rgba(245,158,11,.10)" },
  tagBad: { borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.10)" },
};
