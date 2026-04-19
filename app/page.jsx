import React from 'react';
import Link from 'next/link';

export default function Catalog() {
  return (
    <div className="catalog-wrapper">
      <header className="catalog-header">
        <div className="logo">U<span>Custom</span>izable</div>
        <p className="subtitle">Tu creatividad, tu rendimiento.</p>
      </header>
      
      <main className="catalog-container">
        <h1 className="catalog-title">Catálogo Oficial</h1>
        
        <div className="product-grid">
          
          <Link href="/producto/peto-femenino" className="product-card">
            <div className="product-image product-1">
              <span className="pbadge">Customizable 3D</span>
            </div>
            <div className="product-info">
              <h2>Peto Deportivo Femenino</h2>
              <p>Diseño de Competición - UC Atletismo</p>
              <div className="product-price">Ir al Diseñador ➔</div>
            </div>
          </Link>
          
          <div className="product-card disabled">
            <div className="product-image placeholder-image"></div>
            <div className="product-info">
              <h2>Shorts de Entrenamiento</h2>
              <p>Clásico Ligero</p>
              <div className="product-price">Próximamente</div>
            </div>
          </div>
          
          <div className="product-card disabled">
            <div className="product-image placeholder-image"></div>
            <div className="product-info">
              <h2>Polera Oficial UC</h2>
              <p>Manga Corta - Competencia</p>
              <div className="product-price">Próximamente</div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
