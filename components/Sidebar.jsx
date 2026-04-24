"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomizerStore } from '../store/useCustomizerStore';
import { ChevronLeft, ChevronRight, Upload, Check } from 'lucide-react';

const PRESET_COLORS = [
  '#ffffff', // White
  '#f5f5f5', // Light Gray
  '#111111', // Black
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#eab308', // Yellow
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#f97316', // Orange
];

export default function Sidebar() {
  const { 
    parts, 
    setPartColor, 
    activePart, 
    stepIndex, 
    editableParts, 
    nextStep, 
    prevStep,
    logoScale,
    setLogoScale,
    logoPosition,
    setLogoPosition,
    setLogo 
  } = useCustomizerStore();
  
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const currentColor = parts[activePart];

  return (
    <div className="bottom-controls">
      {/* Paso de Navegación Central */}
      <div className="step-navigator">
        <button className="nav-arrow" onClick={prevStep}>
          <ChevronLeft size={20} />
        </button>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="step-info"
          >
            <span className="step-label">{activePart.toUpperCase()}</span>
            <span className="step-count">{stepIndex + 1} / {editableParts.length}</span>
          </motion.div>
        </AnimatePresence>

        <button className="nav-arrow" onClick={nextStep}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Selector de Colores o Ajustes de Logo */}
      <div className="controls-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePart}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activePart === 'logo' ? (
              <div className="logo-adjustments">
                <div className="adjustment-group">
                  <label>Escala</label>
                  <input 
                    type="range" min="0.5" max="5" step="0.1" 
                    value={logoScale} 
                    onChange={(e) => setLogoScale(parseFloat(e.target.value))} 
                  />
                </div>
                <div className="adjustment-group">
                  <label>Posición Y</label>
                  <input 
                    type="range" min="-3" max="3" step="0.1" 
                    value={logoPosition.y} 
                    onChange={(e) => setLogoPosition({ y: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
            ) : (
              <div className="color-selector-wrapper">
                <div className="color-options">
                  {PRESET_COLORS.map((c) => (
                    <motion.div 
                      key={c}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`color-circle ${currentColor === c ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setPartColor(activePart, c)}
                    >
                      {currentColor === c && <div className="color-indicator" />}
                    </motion.div>
                  ))}
                  
                  <div className="custom-color-btn">
                    <input 
                      type="color" 
                      value={currentColor} 
                      onChange={(e) => setPartColor(activePart, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>


      {/* Botones de acción adicionales (Opcional - Estilo Nike) */}
      <div className="action-buttons">
        <button className="icon-action-btn" onClick={() => fileInputRef.current?.click()}>
          <Upload size={18} />
          <input 
            type="file" 
            accept="image/png" 
            ref={fileInputRef} 
            style={{ display: 'none' }}
            onChange={handleLogoUpload}
          />
        </button>
      </div>
    </div>
  );
}

