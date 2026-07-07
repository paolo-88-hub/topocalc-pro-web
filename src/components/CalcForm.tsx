import React, { useState } from 'react';
import { Icon } from './Icon';
import { CalcDefinition, CalcOutput } from '../lib/calculs';

interface Props {
  calc: CalcDefinition;
  onResult?: (result: CalcOutput, inputs: Record<string, string>) => void;
  onBack: () => void;
}

export function CalcForm({ calc, onResult, onBack }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalcOutput | null>(null);
  const [error, setError] = useState(false);

  function handleCalc() {
    const res = calc.run(values);
    if (!res) {
      setError(true);
      setResult(null);
      return;
    }
    setError(false);
    setResult(res);
    onResult?.(res, values);
  }

  return (
    <div className="flex flex-col min-h-full">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-4 py-3.5 bg-surface border-b border-border text-textSecondary text-[13px] hover:text-textPrimary"
      >
        <Icon name="back" size={16} />
        Retour
      </button>

      <div className="flex items-start gap-3 p-4 bg-surface border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: calc.dot }} />
        <div>
          <h2 className="text-[15px] font-semibold text-textPrimary">{calc.titre}</h2>
          <p className="text-[11px] text-textSecondary mt-0.5">{calc.description}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {calc.fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-textSecondary uppercase tracking-wide">
              {field.label}
            </label>
            <input
              className="bg-surface border border-border rounded-lg px-3 py-2.5 text-[14px] text-textPrimary placeholder:text-textMuted focus:border-accent"
              placeholder={field.placeholder}
              inputMode={field.id === 'coords' ? 'text' : 'decimal'}
              value={values[field.id] || ''}
              onChange={(e) => setValues((p) => ({ ...p, [field.id]: e.target.value }))}
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-lg bg-dangerLight text-danger text-[12px]">
          Vérifiez les valeurs saisies.
        </div>
      )}

      <div className="px-4">
        <button
          onClick={handleCalc}
          className="w-full bg-accent hover:bg-accentDark transition-colors rounded-lg py-3 flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
        >
          <Icon name="play" size={15} />
          Calculer
        </button>
      </div>

      {result && (
        <div className="m-4 bg-surface rounded-xl border border-border overflow-hidden">
          <div className="px-3 pt-3 text-[10px] font-bold text-accentDark tracking-wide uppercase">Résultat</div>
          <div className="mx-3 mb-2 pl-3 border-l-[3px] border-accent">
            <div className="text-[28px] font-bold text-accent leading-tight">{result.val}</div>
            <div className="text-[13px] text-textSecondary mt-0.5">{result.unit}</div>
          </div>
          <div className="flex flex-wrap gap-2 px-3 pb-3">
            {result.alts.filter((a) => a.v).map((alt, i) => (
              <div key={i} className="bg-background rounded-md border border-border px-2.5 py-1.5 min-w-[80px]">
                <div className="text-[13px] font-semibold text-textPrimary">{alt.v}</div>
                <div className="text-[10px] text-textSecondary">{alt.u}</div>
              </div>
            ))}
          </div>
          <div className="bg-background rounded-lg m-3 mt-0 p-3">
            <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wide mb-2">
              Étapes de calcul
            </div>
            {result.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 py-1 border-b border-border last:border-0">
                <span className="w-[18px] h-[18px] rounded-full bg-accentLight text-accentDark text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[11px] text-textSecondary leading-relaxed font-mono">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="h-8" />
    </div>
  );
}
