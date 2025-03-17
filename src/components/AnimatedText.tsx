import React from "react";
import "./AnimatedText.css";

type AnimatedTextProps = {
  text: string;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  return (
    <div className="animated-text-container">
      <svg viewBox="0 0 500 100" style={{ width: "100%", height: "auto" }}>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="animated-text"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default AnimatedText;
