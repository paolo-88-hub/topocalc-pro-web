import React from 'react';
import { Icon } from './Icon';
import { TerrainPoint } from '../store/useProjectStore';

const DOT: Record<string, string> = {
  topographique: '#1A7F5A',
  nivellement: '#378ADD',
  borne: '#EF9F27',
  cheminement: '#7F77DD',
  implantation: '#E24B4A',
};

export function TerrainPointCard({ point, onDelete }: { point: TerrainPoint; onDelete?: () => void }) {
  const dot = DOT[point.type] || '#94A3B8';
  const time = new Date(point.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="flex items-center gap-3 py-2.5 px-3.5 border-b border-border last:border-0 bg-surface">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dot }} />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-textPrimary truncate">
          {point.numero} — {point.observation || 'Sans observation'}
        </div>
        <div className="text-[10px] text-textSecondary mt-0.5">
          X: {point.x.toFixed(3)} · Y: {point.y.toFixed(3)} · Z: {point.z.toFixed(3)}
        </div>
      </div>
      <span className="text-[10px] text-textMuted shrink-0">{time}</span>
      {onDelete && (
        <button onClick={onDelete} className="p-1 text-danger/70 hover:text-danger shrink-0" aria-label="Supprimer">
          <Icon name="trash" size={15} />
        </button>
      )}
    </div>
  );
}
