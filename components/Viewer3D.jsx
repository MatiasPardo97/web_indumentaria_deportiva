"use client";
import React, { useEffect } from 'react';

export default function Viewer3D() {

  const flipTo = (view) => {
    console.log(`Flip to ${view}`);
    // Falta implementar la logica original
  };

  useEffect(() => {
    // Inicializar Three.js
    // El script de Three.js original iba aqui
  }, []);

  return (
    <div className="viewer">
      <div className="vtoggle">
        <button className="vbtn on" id="bF" onClick={() => flipTo('frontal')}>FRONTAL</button>
        <button className="vbtn" id="bT" onClick={() => flipTo('trasera')}>TRASERA</button>
      </div>
      <canvas id="c3d"></canvas>
      <div className="vhint">🖱 Arrastra para rotar · Scroll para zoom</div>
    </div>
  );
}
