import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Create a separate component for the content inside Canvas
const AnimatedContent = () => {
  const textRef = useRef();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#ffffff" />
      <Text
        ref={textRef}
        fontSize={2}
        color="#00A4E4" // Adjust color based on your theme
        anchorX="center"
        anchorY="middle"
      >
        AICMS
      </Text>
      <OrbitControls />
    </>
  );
};

const AICMSAnimation = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <Canvas>
        <AnimatedContent />
      </Canvas>
    </div>
  );
};

export default AICMSAnimation;
