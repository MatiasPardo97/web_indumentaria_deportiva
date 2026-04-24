"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useCustomizerStore } from '../store/useCustomizerStore';




import Model from './Model';

export default function Viewer3D() {
  const { view, setView } = useCustomizerStore();

  return (
    <div className="viewer-area">
      <div className="camera-controls">
        <button 
          className={`cam-btn ${view === 'frontal' ? 'active' : ''}`}
          onClick={() => setView('frontal')}
        >
          FRENTE
        </button>
        <button 
          className={`cam-btn ${view === 'trasera' ? 'active' : ''}`}
          onClick={() => setView('trasera')}
        >
          ESPALDA
        </button>
      </div>

      <Canvas shadows camera={{ position: [0, 5, 20], fov: 40 }}>
        <color attach="background" args={['#f5f5f5']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        <Environment preset="studio" />
        
        <React.Suspense fallback={null}>
          <Model />
        </React.Suspense>
        
        {/* Sombras realistas en el suelo */}
        <AccumulativeShadows 
          temporal 
          frames={100} 
          color="#111111" 
          colorBlend={2} 
          toneMapped={true} 
          alphaTest={0.7} 
          opacity={0.6} 
          scale={25} 
          position={[0, -0.01, 0]}
        >
          <RandomizedLight 
            amount={8} 
            radius={5} 
            ambient={0.5} 
            intensity={1} 
            position={[5, 8, -10]} 
            bias={0.001} 
          />
        </AccumulativeShadows>


        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={10}
          maxDistance={35}
          maxPolarAngle={Math.PI / 2 - 0.05} // No permitir ver debajo del suelo
          target={[0, 4, 0]}
        />
      </Canvas>
    </div>
  );
}
