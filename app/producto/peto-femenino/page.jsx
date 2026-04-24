"use client";

import Link from 'next/link';
import Viewer3D from '../../../components/Viewer3D';
import Sidebar from '../../../components/Sidebar';

export default function PetoFemeninoPage() {
  return (
    <div>
      <nav className="navbar" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" className="logo">Pardoli</Link>
        <button className="btn-done" onClick={() => alert('Diseño guardado')}>LISTO</button>
      </nav>
      
      <div className="customizer-layout">
        <Viewer3D />
        <Sidebar />
      </div>
    </div>
  );
}
