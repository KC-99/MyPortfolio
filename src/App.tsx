import React from "react";
import WordCloudBackground from "./components/WordCloudBackground";
import BookScene from "./components/BookScene";

const App: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Background Word Cloud */}
      <WordCloudBackground />

      {/* Book Scene - Positioned Above Word Cloud */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1, // Ensures Book is above Word Cloud
          pointerEvents: "auto", // Allows interaction with the book
        }}
      >
        <BookScene />
      </div>
    </div>
  );
};

export default App;
