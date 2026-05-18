import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles({ count = 50 }) {
  const mesh = useRef();
  const prevMouse = useRef({ x: 0, y: 0 });
  
  // Pre-calculate random positions and velocities
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01 + 0.005, // Slight upward drift
        z: (Math.random() - 0.5) * 0.01
      };
      
      const scale = Math.random() * 0.08 + 0.02;
      
      temp.push({ x, y, z, velocity, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Scale normalized mouse coordinates (-1 to 1) to match 3D bounds
    const mouseX = state.mouse.x * 6;
    const mouseY = state.mouse.y * 6;
    
    // Calculate mouse velocity (direction & speed of drag)
    const dx = mouseX - prevMouse.current.x;
    const dy = mouseY - prevMouse.current.y;
    
    // Save current coordinates for the next frame
    prevMouse.current.x = mouseX;
    prevMouse.current.y = mouseY;
    
    particles.forEach((particle, i) => {
      // Apply mouse movement impulse to velocity (anti-gravity sway)
      particle.velocity.x += dx * 0.04;
      particle.velocity.y += dy * 0.04;
      
      // Update particle position
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.z += particle.velocity.z;
      
      // Apply drag (damping) so velocities slow down beautifully
      particle.velocity.x *= 0.94;
      particle.velocity.y *= 0.94;
      
      // Gentle ambient upward float restoring force
      particle.velocity.y += 0.0006;
      
      // Reset if drifted completely out of bounds (re-spawn on opposite side)
      if (particle.y > 8) {
        particle.y = -8;
        particle.velocity.y = 0.005;
      }
      if (particle.y < -8) {
        particle.y = 8;
        particle.velocity.y = -0.005;
      }
      if (particle.x > 8) particle.x = -8;
      if (particle.x < -8) particle.x = 8;
      if (particle.z > 8) particle.z = -8;
      if (particle.z < -8) particle.z = 8;
      
      // Apply transforms
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Ambient drift rotation
    mesh.current.rotation.y += 0.0004;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color="#9E81D6" 
        emissive="#8A6EB8"
        emissiveIntensity={1.25}
        transparent={true} 
        opacity={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
