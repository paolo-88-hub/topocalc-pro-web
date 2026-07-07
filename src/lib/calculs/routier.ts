export interface CalcField {
  id: string;
  label: string;
  placeholder: string;
}

export interface CalcOutput {
  val: string;
  unit: string;
  alts: { v: string; u: string }[];
  steps: string[];
}

export interface CalcDefinition {
  id: string;
  titre: string;
  description: string;
  dot: string;
  icon: string;
  fields: CalcField[];
  run: (vals: Record<string, string>) => CalcOutput | null;
}

export const calculsPente: CalcDefinition = {
  id: 'pente',
  titre: 'Calcul de pente',
  description: 'Pente longitudinale — %, °, rapport 1/n',
  dot: '#E24B4A',
  icon: 'slope',
  fields: [
    { id: 'dh', label: 'Dénivelée ΔH (m)', placeholder: 'ex: 15.40' },
    { id: 'dl', label: 'Distance horizontale L (m)', placeholder: 'ex: 85.00' },
  ],
  run(v) {
    const dH = parseFloat(v.dh), L = parseFloat(v.dl);
    if (isNaN(dH) || isNaN(L) || L === 0) return null;
    const pct = (dH / L) * 100;
    const deg = Math.atan(dH / L) * (180 / Math.PI);
    const rap = L / Math.abs(dH);
    return {
      val: pct.toFixed(2), unit: '%',
      alts: [
        { v: deg.toFixed(4), u: 'degrés (°)' },
        { v: '1/' + rap.toFixed(2), u: 'rapport' },
      ],
      steps: [
        `ΔH = ${dH} m`,
        `L = ${L} m`,
        `Pente (%) = ΔH / L × 100`,
        `= ${dH} / ${L} × 100 = ${pct.toFixed(2)} %`,
        `Angle = arctan(${dH}/${L}) = ${deg.toFixed(4)}°`,
        `Rapport = 1/${rap.toFixed(2)}`,
      ],
    };
  },
};

export const calculsGisement: CalcDefinition = {
  id: 'gisement',
  titre: 'Gisement & azimut',
  description: 'Gisement entre deux points A → B',
  dot: '#1D9E75',
  icon: 'compass',
  fields: [
    { id: 'xa', label: 'XA (m)', placeholder: 'ex: 731200.00' },
    { id: 'ya', label: 'YA (m)', placeholder: 'ex: 421010.00' },
    { id: 'xb', label: 'XB (m)', placeholder: 'ex: 731245.32' },
    { id: 'yb', label: 'YB (m)', placeholder: 'ex: 421082.17' },
  ],
  run(v) {
    const xa = parseFloat(v.xa), ya = parseFloat(v.ya);
    const xb = parseFloat(v.xb), yb = parseFloat(v.yb);
    if ([xa, ya, xb, yb].some(isNaN)) return null;
    const dx = xb - xa, dy = yb - ya;
    let g = Math.atan2(dx, dy) * (180 / Math.PI);
    if (g < 0) g += 360;
    const gr = g / 0.9;
    const rad = g * (Math.PI / 180);
    const dist = Math.sqrt(dx * dx + dy * dy);
    return {
      val: g.toFixed(4), unit: '° (degrés)',
      alts: [
        { v: gr.toFixed(4), u: 'grades (gon)' },
        { v: rad.toFixed(6), u: 'radians' },
        { v: dist.toFixed(3), u: 'distance A→B (m)' },
      ],
      steps: [
        `ΔX = XB - XA = ${dx.toFixed(3)} m`,
        `ΔY = YB - YA = ${dy.toFixed(3)} m`,
        `G = arctan2(ΔX, ΔY) = ${g.toFixed(4)}°`,
        `G (grades) = G / 0.9 = ${gr.toFixed(4)} gon`,
        `G (radians) = ${rad.toFixed(6)} rad`,
        `Distance A→B = ${dist.toFixed(3)} m`,
      ],
    };
  },
};

export const calculsDistance: CalcDefinition = {
  id: 'distance',
  titre: 'Distance horiz. / inclinée / 3D',
  description: 'Distance entre deux points en 2D, inclinée et 3D',
  dot: '#7F77DD',
  icon: 'ruler',
  fields: [
    { id: 'xa', label: 'XA (m)', placeholder: '0.000' },
    { id: 'ya', label: 'YA (m)', placeholder: '0.000' },
    { id: 'xb', label: 'XB (m)', placeholder: '45.500' },
    { id: 'yb', label: 'YB (m)', placeholder: '72.100' },
    { id: 'za', label: 'ZA — altitude (m)', placeholder: '890.000' },
    { id: 'zb', label: 'ZB — altitude (m)', placeholder: '905.800' },
  ],
  run(v) {
    const xa = parseFloat(v.xa) || 0, ya = parseFloat(v.ya) || 0;
    const xb = parseFloat(v.xb) || 0, yb = parseFloat(v.yb) || 0;
    const za = parseFloat(v.za) || 0, zb = parseFloat(v.zb) || 0;
    const dh = Math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2);
    const dz = zb - za;
    const d3 = Math.sqrt(dh ** 2 + dz ** 2);
    const pente = dh > 0 ? (dz / dh) * 100 : 0;
    return {
      val: dh.toFixed(3), unit: 'm (horizontale)',
      alts: [
        { v: d3.toFixed(3), u: 'distance 3D (m)' },
        { v: (dz >= 0 ? '+' : '') + dz.toFixed(3), u: 'dénivelée ΔZ (m)' },
        { v: pente.toFixed(2), u: 'pente (%)' },
      ],
      steps: [
        `ΔX = ${(xb - xa).toFixed(3)} m`,
        `ΔY = ${(yb - ya).toFixed(3)} m`,
        `D_horiz = √(ΔX² + ΔY²) = ${dh.toFixed(3)} m`,
        `ΔZ = ${dz.toFixed(3)} m`,
        `D_3D = √(D_horiz² + ΔZ²) = ${d3.toFixed(3)} m`,
        `Pente = ΔZ / D_horiz × 100 = ${pente.toFixed(2)} %`,
      ],
    };
  },
};

export const calculsTMJA: CalcDefinition = {
  id: 'tmja',
  titre: 'Trafic routier — TMJA',
  description: 'Trafic Moyen Journalier Annuel & classification',
  dot: '#EF9F27',
  icon: 'car',
  fields: [
    { id: 'tj', label: 'Trafic journalier observé (véh/j)', placeholder: 'ex: 840' },
    { id: 'coef', label: 'Coefficient saisonnalité (0.8 – 1.2)', placeholder: 'ex: 1.05' },
  ],
  run(v) {
    const tj = parseFloat(v.tj);
    const coef = parseFloat(v.coef) || 1.0;
    if (isNaN(tj) || tj <= 0) return null;
    const tmja = Math.round(tj * coef);
    const annuel = Math.round(tmja * 365);
    let classe = '';
    if (tmja < 300) classe = 'Route de desserte locale (T0)';
    else if (tmja < 1000) classe = 'Route secondaire (T1)';
    else if (tmja < 3000) classe = 'Route principale (T2)';
    else if (tmja < 10000) classe = 'Route nationale (T3)';
    else classe = 'Autoroute / voie express (T4)';
    return {
      val: tmja.toString(), unit: 'véh/jour (TMJA)',
      alts: [
        { v: annuel.toLocaleString('fr-FR'), u: 'véh/an' },
        { v: classe, u: 'Classification' },
      ],
      steps: [
        `Trafic observé = ${tj} véh/j`,
        `Coefficient saisonnier = ${coef}`,
        `TMJA = ${tj} × ${coef} = ${tmja} véh/jour`,
        `Trafic annuel = ${tmja} × 365 = ${annuel.toLocaleString('fr-FR')} véh/an`,
        `Classification : ${classe}`,
      ],
    };
  },
};

export const calculsDeblai: CalcDefinition = {
  id: 'deblai',
  titre: 'Déblais & remblais',
  description: 'Volume de terrassement entre deux profils',
  dot: '#D85A30',
  icon: 'crane',
  fields: [
    { id: 's1', label: 'Section S1 (m²)', placeholder: 'ex: 24.50' },
    { id: 's2', label: 'Section S2 (m²)', placeholder: 'ex: 18.30' },
    { id: 'l', label: 'Distance entre profils L (m)', placeholder: 'ex: 20' },
  ],
  run(v) {
    const s1 = parseFloat(v.s1), s2 = parseFloat(v.s2), l = parseFloat(v.l);
    if ([s1, s2, l].some(isNaN) || l <= 0) return null;
    const vMoy = ((s1 + s2) / 2) * l;
    const vPrism = ((s1 + s2 + Math.sqrt(s1 * s2)) / 3) * l;
    return {
      val: vPrism.toFixed(2), unit: 'm³ (prismoïde)',
      alts: [
        { v: vMoy.toFixed(2), u: 'm³ (moyenne des aires)' },
        { v: Math.abs(s1 - s2).toFixed(2), u: 'Δ sections (m²)' },
      ],
      steps: [
        `S1 = ${s1} m²`,
        `S2 = ${s2} m²`,
        `L = ${l} m`,
        `V (moy. aires) = (S1+S2)/2 × L = ${vMoy.toFixed(2)} m³`,
        `V (prismoïde) = (S1+S2+√(S1×S2))/3 × L = ${vPrism.toFixed(2)} m³`,
      ],
    };
  },
};

export const calculsCourbe: CalcDefinition = {
  id: 'courbe',
  titre: 'Courbe circulaire simple',
  description: 'Éléments géométriques d\'une courbe circulaire',
  dot: '#378ADD',
  icon: 'map',
  fields: [
    { id: 'r', label: 'Rayon R (m)', placeholder: 'ex: 200' },
    { id: 'alpha', label: 'Angle au centre α (°)', placeholder: 'ex: 45' },
  ],
  run(v) {
    const R = parseFloat(v.r), alpha = parseFloat(v.alpha);
    if (isNaN(R) || isNaN(alpha) || R <= 0) return null;
    const ar = alpha * (Math.PI / 180);
    const dev = R * ar;
    const tang = R * Math.tan(ar / 2);
    const bis = R * (1 / Math.cos(ar / 2) - 1);
    const corde = 2 * R * Math.sin(ar / 2);
    return {
      val: dev.toFixed(3), unit: 'm (développée)',
      alts: [
        { v: tang.toFixed(3), u: 'tangente T (m)' },
        { v: bis.toFixed(3), u: 'bissectrice B (m)' },
        { v: corde.toFixed(3), u: 'corde C (m)' },
      ],
      steps: [
        `R = ${R} m`,
        `α = ${alpha}° = ${ar.toFixed(6)} rad`,
        `Développée L = R × α = ${dev.toFixed(3)} m`,
        `Tangente T = R × tan(α/2) = ${tang.toFixed(3)} m`,
        `Bissectrice B = R×(1/cos(α/2)-1) = ${bis.toFixed(3)} m`,
        `Corde C = 2R × sin(α/2) = ${corde.toFixed(3)} m`,
      ],
    };
  },
};

export const calculsPolygonale: CalcDefinition = {
  id: 'polygonale',
  titre: 'Polygonale & fermeture angulaire',
  description: 'Erreur de fermeture et tolérance',
  dot: '#888780',
  icon: 'grid',
  fields: [
    { id: 'n', label: 'Nombre de côtés n', placeholder: 'ex: 6' },
    { id: 'somme', label: 'Somme des angles observés (°)', placeholder: 'ex: 720.0120' },
  ],
  run(v) {
    const n = parseInt(v.n), somme = parseFloat(v.somme);
    if (isNaN(n) || isNaN(somme) || n < 3) return null;
    const theo = (n - 2) * 180;
    const ef = somme - theo;
    const tol = Math.sqrt(n) * (10 / 3600);
    const ok = Math.abs(ef) <= tol;
    return {
      val: ef.toFixed(4),
      unit: `° — ${ok ? 'Acceptable' : 'Hors tolérance'}`,
      alts: [
        { v: theo.toFixed(0), u: 'Σ théorique (°)' },
        { v: (tol * 3600).toFixed(0), u: 'Tolérance (secondes)' },
      ],
      steps: [
        `n = ${n} côtés`,
        `Σ théorique = (n-2)×180 = ${theo}°`,
        `Σ observée = ${somme}°`,
        `Erreur ef = ${ef.toFixed(4)}°`,
        `Tolérance = √n × 10" = ${(tol * 3600).toFixed(2)}"`,
        ok ? 'Fermeture ACCEPTABLE' : 'Fermeture HORS TOLÉRANCE',
      ],
    };
  },
};

export const routierCalcs: CalcDefinition[] = [
  calculsGisement,
  calculsPente,
  calculsCourbe,
  calculsDeblai,
  calculsTMJA,
  calculsDistance,
  calculsPolygonale,
];
