import { routierCalcs, CalcDefinition } from './routier';
import { cadastralCalcs } from './cadastral';
import { geodesieCalcs } from './geodesie';
import { DomainKey } from '../../store/useProjectStore';

export * from './routier';
export * from './cadastral';
export * from './geodesie';

export const allCalcsByDomain: Record<DomainKey, CalcDefinition[]> = {
  routier: routierCalcs,
  cadastral: cadastralCalcs,
  construction: [
    {
      id: 'implantation',
      titre: 'Implantation d\'ouvrage',
      description: 'Distance et gisement depuis une station',
      dot: '#EF9F27',
      icon: 'crane',
      fields: [
        { id: 'xst', label: 'X station (m)', placeholder: 'ex: 0.000' },
        { id: 'yst', label: 'Y station (m)', placeholder: 'ex: 0.000' },
        { id: 'xp', label: 'X point à implanter (m)', placeholder: 'ex: 15.500' },
        { id: 'yp', label: 'Y point à implanter (m)', placeholder: 'ex: 22.300' },
      ],
      run(v) {
        const xs = parseFloat(v.xst), ys = parseFloat(v.yst);
        const xp = parseFloat(v.xp), yp = parseFloat(v.yp);
        if ([xs, ys, xp, yp].some(isNaN)) return null;
        const dx = xp - xs, dy = yp - ys;
        let g = Math.atan2(dx, dy) * (180 / Math.PI);
        if (g < 0) g += 360;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return {
          val: dist.toFixed(3), unit: 'm (distance d\'implantation)',
          alts: [
            { v: g.toFixed(4), u: 'gisement (°)' },
            { v: (g / 0.9).toFixed(4), u: 'gisement (gon)' },
          ],
          steps: [
            `Station : (${xs}, ${ys})`,
            `Point : (${xp}, ${yp})`,
            `ΔX = ${dx.toFixed(3)} m`,
            `ΔY = ${dy.toFixed(3)} m`,
            `Distance = ${dist.toFixed(3)} m`,
            `Gisement = ${g.toFixed(4)}°`,
          ],
        };
      },
    },
  ],
  souterrain: [
    {
      id: 'fermeture',
      titre: 'Fermeture de galerie',
      description: 'Erreur linéaire d\'une polygonale souterraine',
      dot: '#D85A30',
      icon: 'pick',
      fields: [
        { id: 'sumDx', label: 'Σ ΔX (m)', placeholder: 'ex: 0.023' },
        { id: 'sumDy', label: 'Σ ΔY (m)', placeholder: 'ex: -0.018' },
        { id: 'perim', label: 'Périmètre total (m)', placeholder: 'ex: 520' },
      ],
      run(v) {
        const sdx = parseFloat(v.sumDx), sdy = parseFloat(v.sumDy);
        const per = parseFloat(v.perim);
        if ([sdx, sdy, per].some(isNaN) || per === 0) return null;
        const ef = Math.sqrt(sdx * sdx + sdy * sdy);
        const rel = ef / per;
        const ok = rel < 1 / 5000;
        return {
          val: ef.toFixed(4), unit: 'm (erreur linéaire)',
          alts: [
            { v: `1/${Math.round(1 / rel)}`, u: 'erreur relative' },
            { v: ok ? 'Acceptable' : 'Hors tolérance', u: 'verdict' },
          ],
          steps: [
            `ΣΔX = ${sdx} m`,
            `ΣΔY = ${sdy} m`,
            `Ef = √(ΣΔX²+ΣΔY²) = ${ef.toFixed(4)} m`,
            `Erreur relative = 1/${Math.round(1 / rel)}`,
            ok ? 'Précision ≥ 1/5000 → ACCEPTABLE' : 'Précision < 1/5000 → HORS TOLÉRANCE',
          ],
        };
      },
    },
  ],
  geodesie: geodesieCalcs,
  integres: routierCalcs,
};
