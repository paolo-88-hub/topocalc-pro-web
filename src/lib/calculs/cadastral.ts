import { CalcDefinition } from './routier';

export const calculsSuperficie: CalcDefinition = {
  id: 'superficie',
  titre: 'Superficie de parcelle',
  description: 'Méthode du lacet (coordonnées des sommets)',
  dot: '#378ADD',
  icon: 'area',
  fields: [
    { id: 'coords', label: 'Coordonnées X,Y séparées par ; (ex: 0,0;10,0;10,8;0,8)', placeholder: '0,0;10,0;10,8;0,8' },
  ],
  run(v) {
    try {
      const pts = v.coords.split(';').map((p: string) => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
      });
      if (pts.length < 3) return null;
      let area = 0;
      for (let i = 0; i < pts.length; i++) {
        const j = (i + 1) % pts.length;
        area += pts[i].x * pts[j].y;
        area -= pts[j].x * pts[i].y;
      }
      const s = Math.abs(area) / 2;
      return {
        val: s.toFixed(2), unit: 'm²',
        alts: [
          { v: (s / 10000).toFixed(4), u: 'hectares (ha)' },
          { v: (s / 100).toFixed(2), u: 'ares (a)' },
          { v: pts.length.toString(), u: 'sommets' },
        ],
        steps: [
          `Sommets : ${pts.length}`,
          `Méthode : formule du lacet (Gauss-Shoelace)`,
          `S = |Σ(Xi×Yi+1 - Xi+1×Yi)| / 2`,
          `S = ${s.toFixed(2)} m²`,
          `S = ${(s / 10000).toFixed(4)} ha`,
        ],
      };
    } catch {
      return null;
    }
  },
};

export const calculsBornage: CalcDefinition = {
  id: 'bornage',
  titre: 'Coordonnées d\'une borne',
  description: 'Intersection de deux distances connues',
  dot: '#0C447C',
  icon: 'point',
  fields: [
    { id: 'x1', label: 'X station 1 (m)', placeholder: '0.000' },
    { id: 'y1', label: 'Y station 1 (m)', placeholder: '0.000' },
    { id: 'd1', label: 'Distance D1 (m)', placeholder: 'ex: 25.00' },
    { id: 'x2', label: 'X station 2 (m)', placeholder: '30.000' },
    { id: 'y2', label: 'Y station 2 (m)', placeholder: '0.000' },
    { id: 'd2', label: 'Distance D2 (m)', placeholder: 'ex: 20.00' },
  ],
  run(v) {
    const x1 = parseFloat(v.x1), y1 = parseFloat(v.y1), d1 = parseFloat(v.d1);
    const x2 = parseFloat(v.x2), y2 = parseFloat(v.y2), d2 = parseFloat(v.d2);
    if ([x1, y1, d1, x2, y2, d2].some(isNaN)) return null;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (d === 0) return null;
    const a = (d1 ** 2 - d2 ** 2 + d ** 2) / (2 * d);
    const h2 = d1 ** 2 - a ** 2;
    if (h2 < 0) return null;
    const h = Math.sqrt(h2);
    const mx = x1 + a * (x2 - x1) / d;
    const my = y1 + a * (y2 - y1) / d;
    const xP = mx + h * (y2 - y1) / d;
    const yP = my - h * (x2 - x1) / d;
    return {
      val: `(${xP.toFixed(3)} ; ${yP.toFixed(3)})`,
      unit: 'coordonnées borne',
      alts: [
        { v: xP.toFixed(3), u: 'X borne (m)' },
        { v: yP.toFixed(3), u: 'Y borne (m)' },
        { v: d.toFixed(3), u: 'Base D1→D2 (m)' },
      ],
      steps: [
        `Base = ${d.toFixed(3)} m`,
        `a = (D1²-D2²+Base²)/(2×Base) = ${a.toFixed(3)} m`,
        `h = √(D1²-a²) = ${h.toFixed(3)} m`,
        `X_borne = ${xP.toFixed(3)} m`,
        `Y_borne = ${yP.toFixed(3)} m`,
      ],
    };
  },
};

export const cadastralCalcs: CalcDefinition[] = [
  calculsSuperficie,
  calculsBornage,
];
