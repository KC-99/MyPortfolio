import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./NeonTitle.css";

interface NeonTitleProps {
  onClick: () => void;
}

const NeonTitle: React.FC<NeonTitleProps> = ({ onClick }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.children;
      gsap.fromTo(
        letters,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div className="neon-container" onClick={onClick}>
      <h1 className="neon-text" ref={titleRef}>
        {"CHE THAN KONDAVITI".split("").map((char, index) => (
          <span key={index} className="neon-letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <button className="explore-button">Explore More</button>
    </div>
  );
};

export default NeonTitle;
