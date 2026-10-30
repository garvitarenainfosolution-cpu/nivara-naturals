import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// HELPER: Generate an elegant high-res procedural label texture
// Avoids external image loading lag and guarantees razor-sharp text
// -------------------------------------------------------------
function useLabelTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Luxurious warm linen/ivory label background
    ctx.fillStyle = '#FCFAF6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle gold outer border
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Inner gold hairline border
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    // Brand Arch/Emblem
    ctx.fillStyle = '#15291E';
    ctx.textAlign = 'center';

    // Botanical Lotus Icon
    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 36px serif';
    ctx.fillText('❦', canvas.width / 2, 140);

    // Brand Name: NIVARA
    ctx.fillStyle = '#15291E';
    ctx.font = 'bold 74px "Playfair Display", Georgia, serif';
    ctx.letterSpacing = '12px';
    ctx.fillText('NIVARA', canvas.width / 2, 230);

    // Subtitle: NATURALS
    ctx.fillStyle = '#C5A059';
    ctx.font = '600 24px "Inter", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('NATURALS • AYURVEDA', canvas.width / 2, 275);

    // Divider line
    ctx.strokeStyle = '#EFECE4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 180, 320);
    ctx.lineTo(canvas.width / 2 + 180, 320);
    ctx.stroke();

    // Formulation Title
    ctx.fillStyle = '#15291E';
    ctx.font = 'italic 500 38px "Playfair Display", serif';
    ctx.fillText('Bakuchiol 2% Botanical Youth Serum', canvas.width / 2, 385);

    // Actives specs
    ctx.fillStyle = '#637560';
    ctx.font = '500 22px "Inter", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('100% PLANT RETINOL ALTERNATIVE', canvas.width / 2, 440);
    ctx.fillText('KASHMIRI SAFFRON • GOTU KOLA', canvas.width / 2, 480);

    // Ayurvedic Batch Badge
    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('CLINICALLY PROVEN • AYUSH CERTIFIED', canvas.width / 2, 570);

    // Volume
    ctx.fillStyle = '#7B8E78';
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillText('30 ml / 1.0 fl. oz. e', canvas.width / 2, 660);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }, []);
}

// -------------------------------------------------------------
// 3D FLOATING SAGE BOTANICAL LEAF
// -------------------------------------------------------------
function FloatingLeaf({ position, rotation, scale = 1, speed = 1 }) {
  const leafRef = useRef();

  useFrame((state, delta) => {
    if (leafRef.current) {
      leafRef.current.rotation.x += delta * 0.3 * speed;
      leafRef.current.rotation.y += delta * 0.4 * speed;
    }
  });

  // Curved botanical leaf shape using ExtrudeGeometry
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.3, 0.4, 0.7, 0, 1.2);
    shape.bezierCurveTo(-0.4, 0.7, -0.2, 0.3, 0, 0);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });
  }, []);

  return (
    <mesh
      ref={leafRef}
      position={position}
      rotation={rotation}
      scale={scale}
      geometry={leafGeometry}
    >
      <meshStandardMaterial
        color="#7B8E78"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// -------------------------------------------------------------
// REALISTIC GLASS SERUM BOTTLE MODEL
// -------------------------------------------------------------
function SerumBottleMesh({ isInteracting }) {
  const bottleGroup = useRef();
  const labelTexture = useLabelTexture();

  // Gentle 360-degree idle rotation (slows down when user drags)
  useFrame((state, delta) => {
    if (bottleGroup.current && !isInteracting) {
      bottleGroup.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={bottleGroup} position={[0, -0.2, 0]}>
      
      {/* 1. MAIN BOTTLE CYLINDER (Thick Forest Green Glass) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.92, 2.5, 64]} />
        <meshPhysicalMaterial
          color="#163824"
          transmission={0.82}
          opacity={1}
          transparent={true}
          roughness={0.08}
          metalness={0.05}
          ior={1.52}
          thickness={0.6}
          specularColor="#FCFAF6"
          specularIntensity={1}
        />
      </mesh>

      {/* 2. INNER BOTANICAL SERUM VOLUME */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 2.1, 48]} />
        <meshPhysicalMaterial
          color="#2a5238"
          transmission={0.55}
          roughness={0.25}
          metalness={0.1}
          transparent={true}
          opacity={0.92}
          ior={1.34}
        />
      </mesh>

      {/* 3. BOTTLE CURVED SHOULDER */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.45, 0.92, 0.4, 64]} />
        <meshPhysicalMaterial
          color="#163824"
          transmission={0.82}
          roughness={0.08}
          transparent={true}
          ior={1.52}
          thickness={0.6}
        />
      </mesh>

      {/* 4. GLASS BOTTLE NECK */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.35, 48]} />
        <meshPhysicalMaterial
          color="#163824"
          transmission={0.82}
          roughness={0.08}
          transparent={true}
          ior={1.52}
        />
      </mesh>

      {/* 5. INTERNAL GLASS DROPPER PIPETTE (Visible through glass) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 2.5, 24]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.94}
          roughness={0.03}
          transparent={true}
          ior={1.5}
        />
      </mesh>

      {/* 6. ANODIZED GOLD DROPPER COLLAR (Reflective metallic ring) */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.46, 0.42, 48]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 7. GOLD COLLAR RIBBED ACCENT RING */}
      <mesh position={[0, 1.9, 0]}>
        <torusGeometry args={[0.47, 0.025, 16, 48]} />
        <meshStandardMaterial
          color="#C5A059"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* 8. MATTE FOREST RUBBER PIPETTE SQUEEZE BULB */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          color="#101F16"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.36, 0.38, 0.2, 32]} />
        <meshStandardMaterial
          color="#101F16"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* 9. LUXURY EMBOSSED PRODUCT LABEL (Curved across front) */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.935, 0.935, 1.5, 48, 1, true, -Math.PI * 0.45, Math.PI * 0.9]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.4}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

    </group>
  );
}

// -------------------------------------------------------------
// MAIN 3D CANVAS COMPONENT
// -------------------------------------------------------------
export const SerumBottle3D = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.5, 5.2], fov: 42 }}
        dpr={[1, 2]} // High performance DPR clamp
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Soft Warm Ambient Lighting */}
        <ambientLight intensity={0.7} color="#FCFAF6" />

        {/* Key Golden Studio Spotlight (highlights bottle shoulder & label) */}
        <spotLight
          position={[4, 6, 5]}
          intensity={2.4}
          angle={0.5}
          penumbra={0.8}
          color="#FFF8E7"
          castShadow
        />

        {/* Soft Organic Sage Fill Light */}
        <directionalLight
          position={[-4, 2, 3]}
          intensity={1.2}
          color="#CFDBCF"
        />

        {/* Back Rim Light (creates crisp edge highlights on glass) */}
        <directionalLight
          position={[0, 4, -5]}
          intensity={1.8}
          color="#E6ECE5"
        />

        {/* Floating Bottle Assembly with gentle hovering physics */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
          <SerumBottleMesh isInteracting={isDragging} />
        </Float>

        {/* Floating Botanical Sage Leaves */}
        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
          <FloatingLeaf position={[-1.8, 1.2, -0.6]} rotation={[0.4, 0.8, 0.2]} scale={0.65} speed={0.9} />
          <FloatingLeaf position={[1.9, -0.8, 0.4]} rotation={[-0.3, 0.5, -0.4]} scale={0.55} speed={1.1} />
          <FloatingLeaf position={[-1.4, -1.3, 0.7]} rotation={[0.8, -0.3, 0.6]} scale={0.5} speed={0.8} />
          <FloatingLeaf position={[1.6, 1.4, -0.5]} rotation={[0.2, -0.7, -0.3]} scale={0.6} speed={1.2} />
        </Float>

        {/* Drifting Golden Botanical Sparkles */}
        <Sparkles
          count={35}
          scale={5.5}
          size={3.2}
          speed={0.4}
          color="#D4AF37"
          opacity={0.6}
        />

        {/* Soft Ground Contact Shadow */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.65}
          scale={6}
          blur={2.4}
          far={4}
          color="#0A1810"
        />

        {/* Interactive Mouse & Touch Drag Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6} // Prevents flipping upside down
          maxPolarAngle={Math.PI / 1.75}
          dampingFactor={0.06}
          onStart={() => setIsDragging(true)}
          onEnd={() => setIsDragging(false)}
        />
      </Canvas>

      {/* Floating Interactive Drag Helper Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-forest-900/80 backdrop-blur-md text-sand-100 text-[11px] font-medium px-4 py-1.5 rounded-full border border-forest-700/80 shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
        <span>Drag to rotate 360° in 3D</span>
      </div>
    </div>
  );
};
