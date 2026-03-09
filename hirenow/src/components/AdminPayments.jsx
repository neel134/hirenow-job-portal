import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AdminPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/api/admin/payments");
    setPayments(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const s = styles;

  const statusTag = (st) => {
    if (st === "PAID") return { ...s.tag, ...s.tagOk };
    if (st === "CREATED") return { ...s.tag, ...s.tagWarn };
    if (st === "FAILED") return { ...s.tag, ...s.tagBad };
    return s.tag;
  };

  return (
    <div style={s.page}>
      <div style={s.top}>
        <div>
          <div style={s.h}>Payments</div>
          <div style={s.sub}>Track subscription payments and transaction status</div>
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
                  <th style={s.th}>User</th>
                  <th style={s.th}>Plan</th>
                  <th style={s.th}>Amount (₹)</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Order ID</th>
                  <th style={s.th}>Payment ID</th>
                  <th style={s.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} style={s.tr}>
                    <td style={s.td}>{p.id}</td>
                    <td style={s.td}>{p.user?.email}</td>
                    <td style={s.td}>{p.plan?.name}</td>
                    <td style={s.td}>{(p.amount / 100).toFixed(2)}</td>
                    <td style={s.td}>
                      <span style={statusTag(p.status)}>{p.status}</span>
                    </td>
                    <td style={s.td}>{p.razorpayOrderId || "-"}</td>
                    <td style={s.td}>{p.razorpayPaymentId || "-"}</td>
                    <td style={s.td}>
                      {p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}
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
  table: { width: "100%", borderCollapse: "collapse", minWidth: 1100 },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    fontSize: 12,
    color: "rgba(255,255,255,.75)",
    borderBottom: "1px solid rgba(103,232,249,.18)",
  },
  tr: { borderBottom: "1px solid rgba(255,255,255,.06)" },
  td: { padding: "12px 14px", fontSize: 13, color: "rgba(255,255,255,.88)" },

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
