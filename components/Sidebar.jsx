"use client";
import React from 'react';

export default function Sidebar() {
  const openRef = (id) => {
    console.log(`Open reference ${id}`);
    // Logica faltante
  };

  return (
    <div className="side">
      <div className="refstrip">
        <div className="rlbl">📸 Referencia — UC Atletismo</div>
        <div className="rphotos">
          <div className="rph" onClick={() => openRef(0)}>
            {/* Placeholder de la imagen que se cortaba en Base64 */}
            <div style={{ width: '100%', height: '62px', background: '#182030', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#486070', fontSize: '9px' }}>IMG 1</div>
          </div>
        </div>
      </div>
      
      <div className="ctrls">
        <div className="clbl">CONTROLES</div>
        {/* Faltan los controles originales que se cortaron en el mensaje */}
      </div>
    </div>
  );
}
