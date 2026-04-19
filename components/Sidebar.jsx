"use client";
import React from 'react';

export default function Sidebar() {
  const openRef = (id) => {
    console.log(`Open reference ${id}`);
    // Aquí podrías agregar un modal para expandir las fotos de referencia
    alert("Función para expandir imagen cargando...");
  };

  return (
    <div className="side">
      <div className="refstrip">
        <div className="rlbl">📸 Referencia — Diseño Actual</div>
        <div className="rphotos">
          <div className="rph" onClick={() => openRef(0)}>
            <img src="/front.png" alt="Frente" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=Sube+front.png"; }} style={{ width: '100%', height: '62px', objectFit: 'cover' }} />
          </div>
          <div className="rph" onClick={() => openRef(1)}>
            <img src="/back.png" alt="Trasera" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=Sube+back.png"; }} style={{ width: '100%', height: '62px', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      
      <div className="ctrls">
        <div className="clbl">CONTROLES</div>
        <p style={{fontSize: '11px', color: 'var(--muted)'}}>
          Actualmente visualizando las imágenes en el entorno 3D. <br/><br/>
          <strong>Importante:</strong> Al subir las imágenes como PNG transparente, el modelo 3D tomará la forma exacta de la ropa sin el fondo cuadrado.<br/><br/>
          <strong>Instrucciones:</strong> Recuerda colocar la imagen frontal bajo el nombre exacto <code>front.png</code> y la imagen trasera bajo el nombre <code>back.png</code> directamente dentro de la carpeta <code>public/</code>.
        </p>
      </div>
    </div>
  );
}
