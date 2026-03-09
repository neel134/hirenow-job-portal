// Subscription.jsx
import React, { useEffect, useState } from "react";
import {
  getPlans,
  createOrder,
  verifyPayment,
  getMySubscription,
} from "../services/subscriptionService";
import { loadRazorpayScript } from "../utils/loadRazorpay";
import "./Subscription.css";

const RAZORPAY_KEY = "rzp_test_SDDp1V5nGLt7q3";

export default function Subscription() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [message, setMessage] = useState("");
  const [activePlan, setActivePlan] = useState(null);

  // ✅ Load paid plans only
  useEffect(() => {
    getPlans()
      .then((data) => {
        const paid =
          Array.isArray(data) ? data.filter((p) => Number(p.price) > 0) : [];
        setPlans(paid);
      })
      .catch(() => setMessage("Failed to load plans"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Persist active subscription after logout/login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setActivePlan(null);
      return;
    }

    getMySubscription()
      .then((sub) => {
        if (sub?.status === "ACTIVE" && sub?.plan?.name) {
          setActivePlan(sub.plan.name);
        } else {
          setActivePlan(null);
        }
      })
      .catch(() => setActivePlan(null));
  }, []);

  const handleBuy = async (plan) => {
    setMessage("");
    setProcessing(plan.name);

    const token = localStorage.getItem("token");
    if (!token) {
      setProcessing(null);
      setMessage("Please login to buy subscription");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setProcessing(null);
      setMessage("Razorpay SDK failed to load");
      return;
    }

    try {
      const order = await createOrder(plan.name);

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "HireNow",
        description: `${order.planName} Subscription`,
        order_id: order.orderId,

        handler: async function (response) {
          try {
            const sub = await verifyPayment({
              planName: order.planName,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (sub?.status === "ACTIVE" && sub?.plan?.name) {
              setActivePlan(sub.plan.name);
            } else {
              setActivePlan(order.planName);
            }

            setMessage("✅ Subscription activated successfully!");
          } catch {
            setMessage("❌ Payment verification failed");
          }
        },

        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => setMessage("❌ Payment failed"));
      rzp.open();
    } catch {
      setMessage("❌ Unable to create order");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <p className="sub-loading">Loading...</p>;

  return (
    <div className="sub-page">
      <div className="sub-hero">
        <h2 className="sub-title">Upgrade your plan</h2>
        <p className="sub-subtitle">
          Premium users get 30 minutes early access to jobs.
        </p>

        {message && <div className="sub-message">{message}</div>}
      </div>

      <div className="sub-grid">
        {plans.map((plan) => {
          const isActive = activePlan === plan.name;
          const isBusy = processing === plan.name;

          return (
            <div key={plan.id} className={`sub-card ${isActive ? "active" : ""}`}>
              {isActive && <div className="sub-badge">Your subscription</div>}

              <div className="sub-cardTop">
                <h3 className="sub-planName">{plan.name?.toUpperCase()}</h3>

                <div className="sub-priceRow">
                  <span className="sub-price">₹{plan.price}</span>
                  <span className="sub-duration">/ {plan.durationDays} days</span>
                </div>

                <ul className="sub-features">
                  <li>
                    <span className="dot" />
                    <span>⚡ 30 min early access</span>
                  </li>
                  <li>
                    <span className="dot" />
                    <span>⭐ Premium badge</span>
                  </li>
                </ul>
              </div>

              <button
                className={`sub-btn ${isActive ? "disabled" : ""}`}
                onClick={() => handleBuy(plan)}
                disabled={isActive || isBusy}
              >
                {isActive ? "Active" : isBusy ? "Processing..." : "Buy Premium"}
              </button>

              <div className="sub-foot">
                Secure checkout • Cancel anytime • Instant activation
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
