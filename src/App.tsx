import React, { useState } from 'react';
import { BottomNav, TabKey } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { CalculsPage } from './pages/CalculsPage';
import { TerrainPage } from './pages/TerrainPage';
import { RapportsPage } from './pages/RapportsPage';
import { ProfilPage } from './pages/ProfilPage';

export default function App() {
  const [tab, setTab] = useState<TabKey>('accueil');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 max-w-3xl w-full mx-auto bg-background">
        {tab === 'accueil' && <HomePage onGoCalculs={() => setTab('calculs')} />}
        {tab === 'calculs' && <CalculsPage />}
        {tab === 'terrain' && <TerrainPage />}
        {tab === 'rapports' && <RapportsPage />}
        {tab === 'profil' && <ProfilPage />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
