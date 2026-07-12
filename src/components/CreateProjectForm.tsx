import React, { useState } from 'react';
import { Icon } from './Icon';
import { DomainKey, Project } from '../store/useProjectStore';

const TYPES: { key: DomainKey; label: string }[] = [
  { key: 'routier', label: 'Routière' },
  { key: 'cadastral', label: 'Cadastrale' },
  { key: 'construction', label: 'Construction' },
  { key: 'souterrain', label: 'Souterraine' },
  { key: 'geodesie', label: 'Géodésie / GPS' },
  { key: 'integres', label: 'Intégrés' },
];

export function CreateProjectForm({ onCreate }: { onCreate: (p: Project) => void }) {
  const [nom, setNom] = useState('');
  const [type, setType] = useState<DomainKey>('routier');
  const [responsable, setResponsable] = useState('');
  const [pkDebut, setPkDebut] = useState('');
  const [pkFin, setPkFin] = useState('');

  function handleSubmit() {
    if (!nom.trim()) return;
    onCreate({
      id: Date.now().toString(),
      nom: nom.trim(),
      type,
      description: '',
      avancement: 0,
      dateDebut: new Date().toISOString().slice(0, 10),
      pkDebut: pkDebut.trim() || undefined,
      pkFin: pkFin.trim() || undefined,
      responsable: responsable.trim() || '—',
    });
  }

  return (
    <div className="px-4 -mt-2">
      <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="plus" size={17} className="text-accent" />
          <h2 className="text-[14px] font-bold text-textPrimary">Créer votre projet</h2>
        </div>
        <p className="text-[12px] text-textSecondary leading-relaxed mb-4">
          Aucun projet actif pour l'instant. Renseigne les informations de base pour démarrer —
          tu pourras les modifier à tout moment depuis ton profil.
        </p>

        <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">
          Nom du projet
        </label>
        <input
          className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted mb-3 focus:border-accent"
          placeholder="ex : RN3 — Yaoundé / Obala"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">
          Domaine principal
        </label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              className={`rounded-full px-3 py-1.5 text-[12px] border ${
                type === t.key
                  ? 'bg-accentLight border-accent text-accentDark font-bold'
                  : 'bg-background border-border text-textSecondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">
          Responsable
        </label>
        <input
          className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted mb-3 focus:border-accent"
          placeholder="ex : ton nom ou celui de ton studio"
          value={responsable}
          onChange={(e) => setResponsable(e.target.value)}
        />

        <div className="flex gap-2.5 mb-4">
          <div className="flex-1">
            <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">
              PK début (optionnel)
            </label>
            <input
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted focus:border-accent"
              placeholder="ex : 0+000"
              value={pkDebut}
              onChange={(e) => setPkDebut(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">
              PK fin (optionnel)
            </label>
            <input
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted focus:border-accent"
              placeholder="ex : 10+000"
              value={pkFin}
              onChange={(e) => setPkFin(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!nom.trim()}
          className="w-full bg-accent hover:bg-accentDark transition-colors rounded-lg py-3 flex items-center justify-center gap-2 text-white text-[14px] font-bold disabled:opacity-50"
        >
          <Icon name="check" size={16} />
          Créer le projet
        </button>
      </div>
    </div>
  );
}
