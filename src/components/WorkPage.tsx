import React, { useState } from "react";
import SideMenu from "./SideMenu";

const WorkPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#111", color: "#fff" }}>
      {/* ✅ Side Menu */}
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ✅ Page Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        Work Page
      </div>
    </div>
  );
};

export default WorkPage;
