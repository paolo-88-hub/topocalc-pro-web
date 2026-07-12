import { create } from 'zustand';

export type DomainKey =
  | 'routier' | 'cadastral' | 'construction'
  | 'souterrain' | 'geodesie' | 'integres';

export interface TerrainPoint {
  id: string;
  numero: string;
  type: string;
  x: number;
  y: number;
  z: number;
  observation: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface CalcResult {
  id: string;
  domaine: DomainKey;
  calcType: string;
  inputs: Record<string, string>;
  result: {
    val: string;
    unit: string;
    alts: { v: string; u: string }[];
    steps: string[];
  };
  timestamp: number;
}

export interface Rapport {
  id: string;
  nom: string;
  type: string;
  date: number;
  taille: string;
  points: number;
}

export interface Project {
  id: string;
  nom: string;
  type: DomainKey;
  description: string;
  avancement: number;
  dateDebut: string;
  pkDebut?: string;
  pkFin?: string;
  responsable: string;
}

interface AppState {
  langue: 'fr' | 'en';
  setLangue: (l: 'fr' | 'en') => void;
  projet: Project | null;
  setProjet: (p: Project) => void;
  terrainPoints: TerrainPoint[];
  addTerrainPoint: (p: TerrainPoint) => void;
  removeTerrainPoint: (id: string) => void;
  calcResults: CalcResult[];
  addCalcResult: (r: CalcResult) => void;
  rapports: Rapport[];
  addRapport: (r: Rapport) => void;
  activeDomain: DomainKey;
  setActiveDomain: (d: DomainKey) => void;
}

const STORAGE_KEY = 'topocalc-pro-state-v1';

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persist(partial: Record<string, unknown>) {
  try {
    const prev = loadPersisted() || {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...partial }));
  } catch {
    /* ignore quota errors */
  }
}

const persisted = loadPersisted();

export const useProjectStore = create<AppState>((set, get) => ({
  langue: persisted?.langue || 'fr',
  setLangue: (l) => { persist({ langue: l }); set({ langue: l }); },

  projet: persisted?.projet ?? null,
  setProjet: (p) => { persist({ projet: p }); set({ projet: p }); },

  terrainPoints: persisted?.terrainPoints || [],
  addTerrainPoint: (p) => {
    const list = [...get().terrainPoints, p];
    persist({ terrainPoints: list });
    set({ terrainPoints: list });
  },
  removeTerrainPoint: (id) => {
    const list = get().terrainPoints.filter((p) => p.id !== id);
    persist({ terrainPoints: list });
    set({ terrainPoints: list });
  },

  calcResults: persisted?.calcResults || [],
  addCalcResult: (r) => {
    const list = [r, ...get().calcResults];
    persist({ calcResults: list });
    set({ calcResults: list });
  },

  rapports: persisted?.rapports || [],
  addRapport: (r) => {
    const list = [r, ...get().rapports];
    persist({ rapports: list });
    set({ rapports: list });
  },

  activeDomain: persisted?.activeDomain || 'routier',
  setActiveDomain: (d) => set({ activeDomain: d }),
}));
