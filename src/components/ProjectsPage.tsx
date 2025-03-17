import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";

const ProjectsPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #111 50%, #222 100%)",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "60px",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* ✅ Side Menu */}
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ✅ Page Heading */}
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "20px",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Projects
      </h1>

      {/* ✅ Projects List */}
      <div style={{ maxWidth: "80vw", textAlign: "left", padding: "0 20px" }}>
        <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
          <li style={{ marginBottom: "15px" }}>
            <h2 style={{ fontSize: "24px", display: "flex", alignItems: "center" }}>
              Data-Driven E-commerce Dashboard
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
              Built an interactive Power BI dashboard for **Finish Line**, optimizing insights for product sales,
              inventory, and customer behavior. Integrated **D3.js & Chart.js** for advanced data visualizations.
            </p>
          </li>

          <li style={{ marginBottom: "15px" }}>
            <h2 style={{ fontSize: "24px", display: "flex", alignItems: "center" }}>

              Real-Time Store Performance Tracker
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
              Designed an analytics platform for tracking live retail performance, using **Azure Synapse**
              and **Power BI** to monitor sales trends across stores in real time.
            </p>
          </li>

          <li style={{ marginBottom: "15px" }}>
            <h2 style={{ fontSize: "24px", display: "flex", alignItems: "center" }}>

              AI-Powered Recommendation System
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
              Developed an **AI-driven customer recommendation engine** for personalized shopping experiences,
              leveraging **machine learning models and Power BI visualizations**.
            </p>
          </li>
        </ol>
      </div>

      {/* ✅ Navigation Buttons (Fixed at Bottom) */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/work")}
          style={{
            backgroundColor: "#ffffff",
            color: "#111",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dddddd")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
        >
          ← Work
        </button>

        <button
          onClick={() => navigate("/socials")}
          style={{
            backgroundColor: "#ffffff",
            color: "#111",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dddddd")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
        >
          Socials →
        </button>
      </div>

      {/* ✅ Mobile Optimization */}
      <style>
        {`
        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          h2 {
            font-size: 20px !important;
          }
          p {
            font-size: 14px !important;
            text-align: left !important;
          }
          ol {
            padding-left: 15px !important;
          }
          img {
            width: 24px !important;
            height: 24px !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default ProjectsPage;
