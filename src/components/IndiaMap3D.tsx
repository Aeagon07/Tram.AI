"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const PuneMarker = ({ onClick }: { onClick: () => void }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={[-0.2, 0.4, 0.1]}>
            <mesh onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color={hovered ? "#34d399" : "#10b981"} emissive={hovered ? "#34d399" : "#059669"} emissiveIntensity={2} />
            </mesh>
            <Html distanceFactor={10}>
                <div className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl border border-green-100 whitespace-nowrap">
                        <p className="text-xs font-bold text-gray-900">Pune City</p>
                        <p className="text-[10px] text-green-600 font-semibold">Active Hub - Live Feed</p>
                    </div>
                </div>
            </Html>
        </group>
    );
};

const IndiaMap = ({ onPuneClick }: { onPuneClick: () => void }) => {
    const mapRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (mapRef.current) {
            mapRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
        }
    });

    return (
        <group ref={mapRef}>
            {/* India Map Shape (Stylized Wired Mesh) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4, 5, 20, 20]} />
                <meshStandardMaterial
                    color="#1e293b"
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Background Glow */}
            <mesh position={[0, 0, -0.5]}>
                <planeGeometry args={[6, 6]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} />
            </mesh>

            {/* Main Label */}
            <Html position={[0, -2.5, 0]} center>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold whitespace-nowrap">
                    Interactive Node Map: India
                </div>
            </Html>

            <PuneMarker onClick={onPuneClick} />
        </group>
    );
};

export default function IndiaMap3D({ onPuneSelect }: { onPuneSelect: () => void }) {
    return (
        <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <IndiaMap onPuneClick={onPuneSelect} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
