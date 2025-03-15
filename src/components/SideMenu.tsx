import React from "react";
import { useNavigate } from "react-router-dom";

type SideMenuProps = {
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateToAbout?: React.Dispatch<React.SetStateAction<boolean>>; // Optional for animation
};

const SideMenu: React.FC<SideMenuProps> = ({
    menuOpen = false,
    setMenuOpen = () => {},
    setNavigateToAbout = () => {},
  }) => {
    const navigate = useNavigate(); // ✅ React Router navigation

  return (
    <>
      {/* ✅ Hamburger Icon (Always Visible) */}
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
          boxShadow: menuOpen ? "none" : "0px 0px 12px rgba(255, 255, 255, 0.5)",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {/* ✅ Clean Hamburger Icon */}
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

      {/* ✅ Side Menu */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: menuOpen ? "0" : "-300px", // ✅ Hidden when closed
          width: "250px", // ✅ Fixed width
          height: "100vh",
          background: "rgba(10, 10, 10, 0.95)",
          boxShadow: menuOpen ? "4px 0px 10px rgba(255, 255, 255, 0.2)" : "none",
          transition: "left 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          zIndex: 99, // ✅ Below hamburger icon
        }}
      >
        {/* ✅ Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            alignSelf: "flex-end",
            background: "none",
            border: "none",
            fontSize: "24px",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ✕
        </button>

        {/* ✅ Menu Items */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {["Home", "About", "Work", "Projects", "Socials"].map((item) => (
            <li
              key={item}
              style={{
                padding: "10px 0",
                fontSize: "18px",
                color: "#fff",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => {
                setMenuOpen(false); // ✅ Close menu

                if (item === "Home") {
                  navigate("/"); // ✅ Navigate to landing page
                } else if (item === "About") {
                  if (setNavigateToAbout) setNavigateToAbout(true); // ✅ Trigger book flipping animation
                  setTimeout(() => {
                    navigate("/about"); // ✅ Navigate after animation
                  }, 1200);
                } else if (item === "Work") {
                  navigate("/work"); // ✅ Navigate to Work Page
                } else if (item === "Projects") {
                  navigate("/projects"); // ✅ Navigate to Projects Page
                } else if (item === "Socials") {
                  navigate("/socials"); // ✅ Navigate to Socials Page
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
