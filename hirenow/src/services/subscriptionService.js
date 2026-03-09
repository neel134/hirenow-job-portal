import axios from "axios";

const API = "http://localhost:8080/api/subscriptions";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Public: plans list
export async function getPlans() {
  const res = await axios.get(`${API}/plans`);
  return res.data;
}

// ✅ Auth: create Razorpay order
export async function createOrder(planName) {
  const res = await axios.post(
    `${API}/checkout/order`,
    { planName },
    { headers: authHeaders() }
  );
  return res.data; // {orderId, amount, currency, planName}
}

// ✅ Auth: verify + activate subscription
export async function verifyPayment(payload) {
  const res = await axios.post(`${API}/checkout/verify`, payload, {
    headers: authHeaders(),
  });
  return res.data; // returns UserSubscription (ACTIVE)
}

// ✅ Optional: check my subscription
export async function getMySubscription() {
  const res = await axios.get(`${API}/me`, { headers: authHeaders() });
  return res.data;
}
