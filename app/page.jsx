import React from 'react';
import Link from 'next/link';

export default function Catalog() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Pardoli</div>
        {/* Espacio para Auth / User Profile */}
      </nav>
      
      <main className="landing-container">
        <section className="hero-section">
          <h1 className="hero-title">EQUIPO SIN LÍMITES</h1>
          <p className="hero-subtitle">Personaliza indumentaria deportiva de alto rendimiento para ti o para todo tu equipo. Diseñado por ti, fabricado por nosotros.</p>
          <Link href="/producto/peto-femenino" className="cta-button">Empezar a Crear</Link>
        </section>
        
        <h2 className="section-title">Últimos Lanzamientos</h2>
        <div className="catalog-grid">
          
          <Link href="/producto/peto-femenino" className="product-item">
            <div className="product-image-container">
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '6rem', color: 'var(--text-primary)' }}>👕</div>
                 <div style={{ marginTop: '1rem', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>CUSTOMIZABLE</div>
               </div>
            </div>
            <h3>Peto Deportivo Femenino</h3>
            <p>Alto rendimiento • Personalizable</p>
          </Link>

          <div className="product-item" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            <div className="product-image-container">
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '6rem', filter: 'grayscale(1)' }}>🩳</div>
                 <div style={{ marginTop: '1rem', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>PRÓXIMAMENTE</div>
               </div>
            </div>
            <h3>Shorts de Entrenamiento</h3>
            <p>Clásico Ligero</p>
          </div>
          
        </div>
      </main>
    </div>
  );
}
