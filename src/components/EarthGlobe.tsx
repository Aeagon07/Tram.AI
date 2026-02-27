"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const CityMarker = ({ position, name, onClick }: { position: [number, number, number], name: string, onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#34d399" : "#10b981"} emissive={hovered ? "#34d399" : "#059669"} emissiveIntensity={2} />
      </mesh>
      <Html distanceFactor={10}>
        <div className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl border border-green-100 whitespace-nowrap">
            <p className="text-xs font-bold text-gray-900">{name}</p>
            <p className="text-[10px] text-green-600 font-semibold">Live Footage Avail.</p>
          </div>
        </div>
      </Html>
    </group>
  );
};

const Globe = ({ onCityClick }: { onCityClick: (city: string) => void }) => {
  const globeRef = useRef<THREE.Mesh>(null!);

  const cities = [
    { name: 'Pune', position: [0.35, 1.45, 1.3] as [number, number, number] },
    { name: 'Bengaluru', position: [0.55, 1.1, 1.5] as [number, number, number] },
    { name: 'Mumbai', position: [0.1, 1.5, 1.25] as [number, number, number] },
    { name: 'Delhi', position: [0.5, 2.1, 0.8] as [number, number, number] },
  ];

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.7}
          metalness={0.2}
          wireframe={true}
        />

        {cities.map((city, idx) => (
          <CityMarker
            key={idx}
            position={city.position}
            name={city.name}
            onClick={() => onCityClick(city.name)}
          />
        ))}
      </mesh>
    </group>
  );
};

export default function EarthGlobe({ onCitySelect }: { onCitySelect: (city: string) => void }) {
  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        <Globe onCityClick={onCitySelect} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-gray-400 font-bold pointer-events-none">
        Rotate and Click City Markers
      </div>
    </div>
  );
}
