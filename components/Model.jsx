"use client";

import React, { useRef } from 'react';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCustomizerStore } from '../store/useCustomizerStore';
import * as THREE from 'three';

function LogoDecal({ url, position, scale }) {
  const texture = useTexture(url);
  // Prevent repeating and improve quality
  texture.anisotropy = 16;
  
  return (
    <Decal 
      position={[position.x, position.y, position.z]} 
      rotation={[0, 0, 0]} 
      scale={[scale, scale, scale]}
      map={texture}
      depthTest={true}
    />
  );
}

export default function Model({ url }) {
  const { parts, logo, logoPosition, logoScale, view } = useCustomizerStore();
  const group = useRef();
  
  // Rotación suave entre vistas
  useFrame((state, delta) => {
    const targetRotationY = view === 'frontal' ? 0 : Math.PI;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 5 * delta);
  });

  return (
    <group ref={group} dispose={null}>
      {/* Torso / Base */}
      <mesh castShadow receiveShadow position={[0, 4, 0]} scale={[1, 1, 0.4]}>
        <cylinderGeometry args={[4, 3.8, 8, 64]} />
        <meshStandardMaterial color={parts.base} roughness={0.8} />
        
        {logo && (
          <LogoDecal 
            url={logo} 
            position={logoPosition} 
            scale={logoScale} 
          />
        )}
      </mesh>

      {/* Mangas */}
      <mesh position={[4, 6, 0]} castShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color={parts.mangas} roughness={0.8} />
      </mesh>
      <mesh position={[-4, 6, 0]} castShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color={parts.mangas} roughness={0.8} />
      </mesh>

      {/* Cuello */}
      <mesh position={[0, 8, 0]} castShadow>
        <torusGeometry args={[1.5, 0.3, 16, 100]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={parts.cuello} roughness={0.8} />
      </mesh>
    </group>
  );
}

// Pre-load si fuera necesario
// useGLTF.preload('/path/to/model.glb');
