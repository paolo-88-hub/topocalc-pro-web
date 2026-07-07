import React from 'react';
import { Icon, IconName } from './Icon';
import { DomainKey } from '../store/useProjectStore';

const DOMAIN_COLORS: Record<DomainKey, { bg: string; dot: string; fg: string }> = {
  routier: { bg: '#FCEAE9', dot: '#E24B4A', fg: '#E24B4A' },
  cadastral: { bg: '#E4EFFA', dot: '#378ADD', fg: '#378ADD' },
  construction: { bg: '#FCF0DC', dot: '#EF9F27', fg: '#EF9F27' },
  souterrain: { bg: '#FBE9E2', dot: '#D85A30', fg: '#D85A30' },
  geodesie: { bg: '#EBE9FB', dot: '#7F77DD', fg: '#7F77DD' },
  integres: { bg: '#E4F3EC', dot: '#1A7F5A', fg: '#1A7F5A' },
};

export const DOMAIN_ICONS: Record<DomainKey, IconName> = {
  routier: 'road',
  cadastral: 'map',
  construction: 'crane',
  souterrain: 'pick',
  geodesie: 'globe',
  integres: 'grid',
};

export function DomainCard({
  domainKey,
  label,
  count,
  selected,
  onPress,
}: {
  domainKey: DomainKey;
  label: string;
  count: number;
  selected?: boolean;
  onPress: () => void;
}) {
  const c = DOMAIN_COLORS[domainKey];
  return (
    <button
      onClick={onPress}
      className={`relative text-left bg-surface rounded-xl border p-3 shadow-card transition-colors ${
        selected ? 'border-accent border-[1.5px]' : 'border-border hover:border-accent/40'
      }`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
        style={{ backgroundColor: c.bg }}
      >
        <Icon name={DOMAIN_ICONS[domainKey]} size={17} style={{ color: c.fg }} />
      </div>
      <div className="text-[12px] font-semibold text-textPrimary leading-tight">{label}</div>
      <div className="text-[10px] text-textSecondary mt-0.5">{count} modules</div>
      {selected && (
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
      )}
    </button>
  );
}
