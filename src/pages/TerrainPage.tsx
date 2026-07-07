import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../components/Icon';
import { useProjectStore, TerrainPoint } from '../store/useProjectStore';
import { TerrainPointCard } from '../components/TerrainPointCard';

const TYPES = ['topographique', 'nivellement', 'borne', 'cheminement', 'implantation'];

interface Coords {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

export function TerrainPage() {
  const { t } = useTranslation();
  const { terrainPoints, addTerrainPoint, removeTerrainPoint } = useProjectStore();
  const [location, setLocation] = useState<Coords | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [type, setType] = useState('topographique');
  const [form, setForm] = useState({ numero: '', x: '', y: '', z: '', observation: '' });

  useEffect(() => { getLocation(); }, []);

  function getLocation() {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude,
        });
        setStatus('idle');
      },
      () => setStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleSave() {
    if (!form.numero.trim()) {
      alert('Numéro du point requis.');
      return;
    }
    const p: TerrainPoint = {
      id: Date.now().toString(),
      numero: form.numero,
      type,
      x: parseFloat(form.x) || location?.longitude || 0,
      y: parseFloat(form.y) || location?.latitude || 0,
      z: parseFloat(form.z) || location?.altitude || 0,
      observation: form.observation,
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      timestamp: Date.now(),
    };
    addTerrainPoint(p);
    setForm({ numero: '', x: '', y: '', z: '', observation: '' });
  }

  return (
    <div className="pb-8">
      <div className="bg-primary px-5 pt-6 pb-5">
        <div className="flex items-center gap-2 text-white text-[15px] font-bold mb-3">
          <Icon name="pin" size={18} />
          {t('terrain.titre')}
        </div>
        <button
          onClick={getLocation}
          className="w-full bg-accent/20 border border-accent/50 rounded-lg p-3 flex items-center gap-2.5 text-left"
        >
          <Icon
            name={status === 'loading' ? 'refresh' : 'gps'}
            size={20}
            className={`text-accent shrink-0 ${status === 'loading' ? 'animate-spin' : ''}`}
          />
          <div className="flex-1 min-w-0">
            {location ? (
              <>
                <div className="text-white text-[12px] font-bold">{t('terrain.gpsVerrouille')}</div>
                <div className="text-white/70 text-[11px] mt-0.5">
                  {location.latitude.toFixed(6)}°N {location.longitude.toFixed(6)}°E
                </div>
                <div className="text-white/50 text-[10px] mt-0.5">
                  Alt. : {(location.altitude ?? 0).toFixed(2)} m
                </div>
              </>
            ) : status === 'error' ? (
              <div className="text-white text-[12px] font-bold">{t('terrain.gpsIndisponible')}</div>
            ) : (
              <div className="text-white text-[12px] font-bold">{t('terrain.gpsRecherche')}</div>
            )}
          </div>
          <Icon name="refresh" size={18} className="text-white shrink-0" />
        </button>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
          Nouveau point
        </div>
        <div className="bg-surface rounded-xl border border-border p-3.5 shadow-card">
          <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">
            {t('terrain.typeReleve')}
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-0.5 px-0.5">
            {TYPES.map((tp) => (
              <button
                key={tp}
                onClick={() => setType(tp)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] border ${
                  type === tp
                    ? 'bg-accentLight border-accent text-accentDark font-bold'
                    : 'bg-background border-border text-textSecondary'
                }`}
              >
                {t(`terrain.types.${tp}`)}
              </button>
            ))}
          </div>

          <Field label={t('terrain.pointNum')} placeholder="ex: P-048" value={form.numero}
            onChange={(v) => setForm((f) => ({ ...f, numero: v }))} />

          <div className="flex gap-2.5">
            <div className="flex-1">
              <Field label={`${t('terrain.coordX')} (m)`} placeholder="ex: 731245.32" value={form.x} numeric
                onChange={(v) => setForm((f) => ({ ...f, x: v }))} />
            </div>
            <div className="flex-1">
              <Field label={`${t('terrain.coordY')} (m)`} placeholder="ex: 421082.17" value={form.y} numeric
                onChange={(v) => setForm((f) => ({ ...f, y: v }))} />
            </div>
          </div>

          <Field label={t('terrain.altitude')} placeholder="ex: 892.45" value={form.z} numeric
            onChange={(v) => setForm((f) => ({ ...f, z: v }))} />

          <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 mt-1.5 block">
            {t('terrain.observation')}
          </label>
          <textarea
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted h-[72px] resize-none focus:border-accent"
            placeholder="Décris ce que tu observes..."
            value={form.observation}
            onChange={(e) => setForm((f) => ({ ...f, observation: e.target.value }))}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-accent hover:bg-accentDark transition-colors rounded-lg py-3.5 mt-3 flex items-center justify-center gap-2 text-white text-[14px] font-bold"
        >
          <Icon name="save" size={16} />
          {t('terrain.enregistrer')}
        </button>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2.5">
          {t('terrain.donneesActives')} ({terrainPoints.length})
        </div>
        <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
          {terrainPoints.length === 0 && (
            <div className="p-4 text-center text-textMuted text-[13px]">Aucun point enregistré.</div>
          )}
          {[...terrainPoints].reverse().map((p) => (
            <TerrainPointCard
              key={p.id}
              point={p}
              onDelete={() => {
                if (confirm(`Supprimer ${p.numero} ?`)) removeTerrainPoint(p.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label, placeholder, value, onChange, numeric,
}: { label: string; placeholder: string; value: string; onChange: (v: string) => void; numeric?: boolean }) {
  return (
    <div className="mb-2.5">
      <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wide mb-1 block">{label}</label>
      <input
        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted focus:border-accent"
        placeholder={placeholder}
        inputMode={numeric ? 'decimal' : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
