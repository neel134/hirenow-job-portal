import { api } from "./api";

export const getApplicantsForJob = async (jobId) => {
  const res = await api.get(`/api/employer/jobs/${jobId}/applicants`);
  return res.data;
};

// ✅ works with BOTH calling styles:
// 1) decideApplication(id, "ACCEPTED", "msg")
// 2) decideApplication(id, { decision: "ACCEPTED", message: "msg" })
export const decideApplication = async (applicationId, decisionOrPayload, message = "") => {
  let decision = "";
  let msg = "";

  if (typeof decisionOrPayload === "object" && decisionOrPayload !== null) {
    decision = decisionOrPayload.decision;
    msg = decisionOrPayload.message ?? "";
  } else {
    decision = decisionOrPayload;
    msg = message ?? "";
  }

  const payload = {
    decision: String(decision || "").trim().toUpperCase(), // ✅ ACCEPTED/REJECTED
    message: String(msg || "").trim(),
  };

  const res = await api.patch(
    `/api/employer/applications/${applicationId}/decision`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  return res.data;
};
