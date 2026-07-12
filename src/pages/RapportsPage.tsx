import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '../components/Icon';
import { useProjectStore } from '../store/useProjectStore';
import { generateRapportPDF, exportPointsCSV } from '../lib/pdf';

const FORMATS: { fmt: string; icon: IconName; bg: string; fg: string; ready: boolean }[] = [
  { fmt: 'PDF', icon: 'pdf', bg: '#F8E4E4', fg: '#791F1F', ready: true },
  { fmt: 'CSV', icon: 'csv', bg: '#E4F3EC', fg: '#27500A', ready: true },
  { fmt: 'Excel', icon: 'xls', bg: '#E4F3EC', fg: '#145F44', ready: false },
  { fmt: 'DXF', icon: 'dxf', bg: '#E4EFFA', fg: '#0C447C', ready: false },
  { fmt: 'KML', icon: 'kml', bg: '#FCF0DC', fg: '#633806', ready: false },
  { fmt: 'SHP', icon: 'shp', bg: '#EBE9FB', fg: '#3C3489', ready: false },
];

export function RapportsPage() {
  const { t } = useTranslation();
  const { rapports, projet, calcResults, terrainPoints } = useProjectStore();
  const [loading, setLoading] = useState(false);

  function handlePDF() {
    if (!projet) {
      alert('Crée un projet depuis l\'accueil avant de générer un rapport.');
      return;
    }
    setLoading(true);
    try {
      generateRapportPDF(projet, calcResults, terrainPoints);
    } finally {
      setLoading(false);
    }
  }

  function handleFormat(fmt: string) {
    if (fmt === 'PDF') return handlePDF();
    if (fmt === 'CSV') {
      const filename = projet ? `${projet.nom.replace(/\s+/g, '_')}_points.csv` : 'points-terrain.csv';
      return exportPointsCSV(terrainPoints, filename);
    }
    alert(`Export ${fmt} — disponible dans la version complète.`);
  }

  return (
    <div className="pb-8">
      <div className="bg-primary px-5 pt-6 pb-5">
        <div className="flex items-center gap-2 text-white text-[15px] font-bold mb-3">
          <Icon name="file" size={18} />
          {t('rapports.titre')}
        </div>
        <div className="flex gap-2">
          {[
            { val: terrainPoints.length, lbl: 'Points terrain', color: 'text-white' },
            { val: calcResults.length, lbl: 'Calculs', color: 'text-accent' },
            { val: rapports.length, lbl: 'Rapports', color: 'text-warning' },
          ].map((s, i) => (
            <div key={i} className="flex-1 bg-white/[0.08] rounded-lg p-2.5 text-center">
              <div className={`text-[20px] font-bold ${s.color}`}>{s.val}</div>
              <div className="text-white/50 text-[9px] mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <Icon name="robot" size={22} className="text-accent" />
            <div className="text-[14px] font-bold text-textPrimary">Générer un rapport complet</div>
          </div>
          <p className="text-[12px] text-textSecondary leading-relaxed mb-3.5">
            Compile tous les points terrain et calculs en un rapport PDF professionnel, prêt à imprimer ou partager.
          </p>
          <button
            onClick={handlePDF}
            disabled={loading}
            className="w-full bg-accent hover:bg-accentDark transition-colors rounded-lg py-3.5 flex items-center justify-center gap-2 text-white text-[14px] font-bold disabled:opacity-60"
          >
            <Icon name="pdf" size={16} />
            {loading ? 'Génération…' : 'Générer le PDF et imprimer'}
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
          Formats d'export
        </div>
        <div className="grid grid-cols-3 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.fmt}
              onClick={() => handleFormat(f.fmt)}
              className="rounded-lg p-3 flex flex-col items-center gap-1.5 relative"
              style={{ backgroundColor: f.bg }}
            >
              <Icon name={f.icon} size={22} style={{ color: f.fg }} />
              <span className="text-[12px] font-bold" style={{ color: f.fg }}>{f.fmt}</span>
              {!f.ready && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
          {t('rapports.generes')} ({rapports.length})
        </div>
        {rapports.map((r) => (
          <div key={r.id} className="bg-surface rounded-xl border border-border p-3.5 mb-2.5 shadow-card">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: r.type === 'pdf' ? '#F8E4E4' : '#E4F3EC' }}
              >
                <Icon name={r.type === 'pdf' ? 'pdf' : 'csv'} size={18} style={{ color: r.type === 'pdf' ? '#791F1F' : '#27500A' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-textPrimary truncate">{r.nom}</div>
                <div className="text-[10px] text-textSecondary mt-0.5">
                  {r.type.toUpperCase()} · {r.taille} · {new Date(r.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {(['download', 'share'] as IconName[]).map((icon, idx) => (
                <button
                  key={icon}
                  onClick={() => alert(`${idx === 0 ? 'Télécharger' : 'Partager'} "${r.nom}"`)}
                  className="flex-1 bg-background border border-border rounded-md py-2 flex items-center justify-center gap-1.5 text-textSecondary text-[11px] font-bold"
                >
                  <Icon name={icon} size={13} />
                  {idx === 0 ? 'Télécharger' : 'Partager'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {calcResults.length > 0 && (
        <div className="px-4 mt-4">
          <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
            Calculs enregistrés ({calcResults.length})
          </div>
          {calcResults.map((r) => (
            <div key={r.id} className="bg-surface rounded-lg border border-border p-3 mb-2 shadow-card">
              <div className="flex justify-between mb-1">
                <span className="text-[13px] font-bold text-textPrimary">{r.calcType}</span>
                <span className="text-[11px] text-textSecondary">{new Date(r.timestamp).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="text-[18px] font-bold text-accent">
                {r.result.val} <span className="text-[11px] text-textSecondary font-normal">{r.result.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
