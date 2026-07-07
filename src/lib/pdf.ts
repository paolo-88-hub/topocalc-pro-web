import { CalcResult, TerrainPoint, Project } from '../store/useProjectStore';

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export function buildRapportHTML(
  projet: Project,
  calcResults: CalcResult[],
  terrainPoints: TerrainPoint[]
): string {
  return `
<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<title>Rapport ${projet.nom}</title>
<style>
  body{font-family:Arial,sans-serif;color:#0D1B2A;padding:40px;max-width:900px;margin:0 auto}
  .header{background:#0C2340;color:white;padding:20px;margin:-40px -40px 30px -40px}
  h1{font-size:20px;margin:0}
  .meta{background:#F4F5F7;border-radius:8px;padding:14px;margin-bottom:20px;display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px}
  h2{font-size:15px;color:#0C2340;border-bottom:2px solid #1A7F5A;padding-bottom:4px;margin:20px 0 10px}
  table{width:100%;border-collapse:collapse;font-size:11px}
  th{background:#0C2340;color:white;padding:7px 9px;text-align:left}
  td{padding:6px 9px;border-bottom:0.5px solid #E0E4EA}
  .footer{margin-top:30px;border-top:0.5px solid #ccc;padding-top:12px;font-size:10px;color:#999;text-align:center}
  @media print { body{padding:20px} .header{margin:-20px -20px 24px -20px} }
</style></head><body>
<div class="header">
  <h1>TopoCalc Pro — Rapport de projet</h1>
  <p style="margin:4px 0 0;opacity:0.7;font-size:12px">Généré le ${formatDate(Date.now())} · ${projet.responsable}</p>
</div>
<div class="meta">
  <div><span style="color:#64748B">Projet : </span><strong>${projet.nom}</strong></div>
  <div><span style="color:#64748B">Type : </span><strong>${projet.type}</strong></div>
  <div><span style="color:#64748B">PK début : </span><strong>${projet.pkDebut || '—'}</strong></div>
  <div><span style="color:#64748B">PK fin : </span><strong>${projet.pkFin || '—'}</strong></div>
  <div><span style="color:#64748B">Responsable : </span><strong>${projet.responsable}</strong></div>
  <div><span style="color:#64748B">Avancement : </span><strong>${projet.avancement}%</strong></div>
</div>
<h2>Points de terrain (${terrainPoints.length})</h2>
<table>
  <thead><tr><th>N°</th><th>Type</th><th>X (m)</th><th>Y (m)</th><th>Z (m)</th><th>Observation</th></tr></thead>
  <tbody>
    ${terrainPoints.map(p => `<tr><td>${p.numero}</td><td>${p.type}</td><td>${p.x.toFixed(3)}</td><td>${p.y.toFixed(3)}</td><td>${p.z.toFixed(3)}</td><td>${p.observation}</td></tr>`).join('')}
  </tbody>
</table>
<h2>Calculs effectués (${calcResults.length})</h2>
${calcResults.length === 0 ? '<p style="color:#94A3B8;font-size:12px">Aucun calcul enregistré.</p>' : ''}
${calcResults.map(r => `
  <div style="margin-bottom:16px;border:0.5px solid #E0E4EA;border-radius:6px;overflow:hidden">
    <div style="background:#F4F5F7;padding:8px 12px;display:flex;justify-content:space-between">
      <strong style="font-size:12px">${r.calcType}</strong>
      <span style="font-size:10px;color:#64748B">${formatDate(r.timestamp)}</span>
    </div>
    <div style="padding:8px 12px">
      <p style="font-size:16px;font-weight:700;color:#1A7F5A;margin:0 0 6px">${r.result.val} <span style="font-size:11px;color:#64748B;font-weight:400">${r.result.unit}</span></p>
      <div style="background:#F4F5F7;padding:8px;border-radius:4px;font-family:monospace;font-size:10px;line-height:1.6">
        ${r.result.steps.map((s, i) => `${i + 1}. ${s}`).join('<br/>')}
      </div>
    </div>
  </div>
`).join('')}
<div class="footer">TopoCalc Pro v1.0 · BDL Studio · ENSPY · ${new Date().toLocaleString('fr-FR')}</div>
</body></html>`;
}

/** Opens a print-ready window; the user saves it as PDF via the browser's print dialog. */
export function generateRapportPDF(projet: Project, calcResults: CalcResult[], terrainPoints: TerrainPoint[]) {
  const html = buildRapportHTML(projet, calcResults, terrainPoints);
  const win = window.open('', '_blank');
  if (!win) {
    alert("Le navigateur a bloqué l'ouverture de la fenêtre d'impression. Autorisez les pop-ups pour ce site.");
    return;
  }
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    win.focus();
    win.print();
  };
}

export function exportPointsCSV(terrainPoints: TerrainPoint[], filename = 'points-terrain.csv') {
  const header = 'Numero;Type;X;Y;Z;Observation;Latitude;Longitude;Date\n';
  const rows = terrainPoints
    .map((p) =>
      [
        p.numero, p.type, p.x.toFixed(3), p.y.toFixed(3), p.z.toFixed(3),
        (p.observation || '').replace(/;/g, ','), p.latitude.toFixed(6), p.longitude.toFixed(6),
        new Date(p.timestamp).toLocaleString('fr-FR'),
      ].join(';')
    )
    .join('\n');
  const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
