import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import * as THREE from "three";
import AnimatedText from "./AnimatedText"; // Import the animated text component
import FirstPage from "./FirstPage"; // Import your first page component
import SideMenu from "./SideMenu"; // Import Side Menu

// Book Component
type BookSceneProps = {
  openBook: boolean;
  setOpenBook: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  navigateToAbout: boolean;
  setNavigateToAbout: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookScene: React.FC<BookSceneProps> = ({ 
  openBook,
}: BookSceneProps) => {
  const bookRef = useRef<THREE.Group>(null);
  const topCoverRef = useRef<THREE.Group>(null);
  const pageRef = useRef<THREE.Group>(null);
  const velocity = useRef(0);
  const gravity = 9.8;
  const [hasFallen, setHasFallen] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [focusedOnPage, setFocusedOnPage] = useState(false);
  const [initialFocusComplete, setInitialFocusComplete] = useState(false);
  const [resettingCamera, setResettingCamera] = useState(false);
  const firstPageLightRef = useRef<THREE.SpotLight>(null);

  // Initial camera position ref
  const initialCameraPosition = useRef(new THREE.Vector3(-5, 20, 30));
  
  // Camera controls
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);
  
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

  // Store initial camera position on first render
  useEffect(() => {
    initialCameraPosition.current.copy(camera.position);
  }, []);
  

  // Camera animation
  useEffect(() => {
    // After the book is open and the page is ready, focus on the page
    if (openBook && hasFallen && pageReady && !focusedOnPage) {
      const focusTimeout = setTimeout(() => {
        setFocusedOnPage(true);
        
        // Set a timer to enable controls after initial focus animation completes
        const enableControlsTimeout = setTimeout(() => {
          setInitialFocusComplete(true);
        }, 1500); // 1.5 seconds should be enough for the camera animation
        
        return () => clearTimeout(enableControlsTimeout);
      }, 500); // Short delay to allow cover to open

      return () => clearTimeout(focusTimeout);
    }
    
    // Handle book closing
    if (!openBook && focusedOnPage) {
      setResettingCamera(true);
      setFocusedOnPage(false);
      setInitialFocusComplete(false);
      setPageReady(false);
      
      // Allow a short delay before considering the animation complete
      const resetTimeout = setTimeout(() => {
        setResettingCamera(false);
      }, 1500);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [openBook, hasFallen, pageReady, focusedOnPage]);
  
  useFrame((state, delta) => {

    const clampedDelta = Math.min(delta,0.1);

    if (bookRef.current) {
      // Apply gravity
      velocity.current -= gravity * clampedDelta;
      bookRef.current.position.y += velocity.current * clampedDelta;
  
      // Apply slight random rotation for realism while falling
      if (bookRef.current.position.y > 0 && !hasFallen) {
        // Add slight random rotation while falling for realism
        rotationVelocity.current.x += (Math.random() - 0.5) * wobbleAmount * clampedDelta;
        rotationVelocity.current.z += (Math.random() - 0.5) * wobbleAmount * clampedDelta;
        
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
              Math.min(clampedDelta * 10, 0.2)
            );
            bookRef.current.rotation.z = THREE.MathUtils.lerp(
              bookRef.current.rotation.z,
              0,
              Math.min(clampedDelta * 10, 0.2)
            );
            
            // Once settled, mark as fallen
            if (Math.abs(bookRef.current.rotation.x) < 0.01 && 
                Math.abs(bookRef.current.rotation.z) < 0.01) {
              setHasFallen(true);
            }
          }
        }
      }
  
      // 180-Degree Rotation for book cover
      if (topCoverRef.current && hasFallen) {
        const targetRotation = openBook ? Math.PI : 0; // Full 180-degree flip
        topCoverRef.current.rotation.z = THREE.MathUtils.lerp(
          topCoverRef.current.rotation.z,
          targetRotation,
          Math.min(clampedDelta * 5, 0.1)
        );

        // Once cover is mostly open, show the page
        if (openBook && topCoverRef.current.rotation.z > Math.PI * 0.9 && !pageReady) {
          setPageReady(true);
        }
      }

      // Camera animations
      if (controlsRef.current) {
        // Case 1: Initial zoom to page
        if (focusedOnPage && !initialFocusComplete && pageRef.current) {
          // Get the position of the page
          const pagePosition = new THREE.Vector3();
          pageRef.current.getWorldPosition(pagePosition);
          
          // Target position: top right position with some distance
          const targetPosition = new THREE.Vector3(
            0,    // Slightly to the right
            20,    // Higher up for a top-down view
            15    // At a distance to see the full page
          );
          
          // Smoothly interpolate camera position
          camera.position.lerp(targetPosition, delta * 2);
          
          // Set camera to look at the page
          camera.lookAt(pagePosition);
          
          // Disable controls during initial animation
          controlsRef.current.enabled = false;
        }
        // Case 2: Resetting camera when closing the book
        else if (resettingCamera && state.camera && controlsRef.current) {
          // Smoothly interpolate the camera's position back to its initial position
          camera.position.lerp(initialCameraPosition.current, delta * 1.5);
          
          // Smoothly interpolate the orbit controls' target back to (0, 0, 0)
          controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), delta * 1.5);
          
          // When the camera is nearly reset, snap it into place and re-enable controls
          if (camera.position.distanceTo(initialCameraPosition.current) < 0.1) {
            camera.position.copy(initialCameraPosition.current);
            controlsRef.current.target.set(0, 0, 0);
            setResettingCamera(false); // End the resetting phase
            controlsRef.current.enabled = true;
          } else {
            controlsRef.current.enabled = false;
          }
        }
        
        // Case 3: Normal interaction mode
        else if (initialFocusComplete || (!focusedOnPage && !resettingCamera)) {
          // Enable controls for normal interaction
          controlsRef.current.enabled = true;
        }
      }

      // Animate page light brightness
      if (firstPageLightRef.current) {
        // Target intensity based on book state
        const targetIntensity = (openBook && pageReady) ? 8 : 0;
        
        // Gradually adjust intensity
        firstPageLightRef.current.intensity = THREE.MathUtils.lerp(
          firstPageLightRef.current.intensity,
          targetIntensity,
          delta * 3
        );
      }
    }
  });

  // Cached Materials
  const coverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#232323",
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
    <>
      {/* Special light for the first page */}
      <spotLight
        ref={firstPageLightRef}
        position={[0, 10, 10]}
        angle={0.6}
        penumbra={1}
        intensity={0}
        color="#ffffff"
        castShadow
      />
      
      {/* Additional lighting for when book is open */}
      {openBook && pageReady && (
        <>
          {/* Additional ambient light for overall brightness */}
          <ambientLight intensity={1.5} />
          {/* Additional directional lights for better illumination */}
          <directionalLight position={[5, 10, 5]} intensity={2} />
          <directionalLight position={[-5, 10, -5]} intensity={1.5} />
        </>
      )}
      
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={5} // Prevent zooming in too close
        maxDistance={50} // Prevent zooming out too far
      />

      <group ref={bookRef} position={[0, 16, 0]} onClick={handleClick}>
        {/* Bottom Cover */}
        <RoundedBox args={[12, 0.5, 14.5]} radius={0.2} position={[0, -0.9, 0]} >
          <primitive attach="material" object={coverMaterial.clone()} />
        </RoundedBox>

        {/* Spine (Left Edge) - Connects the two covers */}
        <RoundedBox args={[0.7, 2.3, 14.5]} radius={0.2} position={[-6, 0, 0]}>
          <primitive attach="material" object={spineMaterial} />
        </RoundedBox>

        {/* Top Cover - Now rotates 180 degrees */}
        <group ref={topCoverRef} position={[-6, 0.9, 0]}>
          <RoundedBox args={[12, 0.5, 14.5]} radius={0.2} position={[6, 0, 0]} >
            <primitive attach="material" object={coverMaterial.clone()} />
          </RoundedBox>

            {/* Render AnimatedText only once after the book has fallen */}
            {hasFallen && (
            <Html
              position={[6, 0.3, 0]}
              transform
              scale={1}
              rotation={[-Math.PI / 2, 0, 0]}  // Adjusted rotation
              style={{ pointerEvents: "none" }}
            >
              <AnimatedText text="Chethan" />
            </Html>
          )}

        </group>

        {/* Stacked Pages for Fore Edge Effect */}
        {[...Array(20)].map((_, i) => (
          <RoundedBox key={i} args={[11.6, 0.12, 14]} radius={0.02} position={[0, -0.5 + i * 0.04, 0]}>
            <meshStandardMaterial color={pageColors[i % pageColors.length]} roughness={0.9} />
          </RoundedBox>
        ))}

        {/* Pages inside the book */}
        {openBook && pageReady && (
          <group ref={pageRef} position={[0, 0.2, 0]}>
            {/* First page with increased brightness */}
            <FirstPage />
          </group>
        )}
      </group>
    </>
  );
};

// Scene Setup
const BookSceneWrapper = () => {
  const [openBook, setOpenBook] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigateToAbout, setNavigateToAbout] = useState(false);

  // Close menu when book is closed
  useEffect(() => {
    if (!openBook) {
      setMenuOpen(false);
    }
  }, [openBook]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Side Menu Component */}
      <SideMenu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        setNavigateToAbout={setNavigateToAbout}
      />

      {/* Hamburger Menu Button */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          cursor: "pointer",
          opacity: openBook ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "auto",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div
          style={{
            width: "30px",
            height: "3px",
            backgroundColor: "white",
            margin: "6px 0",
            transition: "all 0.3s ease",
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "3px",
            backgroundColor: "white",
            margin: "6px 0",
            transition: "all 0.3s ease",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <div
          style={{
            width: "30px",
            height: "3px",
            backgroundColor: "white",
            margin: "6px 0",
            transition: "all 0.3s ease",
            transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }}
        />
      </div>

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
              backgroundColor: "#000000",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
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
        style={{ width: "100vw", height: "100vh", background: "#e2dfd2" }}
        camera={{ position: [-5, 20, 30], fov: 45 }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 15, 10]} angle={0.3} intensity={2} />
        <BookScene
          openBook={openBook}
          setOpenBook={setOpenBook}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          navigateToAbout={navigateToAbout}
          setNavigateToAbout={setNavigateToAbout}
        />
      </Canvas>
    </div>
  );
};

export default BookSceneWrapper; 