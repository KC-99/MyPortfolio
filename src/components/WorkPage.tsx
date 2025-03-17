import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";

const WorkPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "80px",
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
        Work 
      </h1>

      {/* ✅ Work Experience Sections */}
      <div
        style={{
          maxWidth: "80vw",
          textAlign: "left",
          width: "100%",
        }}
      >
        {/* ✅ Finish Line */}
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ffffff",
          }}
        >
          <img
            src="/icons/finish-line.png"
            alt="Finish Line Icon"
            style={{ width: "30px", height: "30px" }}
          />
          Finish Line
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
        At Finish Line, my core role involves creating dashboards that transform detailed retail data into interactive visual stories. Instead of simply presenting numbers in a static format, I develop responsive visual interfaces using JavaScript libraries such as D3.js and Chart.js. For example, when executives need insights about product performance across hundreds of stores, my dashboards allow them to quickly filter, drill down, and interact with visual elements, enhancing their decision-making efficiency. Behind the scenes, I optimize the code to handle vast amounts of data smoothly—implementing techniques like lazy loading, where visuals appear progressively as users navigate, significantly improving page responsiveness. Additionally, I designed secure access controls, ensuring sensitive data remains protected and accessible only by authorized team members. By leveraging automation tools and cloud services, I've streamlined the way dashboards update, allowing users to always view the most current business information without manual intervention.
        </p>

        {/* ✅ Zensar */}
        <h2
          style={{
            fontSize: "28px",
            marginTop: "30px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ffffff",
          }}
        >
          <img
            src="/icons/zensar.jpg"
            alt="Zensar Icon"
            style={{ width: "30px", height: "30px" }}
          />
          Zensar
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
        At Zensar, I was responsible for integrating and streamlining data from multiple external sources for a prominent furniture rental business. This company dealt extensively with transaction records, logistics data, and payment processing details coming from different partners. My primary task involved efficiently consolidating these varied datasets into one unified format using cloud-based data tools like Snowflake. By developing automated data pipelines, I significantly reduced the occurrence of data discrepancies and improved reliability. I built specialized frameworks using Python tools, enabling rapid processing and aggregation of thousands of transaction records, which empowered analysts to quickly identify rental trends and supplier performance issues. Furthermore, I crafted specialized visual representations, such as interactive heatmaps highlighting geographical demand hotspots, assisting the client in making informed decisions around warehouse placement and logistical planning.
        </p>

        {/* ✅ Tata Consultancy Services (TCS) */}
        <h2
          style={{
            fontSize: "28px",
            marginTop: "30px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ffffff",
          }}
        >
          <img
            src="/icons/tcs.png"
            alt="TCS Icon"
            style={{ width: "30px", height: "30px" }}
          />
          Tata Consultancy Services (TCS)
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
          My career began at **TCS**, where I developed foundational skills in **SQL, Python, and BI reporting**. 
          I was responsible for creating **interactive dashboards in Tableau** and integrating business data 
          into meaningful reports.
        </p>
      </div>

      {/* ✅ Navigation Buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={() => navigate("/about")}
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
          ← About
        </button>

        <button
          onClick={() => navigate("/projects")}
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
          Projects →
        </button>
      </div>
    </div>
  );
};

export default WorkPage;
