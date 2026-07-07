import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { DOMAIN_ICONS } from '../components/DomainCard';
import { useProjectStore, DomainKey } from '../store/useProjectStore';
import { allCalcsByDomain, CalcDefinition, CalcOutput } from '../lib/calculs';
import { CalcForm } from '../components/CalcForm';

const TABS: { key: DomainKey; label: string }[] = [
  { key: 'routier', label: 'Routière' },
  { key: 'integres', label: 'Intégrés' },
  { key: 'cadastral', label: 'Cadastral' },
  { key: 'construction', label: 'Construction' },
  { key: 'souterrain', label: 'Souterrain' },
  { key: 'geodesie', label: 'GPS' },
];

export function CalculsPage() {
  const { activeDomain, setActiveDomain, addCalcResult } = useProjectStore();
  const [selected, setSelected] = useState<CalcDefinition | null>(null);
  const list = allCalcsByDomain[activeDomain] || [];

  function handleResult(result: CalcOutput, inputs: Record<string, string>) {
    addCalcResult({
      id: Date.now().toString(),
      domaine: activeDomain,
      calcType: selected?.titre || '',
      inputs,
      result,
      timestamp: Date.now(),
    });
  }

  if (selected) {
    return <CalcForm calc={selected} onResult={handleResult} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-primary px-5 pt-6 pb-3.5">
        <div className="flex items-center gap-2 text-white text-[15px] font-bold mb-3">
          <Icon name="calc" size={18} />
          Calculs topographiques
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeDomain === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveDomain(tab.key)}
                className={`flex items-center gap-1.5 shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold border transition-colors ${
                  isActive
                    ? 'bg-accent border-accent text-white'
                    : 'bg-white/10 border-white/15 text-white/70'
                }`}
              >
                <Icon name={DOMAIN_ICONS[tab.key]} size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1">
        {list.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setSelected(calc)}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-surface border-b border-border text-left hover:bg-background/60"
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: calc.dot }} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-textPrimary">{calc.titre}</div>
              <div className="text-[11px] text-textSecondary mt-0.5">{calc.description}</div>
            </div>
            <Icon name="chevron" size={18} className="text-textMuted shrink-0" />
          </button>
        ))}
        {list.length === 0 && (
          <div className="p-8 text-center text-textMuted text-[13px]">Aucun module dans ce domaine pour l'instant.</div>
        )}
        <div className="h-8" />
      </div>
    </div>
  );
}
