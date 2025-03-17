import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookSceneWrapper from "./components/BookScene";
import SideMenu from "./components/SideMenu";
import AboutPage from "./components/AboutPage";
import WorkPage from "./components/WorkPage"; 
import ProjectsPage from "./components/ProjectsPage"; 
import SocialsPage from "./components/SocialsPage"; 

const App: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      <Routes>
        {/* Book Scene with Word Cloud */}
        <Route
          path="/"
          element={
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
              {/* Side Menu Component */}
              <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              {/* Book Scene - Centered on the Page */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1, // Ensures Book is above Word Cloud
                  pointerEvents: "auto", // Allows interaction with the book
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <BookSceneWrapper/>
              </div>
            </div>
          }
        />
        {/* Individual Page Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/socials" element={<SocialsPage />} />
      </Routes>
    </Router>
  );
};

export default App;