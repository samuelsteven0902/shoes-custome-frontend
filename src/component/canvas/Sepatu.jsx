import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import CanvasLoader from "./Loader";

const SepatuModel = ({ isMobile , warna}) => {
  // Load the 3D model using GLTFLoader
  // const gltf = useLoader(GLTFLoader, "./Purple/Purple.gltf");
  const gltf = useGLTF(`./${warna}/${warna}.gltf`);
  // const gltf = useLoader(GLTFLoader, "./Blue2/Blue.gltf");

 return (
  <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
    <mesh>
      <hemisphereLight intensity={0.7} groundColor='black' />
      <directionalLight
        position={[20, 50, 10]}
        angle={1}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={gltf.scene}
        scale={isMobile ? 0.4 : 0.5}
        position={isMobile ? [0, -3, 1] : [0, -3.25, -1.5]}
        rotation={[-0.01, 1, -0.1]}
      />
    </mesh>
  </Float>
  );
};

const Sepatu = ({warna}) => {
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
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 5, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Use Suspense to handle loading of the 3D model */}
      <Suspense fallback={<CanvasLoader />}>
        {/* OrbitControls for user interaction */}
        <OrbitControls
          // enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Render the 3D model */}
        <SepatuModel isMobile={isMobile} warna={warna} />
      </Suspense>

      {/* Preload assets for better performance */}
      <Preload all />
    </Canvas>
  );
};

export default Sepatu;
