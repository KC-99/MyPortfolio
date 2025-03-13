import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Html } from "@react-three/drei";
import * as THREE from "three";

// Remove 'children' from inherited Text props
type TypewriterTextProps = {
  fullText: string;
} & Omit<React.ComponentProps<typeof Text>, "children">;

const TypewriterText = ({ fullText, ...props }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
      }
    }, 150); // Adjust speed as needed
    return () => clearInterval(interval);
  }, [fullText]);

  return <Text {...props}>{displayedText}</Text>;
};

type AccurateBookProps = {
  openBook: boolean;
  setOpenBook: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccurateBook = ({ openBook, setOpenBook }: AccurateBookProps) => {
  const bookRef = useRef<THREE.Group>(null);
  const topCoverRef = useRef<THREE.Group>(null);
  const velocity = useRef(0);
  const gravity = 9.8;
  const [isRotating, setIsRotating] = useState(true);
  const [hasFallen, setHasFallen] = useState(false);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setIsRotating(false);
  };

  useFrame((_, delta) => {
    if (bookRef.current) {
      // Simulate falling
      velocity.current -= gravity * delta;
      bookRef.current.position.y += velocity.current * delta;

      if (isRotating) {
        bookRef.current.rotation.y += delta * 0.5;
      }

      // Once it hits the ground
      if (bookRef.current.position.y <= 0) {
        bookRef.current.position.y = 0;
        velocity.current = 0;
        if (!hasFallen) setHasFallen(true);
      }
    }

    // Animate top cover flipping open if openBook is true.
    // We animate the rotation.y to -Math.PI (flip open around the vertical axis).
    if (openBook && topCoverRef.current) {
      topCoverRef.current.rotation.y = THREE.MathUtils.lerp(
        topCoverRef.current.rotation.y,
        -Math.PI,
        0.1
      );
    }
  });

  // Cache the material to avoid re-creation on each render.
  const purpleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a2a2a",
        metalness: 0.0,
        roughness: 0.9,
        flatShading: true,
        envMapIntensity: 0.2,
      }),
    []
  );

  return (
    <group
      ref={bookRef}
      position={[0, 10, 0]}
      rotation={[0, 0.2, 0]}
      onClick={handleClick}
      onPointerDown={handleClick}
    >
      {/* Bottom Cover */}
      <RoundedBox
        args={[12, 0.5, 14.5]}
        radius={0.2}
        position={[0, -0.9, 0]}
        receiveShadow
      >
        <primitive attach="material" object={purpleMaterial.clone()} />
      </RoundedBox>

      {/* Top Cover Pivot Group */}
      {/* We position this group at the spine (left edge) by setting its position to [6, 0.9, 0] */}
      <group ref={topCoverRef} position={[6, 0.9, 0]}>
        {/* Offset the cover geometry so its left edge aligns with the group's origin */}
        <RoundedBox
          args={[12, 0.5, 14.5]}
          radius={0.2}
          castShadow
          position={[-6, 0, 0]}
        >
          <primitive attach="material" object={purpleMaterial.clone()} />
        </RoundedBox>

        {/* White index page below the cover */}
        <mesh position={[-6, -0.01, 0]}>
          <planeGeometry args={[12, 14.5]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Show name and "Open" button only after the book has fallen and while closed */}
      {hasFallen && !openBook && (
        <>
          <TypewriterText
            fullText="Chethan"
            position={[0, 1.17, -2]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={1.5}
            color="#f5f5dc"
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
          />
          <Html
            // Position this element relative to the top cover so it appears just below the name.
            position={[1, 1.17, 4]}
            rotation={[-Math.PI / 2, 0, 0]}
            transform
            occlude
            style={{
              pointerEvents: "auto",
              background: "rgba(255, 255, 255, 0.85)",
              padding: "6px 12px",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Trigger the cover-flip animation
              setOpenBook(true);
            }}
          >
            Open
          </Html>
        </>
      )}

      {/* Spine */}
      <RoundedBox
        args={[0.7, 2.3, 14.5]}
        radius={0.2}
        position={[-6, 0, 0]}
      >
        <primitive attach="material" object={purpleMaterial.clone()} />
      </RoundedBox>

      {/* Main Pages */}
      <RoundedBox
        args={[11.8, 0.22, 14]}
        radius={0.05}
        position={[0, -0.5, 0]}
      >
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </RoundedBox>
      <RoundedBox
        args={[11.8, 0.22, 14]}
        radius={0.05}
        position={[0, -0.25, 0]}
      >
        <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
      </RoundedBox>
      <RoundedBox
        args={[11.8, 0.22, 14]}
        radius={0.05}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </RoundedBox>
      <RoundedBox
        args={[11.8, 0.22, 14]}
        radius={0.05}
        position={[0, 0.25, 0]}
      >
        <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
      </RoundedBox>
      <RoundedBox
        args={[11.8, 0.22, 14]}
        radius={0.05}
        position={[0, 0.5, 0]}
      >
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </RoundedBox>

      {/* Fore edge segments - right side */}
      <RoundedBox
        args={[0.3, 0.22, 14]}
        radius={0.05}
        position={[6, -0.5, 0]}
      >
        <meshStandardMaterial color="#e0e0e0" roughness={0.7} />
      </RoundedBox>
      <RoundedBox
        args={[0.3, 0.22, 14]}
        radius={0.05}
        position={[6, -0.25, 0]}
      >
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
      </RoundedBox>
      <RoundedBox
        args={[0.3, 0.22, 14]}
        radius={0.05}
        position={[6, 0, 0]}
      >
        <meshStandardMaterial color="#f0f0f0" roughness={0.7} />
      </RoundedBox>
      <RoundedBox
        args={[0.3, 0.22, 14]}
        radius={0.05}
        position={[6, 0.25, 0]}
      >
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
      </RoundedBox>
      <RoundedBox
        args={[0.3, 0.22, 14]}
        radius={0.05}
        position={[6, 0.5, 0]}
      >
        <meshStandardMaterial color="#e0e0e0" roughness={0.7} />
      </RoundedBox>

      {/* Line shadow details on pages */}
      <RoundedBox
        args={[9, 0.02, 0.4]}
        radius={0.01}
        position={[0, -0.4, -2]}
      >
        <meshStandardMaterial color="#d0d0d0" roughness={1} />
      </RoundedBox>
      <RoundedBox
        args={[9, 0.02, 0.4]}
        radius={0.01}
        position={[0, 0.1, -1]}
      >
        <meshStandardMaterial color="#d0d0d0" roughness={1} />
      </RoundedBox>
      <RoundedBox
        args={[9, 0.02, 0.4]}
        radius={0.01}
        position={[0, 0.4, -3]}
      >
        <meshStandardMaterial color="#d0d0d0" roughness={1} />
      </RoundedBox>
    </group>
  );
};

const BookScene = () => {
  const [openBook, setOpenBook] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 10, 20], fov: 45 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={2} />
          <AccurateBook openBook={openBook} setOpenBook={setOpenBook} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 2 - 0.8}
            maxPolarAngle={Math.PI / 2 + 0.8}
          />
        </Suspense>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default BookScene;
