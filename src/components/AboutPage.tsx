import React, { useState } from "react";
import SideMenu from "./SideMenu"; // Reuse your existing SideMenu

const AboutPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        fontSize: "36px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Side Menu Component */}
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hamburger Icon (Always visible at Top-Left) */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 100,
          cursor: "pointer",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.8)",
          borderRadius: "8px",
          boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.5)",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div
          style={{
            width: "24px",
            height: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              display: "block",
              width: "100%",
              height: "3px",
              backgroundColor: "#fff",
              borderRadius: "2px",
            }}
          ></span>
          <span
            style={{
              display: "block",
              width: "100%",
              height: "3px",
              backgroundColor: "#fff",
              borderRadius: "2px",
            }}
          ></span>
          <span
            style={{
              display: "block",
              width: "100%",
              height: "3px",
              backgroundColor: "#fff",
              borderRadius: "2px",
            }}
          ></span>
        </div>
      </div>

      {/* Main About Me Content */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>About Me</h1>
        <p style={{ fontSize: "18px", lineHeight: "1.5", maxWidth: "800px", margin: "0 auto" }}>
          {/* Paste your About Me content here */}
          Hi there! I'm Chethan, a passionate developer and designer. I love creating immersive digital experiences that blend creativity with technology.
          With expertise in 3D graphics, interactive design, and web development, I focus on crafting unique user experiences that push boundaries.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
