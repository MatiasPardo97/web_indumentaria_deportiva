import { create } from 'zustand';

export const useCustomizerStore = create((set) => ({
  // Estado de las partes de la prenda
  parts: {
    base: '#ffffff',
    mangas: '#ffffff',
    cuello: '#ffffff',
    detalles: '#00c8f0',
  },
  
  // Paso actual de la personalización
  activePart: 'base',
  stepIndex: 0,
  
  // Lista de partes editables (el orden define los pasos)
  editableParts: ['base', 'mangas', 'cuello', 'detalles', 'logo'],

  text: '',
  logo: null,
  logoPosition: { x: 0, y: 1, z: 4 },
  logoScale: 1.5,
  logoRotation: [0, 0, 0],
  view: 'frontal',

  // Acciones
  setPartColor: (part, color) => set((state) => ({
    parts: { ...state.parts, [part]: color }
  })),
  
  setActivePart: (part) => {
    const index = useCustomizerStore.getState().editableParts.indexOf(part);
    set({ activePart: part, stepIndex: index });
  },
  
  nextStep: () => set((state) => {
    const nextIndex = (state.stepIndex + 1) % state.editableParts.length;
    return {
      stepIndex: nextIndex,
      activePart: state.editableParts[nextIndex]
    };
  }),
  
  prevStep: () => set((state) => {
    const prevIndex = (state.stepIndex - 1 + state.editableParts.length) % state.editableParts.length;
    return {
      stepIndex: prevIndex,
      activePart: state.editableParts[prevIndex]
    };
  }),

  setText: (text) => set({ text }),
  setLogo: (logo) => set({ logo }),
  setLogoPosition: (pos) => set((state) => ({ logoPosition: { ...state.logoPosition, ...pos } })),
  setLogoScale: (scale) => set({ logoScale: scale }),
  setLogoRotation: (rot) => set({ logoRotation: rot }),
  setView: (view) => set({ view }),
}));


