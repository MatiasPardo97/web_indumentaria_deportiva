"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Viewer3D() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const [activeView, setActiveView] = useState('frontal');

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración básica de la escena
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05090d');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Limpiar si hay canvas anterior
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Controles para rotar
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controlsRef.current = controls;

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-10, -10, -10);
    scene.add(directionalLight2);

    // Geometría que simula forma de peto/torso (Cilindro con scale)
    const geometry = new THREE.CylinderGeometry(4, 3.8, 8, 64, 1, false);
    // Aplastamos el cilindro para que parezca un cuerpo humano
    geometry.scale(1, 1, 0.4);

    // Carga de texturas (Tus imágenes)
    const textureLoader = new THREE.TextureLoader();
    
    // Crearemos un material frontal y uno trasero, mapeando las imágenes
    // Importante: Si la imagen no está en public/, arrojará error 404 de consola pero no romperá el código, se verá gris
    const frontTexture = textureLoader.load('/front.png');
    const backTexture = textureLoader.load('/back.png');

    frontTexture.wrapS = THREE.RepeatWrapping;
    frontTexture.repeat.x = -1; // Ajuste para voltear si se ve en espejo
    backTexture.wrapS = THREE.RepeatWrapping;

    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x1e2c3c }), // 0 - lado
      new THREE.MeshStandardMaterial({ map: frontTexture }), // 1 - frente (asumiendo distribución de caras para cilindro)
      new THREE.MeshStandardMaterial({ color: 0x1e2c3c })  // 2 - superior/inferior
    ];

    // Para cilindro complejo, es mejor una sola textura con mapeo esférico, 
    // o dos planos levemente curvados:
    const frontGeom = new THREE.CylinderGeometry(4.1, 3.9, 8.1, 32, 1, true, -Math.PI / 2, Math.PI);
    frontGeom.scale(1, 1, 0.4);
    const backGeom = new THREE.CylinderGeometry(4.1, 3.9, 8.1, 32, 1, true, Math.PI / 2, Math.PI);
    backGeom.scale(1, 1, 0.4);

    const frontMesh = new THREE.Mesh(frontGeom, new THREE.MeshStandardMaterial({ map: frontTexture, side: THREE.DoubleSide, transparent: true, alphaTest: 0.1, color: 0xffffff }));
    const backMesh = new THREE.Mesh(backGeom, new THREE.MeshStandardMaterial({ map: backTexture, side: THREE.DoubleSide, transparent: true, alphaTest: 0.1, color: 0xffffff }));
    
    const petoGroup = new THREE.Group();
    petoGroup.add(frontMesh);
    petoGroup.add(backMesh);

    scene.add(petoGroup);

    // Ciclo de render
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const flipTo = (view) => {
    setActiveView(view);
    if (controlsRef.current && cameraRef.current) {
      if (view === 'frontal') {
        // Mover cámara al frente (Z positivo)
        cameraRef.current.position.set(0, 0, 20);
        controlsRef.current.target.set(0, 0, 0);
      } else {
        // Mover cámara atrás (Z negativo)
        cameraRef.current.position.set(0, 0, -20);
        controlsRef.current.target.set(0, 0, 0);
      }
      controlsRef.current.update();
    }
  };

  return (
    <div className="viewer" style={{ width: '100%', height: '100%' }}>
      <div className="vtoggle">
        <button 
          className={`vbtn ${activeView === 'frontal' ? 'on' : ''}`} 
          id="bF" 
          onClick={() => flipTo('frontal')}
        >
          FRONTAL
        </button>
        <button 
          className={`vbtn ${activeView === 'trasera' ? 'on' : ''}`} 
          id="bT" 
          onClick={() => flipTo('trasera')}
        >
          TRASERA
        </button>
      </div>
      <div ref={mountRef} id="c3d" style={{ width: '100%', height: '100%', minHeight: '520px' }}></div>
      <div className="vhint">🖱 Arrastra para rotar · Scroll para zoom</div>
    </div>
  );
}
