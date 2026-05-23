import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Center } from '@react-three/drei';

export default function FlowerModel() {
  const modelRef = useRef();
  const groupRef = useRef();
  const { scene } = useGLTF('/bouquet.glb');
  const { mouse } = useThree();

  // Spring-lerp targets
  const lerpRef = useRef({ rotX: 0, rotY: 0 });

  // Apply cinematic material settings once
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.envMapIntensity = 1.4;
        child.material.roughness = 0.35;
        child.material.metalness = 0.08;
      }
    }
  });

  useFrame((state) => {
    if (!groupRef.current) return;

    // Target rotation derived from mouse position
    // Bouquet moves AWAY from cursor for subtle repel feel
    const targetX = -mouse.y * 0.3;
    const targetY = -mouse.x * 0.4;

    // Spring lerp – smooth interpolation (spring factor 0.06)
    lerpRef.current.rotX += (targetX - lerpRef.current.rotX) * 0.06;
    lerpRef.current.rotY += (targetY - lerpRef.current.rotY) * 0.06;

    groupRef.current.rotation.x = lerpRef.current.rotX;
    groupRef.current.rotation.y = lerpRef.current.rotY;

    // Subtle floating on Z (depth pulse)
    groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.4}
        floatingRange={[-0.08, 0.08]}
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
    </group>
  );
}

// Preload model to avoid jank
useGLTF.preload('/bouquet.glb');
