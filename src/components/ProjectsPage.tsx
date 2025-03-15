import React, { useState } from "react";
import SideMenu from "./SideMenu";

const ProjectsPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#111", color: "#fff" }}>
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

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
        Projects Page
      </div>
    </div>
  );
};

export default ProjectsPage;
