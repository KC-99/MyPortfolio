import React, { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import SideMenu from "./SideMenu"; // Import Side Menu

// Book Component
type BookSceneProps = {
  openBook: boolean;
  setOpenBook: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigateToAbout: boolean;
  setNavigateToAbout: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookScene: React.FC<BookSceneProps> = ({ 
  openBook,
  setMenuOpen, 
  navigateToAbout, 
}: BookSceneProps) => {
  const bookRef = useRef<THREE.Group>(null);
  const topCoverRef = useRef<THREE.Group>(null);
  const pageRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const velocity = useRef(0);
  const gravity = 9.8;
  const [hasFallen, setHasFallen] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const [pageFlipping, setPageFlipping] = useState(false);
  const [zoomingIn, setZoomingIn] = useState(false);
  const [showAboutContent, setShowAboutContent] = useState(false);

  // Delay hiding "Index" after closing
  useEffect(() => {
    if (openBook) {
      setShowIndex(false); // Reset first to prevent stale state issues
      setTimeout(() => setShowIndex(true), 50); // Short delay ensures it appears immediately
    } else {
      const timer = setTimeout(() => setShowIndex(false), 800); // Controls disappearance delay
      return () => clearTimeout(timer);
    }
  }, [openBook]);

  // Handle page flipping animation for About page
  useEffect(() => {
    if (navigateToAbout && openBook) {
      // Start the page flipping animation sequence
      setPageFlipping(true);
      
      // After page flip, start zooming in
      setTimeout(() => {
        setPageFlipping(false);
        setZoomingIn(true);
      }, 800);
      
      // After zooming in, show about content
      setTimeout(() => {
        setShowAboutContent(true);
      }, 1600);
    }
  }, [navigateToAbout, openBook]);

  // Click to stop rotation
  const handleClick = (event: React.MouseEvent<THREE.Group>) => {
    event.stopPropagation();
  };

  const rotationVelocity = useRef({ x: 0, z: 0 });
  const restitution = 0.4; // Lower value for less bounce
  const friction = 0.7; // Higher friction to settle faster
  const rotationalDamping = 0.85; // How quickly rotation stops
  const bounceThreshold = 0.2; // Higher threshold to stop bouncing sooner
  const wobbleAmount = 0.05; // How much random wobble to add
  
  useFrame((state, delta) => {
    if (bookRef.current) {
      // Apply gravity
      velocity.current -= gravity * delta;
      bookRef.current.position.y += velocity.current * delta;
  
      // Apply slight random rotation for realism while falling
      if (bookRef.current.position.y > 0 && !hasFallen) {
        // Add slight random rotation while falling for realism
        rotationVelocity.current.x += (Math.random() - 0.5) * wobbleAmount * delta;
        rotationVelocity.current.z += (Math.random() - 0.5) * wobbleAmount * delta;
        
        // Apply rotation
        bookRef.current.rotation.x += rotationVelocity.current.x;
        bookRef.current.rotation.z += rotationVelocity.current.z;
        
        // Dampen rotation
        rotationVelocity.current.x *= rotationalDamping;
        rotationVelocity.current.z *= rotationalDamping;
      }
  
      // Ground collision with bounce
      if (bookRef.current.position.y <= 0) {
        // Book hit the ground
        bookRef.current.position.y = 0; // Prevent going below ground
        
        // Only bounce if velocity is significant enough
        if (Math.abs(velocity.current) > bounceThreshold) {
          // Add some randomness to the bounce direction
          const randomFactor = 0.8 + Math.random() * 0.4;
          
          // Reverse velocity with damping for bounce effect
          velocity.current = -velocity.current * restitution * randomFactor;
          
          // Apply additional friction to each bounce
          velocity.current *= friction;
          
          // Add a bit of random rotation on bounce
          rotationVelocity.current.x = (Math.random() - 0.5) * 0.02;
          rotationVelocity.current.z = (Math.random() - 0.5) * 0.02;
        } else {
          // Too small to bounce, just stop
          velocity.current = 0;
          
          // Level out the book's rotation gradually
          if (!hasFallen) {
            // Reset rotation to flat on ground
            bookRef.current.rotation.x = THREE.MathUtils.lerp(
              bookRef.current.rotation.x,
              0,
              Math.min(delta * 10, 0.2)
            );
            bookRef.current.rotation.z = THREE.MathUtils.lerp(
              bookRef.current.rotation.z,
              0,
              Math.min(delta * 10, 0.2)
            );
            
            // Once settled, mark as fallen
            if (Math.abs(bookRef.current.rotation.x) < 0.01 && 
                Math.abs(bookRef.current.rotation.z) < 0.01) {
              setHasFallen(true);
            }
          }
        }
      }
  
      // Rest of your code remains the same
      // 180-Degree Rotation for book cover
      if (topCoverRef.current && hasFallen) {
        const targetRotation = openBook ? Math.PI : 0; // Full 180-degree flip
        topCoverRef.current.rotation.z = THREE.MathUtils.lerp(
          topCoverRef.current.rotation.z,
          targetRotation,
          Math.min(delta * 5, 0.1)
        );
      }
  
      // Camera zooming animation
      if (zoomingIn && state.camera) {
        cameraRef.current = state.camera as THREE.PerspectiveCamera;
        
        // Move camera to focus on the page
        state.camera.position.x = THREE.MathUtils.lerp(
          state.camera.position.x,
          0,
          Math.min(delta * 1, 0.02)
        );
        
        state.camera.position.y = THREE.MathUtils.lerp(
          state.camera.position.y,
          5,
          Math.min(delta * 1, 0.02)
        );
        
        state.camera.position.z = THREE.MathUtils.lerp(
          state.camera.position.z,
          10,
          Math.min(delta * 1, 0.02)
        );
        
        // Update camera focus
        state.camera.lookAt(0, 0, 0);
        state.camera.updateProjectionMatrix();
      }
    }
  });

  // Cached Materials
  const coverMaterial = useMemo(
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

  const spineMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1c1c1c",
        metalness: 0.2,
        roughness: 0.8,
      }),
    []
  );

  // Different shades for the stacked pages effect
  const pageColors = ["#f8f8f8", "#f5f5f5", "#f2f2f2", "#ededed", "#eaeaea"];

  return (
    <group ref={bookRef} position={[0, 16, 0]} onClick={handleClick}>
      {/* Bottom Cover */}
      <RoundedBox args={[12, 0.5, 14.5]} radius={0.2} position={[0, -0.9, 0]} receiveShadow>
        <primitive attach="material" object={coverMaterial.clone()} />
      </RoundedBox>

      {/* Spine (Left Edge) - Connects the two covers */}
      <RoundedBox args={[0.7, 2.3, 14.5]} radius={0.2} position={[-6, 0, 0]}>
        <primitive attach="material" object={spineMaterial} />
      </RoundedBox>

      {/* Top Cover - Now rotates 180 degrees */}
      <group ref={topCoverRef} position={[-6, 0.9, 0]}>
        <RoundedBox args={[12, 0.5, 14.5]} radius={0.2} position={[6, 0, 0]} castShadow>
          <primitive attach="material" object={coverMaterial.clone()} />
        </RoundedBox>

        {/* Neon White Glow Name - Attached to Top Panel */}
        {!openBook && (
          <Text
            position={[6, 0.3, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={1.8}
            color="#ffffff"
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
          >
            Chethan
          </Text>
        )}
      </group>

      {/* Stacked Pages for Fore Edge Effect */}
      {[...Array(20)].map((_, i) => (
        <RoundedBox key={i} args={[11.6, 0.12, 14]} radius={0.02} position={[0, -0.5 + i * 0.04, 0]}>
          <meshStandardMaterial color={pageColors[i % pageColors.length]} roughness={0.9} />
        </RoundedBox>
      ))}

      {/* Pages inside the book */}
      {openBook && (
        <group ref = {pageRef} position={[0, 0, 0]}>
          {/* Main page with Index */}
          {!showAboutContent && (
            <group ref={pageRef} rotation={[0, 0, 0]}>
              <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[11.8, 14]} />
                <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} />
              </mesh>

              {/* Front of page - Index */}
              {showIndex && !pageFlipping && (
                <Html position={[0, 0.9, 0]} rotation={[-Math.PI / 2, 0, 0]} transform occlude>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(true); // Opens the menu when clicking "Index"
                    }}
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "#000",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Index
                  </button>
                </Html>
              )}
              
              {/* Back of page - blank */}
              <mesh position={[0, 0, -0.01]} rotation={[-Math.PI / 2, 0, Math.PI]}>
                <planeGeometry args={[11.8, 14]} />
                <meshStandardMaterial color="#f0f0f0" side={THREE.DoubleSide} />
              </mesh>
            </group>
          )}

          {/* About page content */}
          {showAboutContent && (
            <group position={[0, 0, 0]}>
              <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[11.8, 14]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>

              <Html position={[5.5, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} transform occlude>
                <div style={{
                  width: "500px",
                  textAlign: "center",
                  fontSize: "24px",
                  color: "#000",
                }}>
                  <p style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "justify" }}>
                    Welcome
                  </p>
                </div>
              </Html>
            </group>
          )}
        </group>
      )}
    </group>
  );
};

// Scene Setup
const BookSceneWrapper = () => {
  const [openBook, setOpenBook] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigateToAbout, setNavigateToAbout] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Side Menu Component */}
      <SideMenu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        setNavigateToAbout={setNavigateToAbout}
      />

      {/* Open & Close Buttons */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {!openBook ? (
          <button
            onClick={() => setOpenBook(true)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#111",
              boxShadow: "0px 0px 12px #ffffff",
            }}
          >
            Open
          </button>
        ) : (
          <button
            onClick={() => {
              setOpenBook(false);
              setNavigateToAbout(false); // Reset navigation state when closing
            }}
            style={{
              padding: "10px 15px",
              backgroundColor: "#ff0055",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
              boxShadow: "0px 0px 12px #ff0055",
            }}
          >
            Close
          </button>
        )}
      </div>

      <Canvas 
        style={{ width: "100vw", height: "100vh" }} 
        camera={{ position: [-5, 20, 30], fov: 45 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={2} castShadow />
          <BookScene 
            openBook={openBook} 
            setOpenBook={setOpenBook} 
            setMenuOpen={setMenuOpen}
            navigateToAbout={navigateToAbout}
            setNavigateToAbout={setNavigateToAbout}
          />
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={!navigateToAbout} // Disable rotation during navigation
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BookSceneWrapper;