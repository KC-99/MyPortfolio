import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const FirstPage: React.FC = () => {
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

      {/* Centered text on the page */}
      <Text
        position={[0, 0.2, 0.01]}       // Adjust position: slightly above the plane to avoid z-fighting
        rotation={[-Math.PI / 2, 0, 0]}   // Rotate so it lies flat on the page
        fontSize={0.7}                   // Adjust as needed
        color="#000000"                  // Text color
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
      >
        View Index
      </Text>
    </group>
  );
};

export default FirstPage;
