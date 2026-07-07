import { CalcDefinition } from './routier';

export const calculsConvCoords: CalcDefinition = {
  id: 'convcoords',
  titre: 'Conversion DMS ↔ Décimal ↔ Grades',
  description: 'Degrés-Minutes-Secondes vers décimal et grades',
  dot: '#3C3489',
  icon: 'globe',
  fields: [
    { id: 'deg', label: 'Degrés (°)', placeholder: 'ex: 3' },
    { id: 'min', label: 'Minutes (\')', placeholder: 'ex: 52' },
    { id: 'sec', label: 'Secondes (")', placeholder: 'ex: 45.60' },
  ],
  run(v) {
    const d = parseFloat(v.deg) || 0;
    const m = parseFloat(v.min) || 0;
    const s = parseFloat(v.sec) || 0;
    const dec = d + m / 60 + s / 3600;
    const gr = dec / 0.9;
    const rad = dec * (Math.PI / 180);
    return {
      val: dec.toFixed(8), unit: '° (décimal)',
      alts: [
        { v: gr.toFixed(8), u: 'grades (gon)' },
        { v: rad.toFixed(8), u: 'radians' },
      ],
      steps: [
        `DMS : ${d}° ${m}' ${s}"`,
        `Décimal = D + M/60 + S/3600`,
        `= ${d} + ${m}/60 + ${s}/3600`,
        `= ${dec.toFixed(8)}°`,
        `Grades = Décimal / 0.9 = ${gr.toFixed(8)} gon`,
        `Radians = Décimal × π/180 = ${rad.toFixed(8)} rad`,
      ],
    };
  },
};

export const calculsNivellement: CalcDefinition = {
  id: 'nivellement',
  titre: 'Nivellement — dénivelée',
  description: 'Calcul de dénivelée par lecture de mire',
  dot: '#534AB7',
  icon: 'level',
  fields: [
    { id: 'altRef', label: 'Altitude repère (m)', placeholder: 'ex: 892.450' },
    { id: 'arriere', label: 'Lecture arrière LA (m)', placeholder: 'ex: 1.253' },
    { id: 'avant', label: 'Lecture avant LV (m)', placeholder: 'ex: 0.875' },
  ],
  run(v) {
    const altRef = parseFloat(v.altRef);
    const la = parseFloat(v.arriere);
    const lv = parseFloat(v.avant);
    if ([altRef, la, lv].some(isNaN)) return null;
    const hi = altRef + la;
    const altNew = hi - lv;
    const deniv = altNew - altRef;
    return {
      val: altNew.toFixed(3), unit: 'm (altitude du point avant)',
      alts: [
        { v: hi.toFixed(3), u: 'Hauteur instrument HI (m)' },
        { v: (deniv >= 0 ? '+' : '') + deniv.toFixed(3), u: 'Dénivelée (m)' },
      ],
      steps: [
        `Altitude repère = ${altRef} m`,
        `Lecture arrière LA = ${la} m`,
        `HI = ${altRef} + ${la} = ${hi.toFixed(3)} m`,
        `Lecture avant LV = ${lv} m`,
        `Altitude avant = ${hi.toFixed(3)} - ${lv} = ${altNew.toFixed(3)} m`,
        `Dénivelée = ${deniv.toFixed(3)} m`,
      ],
    };
  },
};

export const geodesieCalcs: CalcDefinition[] = [
  calculsConvCoords,
  calculsNivellement,
];
