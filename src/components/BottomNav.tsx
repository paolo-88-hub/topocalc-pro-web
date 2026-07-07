import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from './Icon';

export type TabKey = 'accueil' | 'calculs' | 'terrain' | 'rapports' | 'profil';

const TABS: { key: TabKey; icon: IconName; labelKey: string }[] = [
  { key: 'accueil', icon: 'home', labelKey: 'tabs.home' },
  { key: 'calculs', icon: 'calc', labelKey: 'tabs.calculs' },
  { key: 'terrain', icon: 'pin', labelKey: 'tabs.terrain' },
  { key: 'rapports', icon: 'file', labelKey: 'tabs.rapports' },
  { key: 'profil', icon: 'user', labelKey: 'tabs.profil' },
];

export function BottomNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  const { t } = useTranslation();
  return (
    <nav className="no-print sticky bottom-0 left-0 right-0 z-20 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto grid grid-cols-5">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className="flex flex-col items-center gap-1 py-2.5 focus-visible:outline-none"
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                name={tab.icon}
                size={20}
                strokeWidth={isActive ? 2.1 : 1.7}
                className={isActive ? 'text-accent' : 'text-textMuted'}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-accent' : 'text-textMuted'}`}>
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
