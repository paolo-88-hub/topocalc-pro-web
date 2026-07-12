import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Icon, IconName } from '../components/Icon';
import { useProjectStore } from '../store/useProjectStore';

export function ProfilPage() {
  const { t } = useTranslation();
  const { langue, setLangue, projet } = useProjectStore();

  function changeLang(l: 'fr' | 'en') {
    setLangue(l);
    i18n.changeLanguage(l);
    localStorage.setItem('topocalc-lang', l);
  }

  const SETTINGS: { icon: IconName; label: string; value?: string; valueClass?: string; onPress: () => void }[] = [
    {
      icon: 'globe', label: t('profil.langue'), value: langue === 'fr' ? 'Français' : 'English',
      onPress: () => changeLang(langue === 'fr' ? 'en' : 'fr'),
    },
    {
      icon: 'cloud', label: t('profil.sync'), value: 'Synchronisé',
      onPress: () => alert('Synchronisation cloud — version complète.'),
    },
    {
      icon: 'robot', label: t('profil.ai'), value: t('profil.actif'), valueClass: 'text-accent',
      onPress: () => alert("L'assistant IA analyse vos données automatiquement."),
    },
    {
      icon: 'wifi-off', label: t('profil.horsLigne'), value: t('profil.bientot'), valueClass: 'text-warning',
      onPress: () => alert('Disponible dans la prochaine version.'),
    },
    {
      icon: 'info', label: t('profil.apropos'),
      onPress: () => alert('TopoCalc Pro v1.0\nBDL Studio · ENSPY\nReact · Vite · Web'),
    },
  ];

  return (
    <div className="pb-8">
      <div className="bg-primary px-5 pt-6 pb-5">
        <div className="flex items-center gap-2 text-white text-[15px] font-bold mb-3.5">
          <Icon name="user" size={18} />
          {t('profil.titre')}
        </div>
        <div className="flex items-center gap-3.5">
          <div className="w-[52px] h-[52px] rounded-full bg-accentLight flex items-center justify-center shrink-0">
            <span className="text-[18px] font-bold text-accentDark">BDL</span>
          </div>
          <div>
            <div className="text-white text-[15px] font-bold">BDL Studio</div>
            <div className="text-white/60 text-[11px] mt-0.5">Géomètre-topographe · ENSPY</div>
            <span className="inline-block bg-accent text-white text-[10px] font-bold rounded-full px-2 py-0.5 mt-1.5">
              {t('profil.planPro')}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">Projet actif</div>
        <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
          {!projet ? (
            <div className="p-4 text-center text-textMuted text-[13px]">
              Aucun projet actif — crée-en un depuis l'accueil.
            </div>
          ) : (
            [
              ['Nom', projet.nom],
              ['Type', projet.type],
              ['Tronçon', projet.pkDebut ? `PK ${projet.pkDebut} – ${projet.pkFin}` : '—'],
              ['Responsable', projet.responsable],
              ['Avancement', `${projet.avancement}%`],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                className={`flex justify-between px-3.5 py-2.5 border-b border-border ${i === arr.length - 1 ? 'border-0' : ''}`}
              >
                <span className="text-[12px] text-textSecondary">{k}</span>
                <span className="text-[12px] font-bold text-textPrimary">{v}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">Paramètres</div>
        <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
          {SETTINGS.map((s, i) => (
            <button
              key={i}
              onClick={s.onPress}
              className={`w-full flex items-center gap-2.5 px-3.5 py-3 border-b border-border text-left ${
                i === SETTINGS.length - 1 ? 'border-0' : ''
              }`}
            >
              <Icon name={s.icon} size={17} className="text-textSecondary" />
              <span className="flex-1 text-[13px] text-textPrimary">{s.label}</span>
              {s.value && <span className={`text-[12px] font-bold ${s.valueClass || 'text-textSecondary'}`}>{s.value}</span>}
              <Icon name="chevron" size={17} className="text-textMuted" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">Langue</div>
        <div className="flex gap-2.5">
          {[{ code: 'fr' as const, label: 'Français' }, { code: 'en' as const, label: 'English' }].map((l) => (
            <button
              key={l.code}
              onClick={() => changeLang(l.code)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg p-3 border ${
                langue === l.code ? 'border-accent bg-accentLight text-accentDark' : 'border-border bg-surface text-textSecondary'
              } text-[13px] font-bold`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-surface rounded-lg p-3 text-center border border-border">
          <p className="text-[11px] text-textMuted leading-relaxed">
            TopoCalc Pro v1.0.0 · Build Web 2026.07<br />
            React · Vite · BDL Studio
          </p>
        </div>
      </div>
    </div>
  );
}
