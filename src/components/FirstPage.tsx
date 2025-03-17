import React, { useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

type FirstPageProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FirstPage: React.FC<FirstPageProps> = ({ setMenuOpen }) => {
  const [textColor] = useState("#000000"); // Default color

  return (
    <group>
      {/* The page's plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11, 14]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffee" 
          emissiveIntensity={1} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* ✅ Clickable Text */}
      <Text
        position={[0, 0.2, 0.01]}       // Adjust position: slightly above the plane to avoid z-fighting
        rotation={[-Math.PI / 2, 0, 0]}   // Rotate so it lies flat on the page
        fontSize={0.7}                   // Adjust as needed
        color={textColor}                 // Dynamic color state
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        onClick={() => setMenuOpen(prev => !prev)} // ✅ Toggle Side Menu on click
        onPointerOver={() => {
            document.body.style.cursor = "pointer"; // ✅ Change cursor to hand
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default"; // ✅ Reset cursor to normal
          }}
        >
        View Index
      </Text>
    </group>
  );
};

export default FirstPage;
