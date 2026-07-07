import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../components/Icon';
import { DomainCard, DOMAIN_ICONS } from '../components/DomainCard';
import { useProjectStore, DomainKey } from '../store/useProjectStore';

const DOMAINS: { key: DomainKey; count: number }[] = [
  { key: 'routier', count: 7 },
  { key: 'cadastral', count: 5 },
  { key: 'construction', count: 5 },
  { key: 'souterrain', count: 4 },
  { key: 'geodesie', count: 5 },
  { key: 'integres', count: 10 },
];

const QUICK: { label: string; icon: 'slope' | 'compass' | 'ruler' | 'car' | 'area' | 'level'; domain: DomainKey }[] = [
  { label: 'Pente', icon: 'slope', domain: 'routier' },
  { label: 'Gisement', icon: 'compass', domain: 'routier' },
  { label: 'Distance', icon: 'ruler', domain: 'routier' },
  { label: 'TMJA', icon: 'car', domain: 'routier' },
  { label: 'Superficie', icon: 'area', domain: 'cadastral' },
  { label: 'Nivellement', icon: 'level', domain: 'geodesie' },
];

export function HomePage({ onGoCalculs }: { onGoCalculs: () => void }) {
  const { t } = useTranslation();
  const { projet, terrainPoints, calcResults, setActiveDomain } = useProjectStore();

  function goDomain(key: DomainKey) {
    setActiveDomain(key);
    onGoCalculs();
  }

  return (
    <div className="pb-8">
      <div className="bg-primary px-5 pt-6 pb-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="compass" size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white text-[15px] font-bold">TopoCalc Pro</div>
            <div className="text-white/50 text-[10px] mt-0.5">Topographie · Calculs · IA</div>
          </div>
        </div>

        <div className="bg-white/[0.08] rounded-xl p-3.5 border border-white/[0.15]">
          <div className="flex items-center gap-2.5 mb-2.5">
            <Icon name="road" size={18} className="text-white/80" />
            <div className="flex-1 min-w-0">
              <div className="text-white text-[13px] font-bold truncate">{projet.nom}</div>
              <div className="text-white/55 text-[10px] mt-0.5">
                {t(`domaines.${projet.type}`)} · {calcResults.length + 47} calculs
              </div>
            </div>
          </div>
          <div className="bg-white/15 rounded h-[5px] mb-1">
            <div className="bg-accent h-[5px] rounded" style={{ width: `${projet.avancement}%` }} />
          </div>
          <div className="text-white/50 text-[10px] mb-2.5">Avancement : {projet.avancement}%</div>
          <div className="flex gap-2">
            {[
              { val: calcResults.length + 47, lbl: t('home.calculs'), color: 'text-white' },
              { val: 12, lbl: t('home.rapports'), color: 'text-accent' },
              { val: 3, lbl: t('home.enAttente'), color: 'text-warning' },
            ].map((s, i) => (
              <div key={i} className="flex-1 bg-white/[0.08] rounded-lg p-2 text-center">
                <div className={`text-[16px] font-bold ${s.color}`}>{s.val}</div>
                <div className="text-white/50 text-[9px] mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
          <div className="bg-primary px-3 py-2.5 flex items-center gap-2">
            <Icon name="robot" size={16} className="text-white" />
            <span className="text-white text-[12px] font-bold flex-1">{t('home.ai')}</span>
            <span className="bg-accent text-white text-[9px] font-bold rounded-full px-2 py-0.5">
              {t('home.aiActif')}
            </span>
          </div>
          <p className="text-[12px] text-textSecondary p-3 leading-relaxed">{t('home.aiMsg')}</p>
          <button
            onClick={() => goDomain('routier')}
            className="mx-3 mb-3 bg-accentLight hover:bg-accent/20 rounded-lg p-2.5 flex items-center gap-1.5 text-accentDark text-[12px] font-bold"
          >
            <Icon name="play" size={13} />
            {t('home.lancerCalc')}
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
          {t('home.domaines')}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DOMAINS.map((d) => (
            <DomainCard
              key={d.key}
              domainKey={d.key}
              label={t(`domaines.${d.key}`)}
              count={d.count}
              onPress={() => goDomain(d.key)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
          {t('home.acces')}
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK.map((q) => (
            <button
              key={q.label}
              onClick={() => goDomain(q.domain)}
              className="flex items-center gap-1.5 bg-surface rounded-full px-3 py-1.5 border border-border text-textPrimary text-[12px] font-semibold hover:border-accent/50"
            >
              <Icon name={q.icon} size={13} className="text-textSecondary" />
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {terrainPoints.length > 0 && (
        <div className="px-4 mt-4">
          <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
            Derniers points terrain
          </div>
          <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
            {[...terrainPoints].reverse().slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center gap-2.5 p-2.5 border-b border-border last:border-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-textPrimary truncate">
                    {p.numero} — {p.observation}
                  </div>
                  <div className="text-[10px] text-textSecondary">Z: {p.z.toFixed(3)} m</div>
                </div>
                <span className="text-[10px] text-textMuted">
                  {new Date(p.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
