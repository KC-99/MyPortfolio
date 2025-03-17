import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  // Control animation delay for each menu item
  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => setMenuVisible(true), 200); // Delay for menu items to slide in
    } else {
      setMenuVisible(false);
    }
  }, [menuOpen]);

  return (
    <>
      {/* ✅ Hamburger Icon */}
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
        <div
          style={{
            width: "24px",
            height: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: "100%", height: "3px", backgroundColor: "#fff", borderRadius: "2px" }}></span>
          <span style={{ width: "100%", height: "3px", backgroundColor: "#fff", borderRadius: "2px" }}></span>
          <span style={{ width: "100%", height: "3px", backgroundColor: "#fff", borderRadius: "2px" }}></span>
        </div>
      </div>

      {/* ✅ Side Menu */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: menuOpen ? "0" : "-300px",
          width: "250px",
          height: "100vh",
          background: "rgba(10, 10, 10, 0.95)",
          boxShadow: menuOpen ? "4px 0px 10px rgba(255, 255, 255, 0.2)" : "none",
          transition: "left 0.4s ease-in-out",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          zIndex: 99,
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

        {/* ✅ Animated Menu Items */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {["Home", "About", "Work", "Projects", "Socials"].map((item, index) => (
            <li
              key={item}
              style={{
                padding: "10px 0",
                fontSize: "18px",
                color: "#fff",
                cursor: "pointer",
                marginLeft: "20px",
                opacity: menuVisible ? 1 : 0,
                transform: menuVisible ? "translateX(0)" : "translateX(-50px)",
                transition: `opacity 0.4s ease-in-out ${index * 0.1}s, transform 0.4s ease-in-out ${index * 0.1}s`,
              }}
              onClick={() => {
                setMenuOpen(false); // Close menu

                if (item === "Home") {
                  navigate("/");
                } else if (item === "About") {
                  if (setNavigateToAbout) setNavigateToAbout(true);
                  setTimeout(() => {
                    navigate("/about");
                  }, 1200);
                } else if (item === "Work") {
                  navigate("/work");
                } else if (item === "Projects") {
                  navigate("/projects");
                } else if (item === "Socials") {
                  navigate("/socials");
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
