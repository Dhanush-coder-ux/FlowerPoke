import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { motion } from 'framer-motion';
import FlowerModel from './FlowerModel';
import SceneLights from './SceneLights';
import FloatingParticles from './FloatingParticles';

// A simple HTML fallback loader using Framer Motion
const CanvasLoader = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    zIndex: 10,
  }}>
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(177,156,217,0.3) 0%, transparent 70%)',
        border: '2px solid rgba(177,156,217,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
      }}
    >
      🌸
    </motion.div>
    <div style={{ marginTop: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#B19CD9', letterSpacing: 2, textTransform: 'uppercase' }}>
      Arranging Blooms...
    </div>
  </div>
);

export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <CanvasLoader />;

  return (
    // Layer z-index: 20 — bouquet canvas sits above particles backdrop
    <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 20 }}>
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,              // transparent canvas bg
            toneMappingExposure: 1.3,
          }}
          camera={{ position: [0, 0, 10], fov: 40 }}
          style={{
            position: 'absolute',
            inset: 0,
            // Canvas itself must be transparent so text above bleeds through
            background: 'transparent',
            pointerEvents: 'auto',
          }}
        >
          {/* Lights */}
          <SceneLights />

          {/* Environment HDRI for realistic reflections */}
          <Environment preset="city" blur={0.8} />

          {/* 3D Bouquet model (cursor-reactive) */}
          <FlowerModel />

          {/* Floating 3D particles */}
          <FloatingParticles count={60} />

          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
