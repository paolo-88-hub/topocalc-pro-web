# TopoCalc Pro — Web

Version web de TopoCalc Pro (BDL Studio), portée depuis l'app mobile Expo vers React + Vite + TypeScript + Tailwind. Icônes 100% SVG (aucun emoji), déployable sur Vercel.

## Développement local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

## Build de production

```bash
npm run build
npm run preview   # pour tester le build localement
```

Le résultat est généré dans `dist/`.

## Déploiement sur Vercel

### Option 1 — via le site Vercel (le plus simple)

1. Pousse ce dossier sur un dépôt GitHub (voir ci-dessous).
2. Va sur https://vercel.com → **Add New… → Project**.
3. Importe ton dépôt GitHub `topocalc-pro-web`.
4. Vercel détecte automatiquement Vite. Vérifie juste :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Clique **Deploy**. En ~1 minute, ton app est en ligne sur une URL `*.vercel.app`.
6. Tu peux ensuite ajouter un domaine personnalisé dans **Project → Settings → Domains**.

### Option 2 — via la CLI Vercel

```bash
npm install -g vercel
cd topocalc-web
vercel          # première fois : suit les questions (link/create project)
vercel --prod   # déploiement en production
```

### Créer le dépôt GitHub (si ce n'est pas déjà fait)

```bash
cd topocalc-web
git init
git add .
git commit -m "TopoCalc Pro — version web"
git branch -M main
git remote add origin https://github.com/<ton-compte>/topocalc-pro-web.git
git push -u origin main
```

## Structure

```
src/
  components/     Icon (SVG), Header, BottomNav, DomainCard, CalcForm, TerrainPointCard
  pages/          HomePage, CalculsPage, TerrainPage, RapportsPage, ProfilPage
  lib/calculs/    Modules de calcul (routier, cadastral, géodésie, construction, souterrain)
  lib/pdf.ts      Génération de rapport (impression navigateur) + export CSV
  store/          Zustand — état global, persisté dans localStorage
  i18n/           Traductions fr / en
```

## Notes de portage (mobile → web)

- **Navigation** : Expo Router (onglets natifs) → navigation par onglets en state React, barre de navigation `BottomNav` fixée en bas de l'écran.
- **Géolocalisation** : `expo-location` → API navigateur `navigator.geolocation`.
- **Export PDF** : `expo-print` + `expo-sharing` → génération HTML + boîte de dialogue d'impression du navigateur (« Enregistrer en PDF »).
- **Export CSV** : ajouté nativement pour le web (téléchargement direct du fichier).
- **Stockage** : ajout de la persistance `localStorage` (absente dans l'app mobile) pour ne pas perdre les points et calculs entre les sessions.
- **Icônes** : tous les emojis ont été remplacés par des icônes SVG traits (composant `Icon`), pour un rendu cohérent sur tous les navigateurs/OS.
- **Toutes les formules de calcul sont conservées à l'identique** (gisement, pente, TMJA, courbes, cubatures, polygonale, superficie, bornage, nivellement, conversions, implantation, fermeture de galerie).
