export default function SceneLights() {
  return (
    <>
      {/* Soft overall ambient light */}
      <ambientLight intensity={0.65} color="#FAF8FF" />
      
      {/* Main key light for dramatic shadows */}
      <directionalLight
        castShadow
        position={[5, 8, 5]}
        intensity={1.25}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        color="#ffffff"
      />
      
      {/* Soft fill light */}
      <directionalLight position={[-5, 5, -5]} intensity={0.55} color="#B19CD9" />
      
      {/* Luxury rim lighting (purple/lavender) to highlight edges */}
      <pointLight position={[0, -2, -5]} intensity={1.65} color="#8A6EB8" distance={20} />
      <pointLight position={[-3, 2, 4]} intensity={0.85} color="#C6B2E0" distance={15} />
      <pointLight position={[3, 3, 2]} intensity={0.65} color="#FAF2E6" distance={15} />
    </>
  );
}
