import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import SideMenu from "./SideMenu"; // Reuse your existing SideMenu

const AboutPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "100px",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Side Menu Component */}
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hamburger Icon */}
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

      {/* Profile Section */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "80vw", // More width for desktop
          width: "100%",
        }}
      >
        {/* Headshot */}
        <img
          src="/headshot.jpg"
          alt="Chethan"
          style={{
            width: "150px", // Slightly smaller for mobile
            height: "150px",
            objectFit: "cover",    // Prevents stretching/distortion
            objectPosition: "center", // Keeps face centered
            borderRadius: "50%",
            marginBottom: "20px",
            marginTop: "100x",
          }}
        />

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          My Story
        </h1>

        {/* Updated Bio Section */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            maxWidth: "75vw", // Keeps text wide on larger screens
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          Hi! I’m Chethan Kondaviti, a Data Analyst at Finish Line with 3.5 years of professional experience, deeply fascinated by the art of uncovering stories hidden beneath the surface of data. To me, every dataset is an adventure waiting to happen—an opportunity to discover new perspectives, solve intriguing puzzles, and creatively share insights.
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            maxWidth: "75vw", // Keeps text wide on larger screens
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          My journey into technology was sparked by genuine curiosity rather than formal training alone. After completing my Bachelor's degree in Engineering in Hyderabad, India, it was during the unexpected downtime of the COVID-19 lockdown that my interest truly ignited. Spending countless hours gaming and engaging with online communities on Discord, I casually started building simple bots, discovering the joy and creativity in coding. Those playful experiments gradually developed into a passion that transformed my career direction.
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            maxWidth: "75vw", // Keeps text wide on larger screens
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          I started professionally at TCS, where I had my first taste of bringing data to life through interactive visualizations and dashboards. My initial experiences inspired me to dive deeper, leading me to Zensar. There, I delved into exploring how data could be efficiently processed, transformed, and visualized to deliver clearer insights. This period nurtured my fascination with the underlying systems and processes that power meaningful analytics, prompting me to seek new ways to optimize and creatively utilize data.
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            maxWidth: "75vw", // Keeps text wide on larger screens
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          Eventually, my desire to explore and learn further led me overseas to pursue a Master's in Computer Science at Fitchburg State University. During my time in graduate school, I expanded my technical capabilities and developed a broader perspective, allowing me to approach data-driven challenges with creativity and strategic thinking.
        </p>

        <p
          style={{
            fontSize: "16px",
            maxWidth: "75vw", // Keeps text wide on larger screens
            lineHeight: "1.6",
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          Currently, at Finish Line, my role involves creating rich, interactive visual experiences using modern JavaScript libraries such as D3.js and Chart.js, crafting visual stories from complex retail data. I love the challenge of turning raw information into visuals that communicate clearly, intuitively, and beautifully. Beyond visualization, I remain deeply interested in the underlying technologies—always eager to optimize performance, automate workflows, and build efficient data pipelines that help tell these stories seamlessly
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            maxWidth: "75vw", // Keeps text wide on larger screens
            textAlign: "justify",
            padding: "0 20px",
          }}
        >
          Outside of my professional life, I’m an enthusiastic explorer by nature. My interests range widely—from experimenting with new front-end tools and frameworks to connecting with vibrant online communities, gaming, and diving into various topics that pique my curiosity. At the heart of it all, I’m driven by a passion to continuously learn, creatively problem-solve, and share compelling stories that make data not only understandable but captivating.
        </p>

        

      </div>

            {/* ✅ Next Page Button (Centered at Bottom) */}
            <div
        style={{
          position: "relative",
          bottom: "10px",
          left: "30%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => navigate("/work")} // Navigate to WorkPage
          style={{
            backgroundColor: "#ffffff",
            color: "#111",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)", 
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff3366")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff0055")}
        >
          Work →
        </button>
      </div>

      {/* ✅ Mobile Optimization */}
      <style>
        {`
        @media (max-width: 768px) {
          div {
            max-width: 90vw !important; /* More width for mobile */
          }
          img {
            width: 120px !important; /* Slightly smaller headshot */
            height: 120px !important;
          }
          h1 {
            font-size: 28px !important; /* Reduce header size for mobile */
          }
          p {
            font-size: 14px !important; /* Smaller font for mobile */
            text-align: left !important; /* Left-align for better readability */
            line-height: 1.5 !important;
            padding: 0 15px !important;
          }
        }
        `}
      </style>

      
    </div>
  );
};

export default AboutPage;
