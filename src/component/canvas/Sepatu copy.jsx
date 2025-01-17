import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import CanvasLoader from "./Loader";

const Computers = ({ isMobile }) => {
  // Load the 3D model using GLTFLoader
  const gltf = useLoader(GLTFLoader, "./Blue Outline/Blue_Outline.gltf");

  return (
    <mesh>
      {/* Lights */}
      <hemisphereLight intensity={0.15} groundColor='black' />
      <directionalLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.5} />

      {/* 3D Model */}
      <primitive
        object={gltf.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
        castShadow
        receiveShadow
      />
    </mesh>
  );
};

const Sepatu = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [30, 5, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Use Suspense to handle loading of the 3D model */}
      <Suspense fallback={<CanvasLoader />}>
        {/* OrbitControls for user interaction */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Render the 3D model */}
        <Computers isMobile={isMobile} />
      </Suspense>

      {/* Preload assets for better performance */}
      <Preload all />
    </Canvas>
  );
};

export default Sepatu;
