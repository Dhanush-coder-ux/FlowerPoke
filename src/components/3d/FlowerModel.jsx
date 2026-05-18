import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

export default function FlowerModel() {
  const modelRef = useRef();
  const { scene } = useGLTF('/bouquet.glb');
  const { mouse } = useThree();

  // Apply materials configuration for cinematic lighting
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.envMapIntensity = 1.2;
        child.material.roughness = 0.4;
        child.material.metalness = 0.1;
      }
    }
  });

  useFrame((state) => {
    if (!modelRef.current) return;
    // Subtle floating up/down
    modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <Center>
        <primitive 
          ref={modelRef}
          object={scene} 
          scale={5.5}
          rotation={[0.2, 0, 0]}
        />
      </Center>
    </Float>
  );
}

// Preload model to avoid jank
useGLTF.preload('/bouquet.glb');
