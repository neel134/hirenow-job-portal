import React, { useEffect, useMemo, useRef, useState } from "react";
import "./FeaturedShowcase.css";

// ✅ Local logos (place files in src/assets/company-logos/)
import capgemini from "../assets/company-logos/capgemini.png";
import lti from "../assets/company-logos/lti.png";
import quess from "../assets/company-logos/quess.png";
import xoriant from "../assets/company-logos/xoriant.png";
import intellect from "../assets/company-logos/intellect.png";
import atos from "../assets/company-logos/atos.png";
import gallagher from "../assets/company-logos/gallagher.png";
import cognizant from "../assets/company-logos/cognizant.png";
import infosys from "../assets/company-logos/infosys.png";
import tcs from "../assets/company-logos/tcs.png";
import wipro from "../assets/company-logos/wipro.png";
import hcl from "../assets/company-logos/hcl.jpg";
import accenture from "../assets/company-logos/accenture.jpg";
import ibm from "../assets/company-logos/ibm.png";
import techm from "../assets/company-logos/techm.png";

export default function FeaturedShowcase() {
  const sliderRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const companies = useMemo(
    () => [
      { name: "Capgemini", logo: capgemini },
      { name: "LTIMindtree", logo: lti },
      { name: "Quess", logo: quess },
      { name: "Xoriant", logo: xoriant },
      { name: "Intellect", logo: intellect },
      { name: "Atos", logo: atos },
      { name: "Gallagher", logo: gallagher },
      { name: "Cognizant", logo: cognizant },
      { name: "Infosys", logo: infosys },
      { name: "TCS", logo: tcs },
      { name: "Wipro", logo: wipro },
      { name: "HCL", logo: hcl },
      { name: "Accenture", logo: accenture },
      { name: "IBM", logo: ibm },
      { name: "Tech Mahindra", logo: techm },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { name: "Banking", icon: "🏦" },
      { name: "Work From Home", icon: "🏠" },
      { name: "HR", icon: "🧑‍💼" },
      { name: "Sales", icon: "💼" },
      { name: "Accounting", icon: "🧾" },
      { name: "Customer Support", icon: "🎧" },
      { name: "Manager", icon: "📅" },
      { name: "IT", icon: "🌐" },
      { name: "SQL", icon: "🗄️" },
      { name: "Oracle", icon: "💾" },
      { name: "Graphic Design", icon: "🎨" },
      { name: "Digital Marketing", icon: "📢" },
      { name: "Data Analyst", icon: "📊" },
      { name: "Finance", icon: "💰" },
      { name: "UI/UX", icon: "🧩" },
    ],
    []
  );

  const updateButtons = () => {
    const el = sliderRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth - 2;
    setCanLeft(left > 5);
    setCanRight(left < max);
  };

  const scrollByCard = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.querySelector(".company-card");
    const step = (card?.clientWidth || 220) + 18;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  useEffect(() => {
    updateButtons();
    const el = sliderRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });

    const timer = setInterval(() => {
      const max = el.scrollWidth - el.clientWidth - 2;
      if (el.scrollLeft >= max) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: 260, behavior: "smooth" });
    }, 2800);

    return () => {
      el.removeEventListener("scroll", onScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="fs-wrap">
      <div className="fs-head">
        <h2 className="fs-title" id="companies">Featured Companies</h2>
        <p className="fs-sub">Top companies hiring right now</p>
      </div>

      <div className="carousel-shell">
        <button
          className={`nav-btn ${!canLeft ? "disabled" : ""}`}
          onClick={() => scrollByCard("left")}
          disabled={!canLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="carousel" ref={sliderRef}>
          {companies.map((c, i) => (
            <div key={i} className="company-card" title={c.name}>
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add("fallback");
                  e.currentTarget.parentElement.setAttribute("data-name", c.name);
                }}
              />
            </div>
          ))}
        </div>

        <button
          className={`nav-btn ${!canRight ? "disabled" : ""}`}
          onClick={() => scrollByCard("right")}
          disabled={!canRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      <div className="fs-head cats">
        <h2 className="fs-title">Trending Categories</h2>
        <p className="fs-sub">Explore jobs by category</p>
      </div>

      <div className="cats-grid">
        {categories.map((cat, i) => (
          <button key={i} className="cat-card" type="button">
            <span className="cat-ic">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
            <span className="cat-pill">Trending</span>
          </button>
        ))}
      </div>
    </section>
  );
}
